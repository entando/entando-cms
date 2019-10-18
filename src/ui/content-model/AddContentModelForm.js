import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import {
  Row,
  Col,
  Button,
  Modal,
} from 'patternfly-react';
import {
  FormattedMessage,
  FormattedHTMLMessage,
  intlShape,
  defineMessages,
} from 'react-intl';
import { required, maxLength } from '@entando/utils';

import RenderDropdownTypeaheadInput from 'ui/common/form/RenderDropdownTypeaheadInput';
import RenderContentModelInput from 'ui/common/form/RenderContentModelInput';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import DraggableDialog from 'ui/common/DraggableDialog';


const EDIT_MODE = 'edit';
const NEW_MODE = 'new';

const max10Digits = value => (
  value && /^[0-9]{1,10}$/.test(value)
    ? undefined
    : (
      <FormattedMessage
        id="validateForm.code.max10digits"
      />
    )
);
const maxLength50 = maxLength(50);

const messages = defineMessages({
  chooseContentType: {
    id: 'cms.label.select',
    defaultMessage: 'Please select',
  },
  htmlModelAppend: {
    id: 'cms.contentmodel.form.presscontext',
    defaultMessage: 'CTRL + Space',
  },
});

class AddContentModelFormBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpened: false,
      dictionary: [],
      dictList: [],
      dictMapped: {},
      regLastToken: '',
    };
    this.initCommands = this.initCommands.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  componentDidUpdate(prevProps) {
    const { dictionary: _dict } = this.props;
    if (_dict.length !== prevProps.dictionary.length) {
      this.populateDictState();
    }
  }

  componentWillUnmount() {
    const { onDidUnmount } = this.props;
    onDidUnmount();
  }

  populateDictState() {
    const { dictionary: _dict } = this.props;
    const dictMapped = _dict.reduce((acc, curr) => {
      acc[curr.code] = curr.methods;
      return acc;
    }, {});

    const dictionary = _dict.map(word => ({
      caption: word.code,
      value: word.code,
      score: 10000,
      meta: `${word.code} Object`,
    }));

    this.setState({
      dictionary,
      dictMapped,
      dictList: [...dictionary],
    });
  }

  handleModalOpen() {
    this.setState({ modalOpened: true });
  }

  handleModalClose() {
    this.setState({ modalOpened: false });
  }

  initCommands(editor) {
    const escChars = term => term.replace('$', '\\$').replace('#', '\\#');

    const findTokenInMap = (lastToken) => {
      const { dictMapped } = this.state;
      return Object.keys(dictMapped).find((key) => {
        const keyRegEx = new RegExp(`${escChars(key)}$`, 'g');
        return keyRegEx.test(lastToken);
      });
    };

    const insertMethodsToAutoCompleteArray = (token) => {
      this.setState({ regLastToken: token });
      const { dictionary, dictMapped: mapped } = this.state;
      const dictList = Object.entries(mapped[token]).map(([key]) => ({
        caption: key,
        value: key,
        score: 10001,
        meta: `${token} Object Method`,
        completer: {
          insertMatch: (ed, data) => {
            const { regLastToken, dictMapped } = this.state;
            const insertedValue = data.value;
            if (insertedValue in dictMapped[regLastToken]) {
              this.setState({ regLastToken: '', dictList: [...dictionary] });
            }
            ed.completer.insertMatch({ value: insertedValue });
          },
        },
      })).concat(dictionary);
      this.setState({ dictList });
    };

    const dotCommandExec = () => {
      const { selection, session } = editor;

      const cpos = selection.getCursor();
      const curLine = (session.getDocument().getLine(cpos.row)).trim();
      const curTokens = curLine.slice(0, cpos.column).split(/\s+/);
      const curCmd = curTokens[0];
      if (!curCmd) return;

      const lastToken = curTokens[curTokens.length - 1];
      editor.insert('.');

      const tokenres = findTokenInMap(lastToken);

      if (tokenres) {
        insertMethodsToAutoCompleteArray(tokenres);
      }
    };

    editor.commands.addCommand({
      name: 'dotCommand1',
      bindKey: { win: '.', mac: '.' },
      exec: dotCommandExec,
    });

    editor.commands.on('afterExec', (e) => {
      if (e.command.name === 'dotCommand1') {
        editor.execCommand('startAutocomplete');
      }
    });
  }

  render() {
    const {
      handleSubmit,
      invalid,
      submitting,
      intl,
      mode,
      contentTypes,
    } = this.props;
    const { modalOpened, dictList } = this.state;
    return (
      <form onSubmit={handleSubmit} className="form-horizontal">
        <Modal
          dialogComponentClass={DraggableDialog}
          className="AddContentModelForm__editassistmodal"
          show={modalOpened}
          onHide={this.handleModalClose}
          backdrop={false}
          enforceFocus={false}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">
              <FormattedMessage id="cms.contentmodel.form.editassistant" defaultMessage="Help Assistant" />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormattedHTMLMessage id="cms.contentmodel.form.editassist.dialog" />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleModalClose}><FormattedMessage id="cms.label.close" defaultMessage="close" /></Button>
          </Modal.Footer>
        </Modal>
        <Row>
          <Col xs={12}>
            <fieldset className="no-padding">
              <legend>
                <div className="AddContentModelForm__required-fields text-right">
                  * <FormattedMessage id="cms.label.fieldsRequired" />
                </div>
              </legend>
              <Field
                component={RenderTextInput}
                name="id"
                label={
                  <FormLabel labelId="cms.contentmodel.form.code" helpId="cms.contentmodel.form.codeHelp" required />
                }
                validate={[required, max10Digits]}
                disabled={mode === EDIT_MODE}
              />
              <Field
                component={RenderTextInput}
                name="descr"
                label={<FormLabel labelId="cms.label.name" helpId="cms.contentmodel.form.nameHelp" required />}
                validate={[required, maxLength50]}
              />
              <Field
                component={RenderDropdownTypeaheadInput}
                name="contentType"
                label={<FormLabel labelId="cms.contentmodel.list.contentTypeHeader" helpId="cms.contentmodel.form.contentTypeHelp" required />}
                options={contentTypes}
                labelKey="name"
                disabled={mode === EDIT_MODE}
                placeholder={intl.formatMessage(messages.chooseContentType)}
                validate={[required]}
              />
            </fieldset>
          </Col>
          <Col xs={12}>
            <Field
              name="contentShape"
              label={<FormLabel labelId="cms.contentmodel.form.htmlmodel" helpId="cms.contentmodel.form.htmlmodelHelp" required />}
              prepend={(
                <>
                  <Button className="AddContentModelForm__editassistbtn" onClick={this.handleModalOpen}><FormattedMessage id="cms.contentmodel.form.editassistant" defaultMessage="Help Assistant" /></Button>
                  <p>
                    <FormattedHTMLMessage id="cms.contentmodel.form.htmlmodel.statusassist" /><br />
                    <FormattedHTMLMessage id="cms.contentmodel.form.htmlmodel.statusattrhelp" /><br />
                    <FormattedMessage id="cms.contentmodel.form.htmlmodel.statusadminconf" />
                  </p>
                </>
              )}
              component={RenderContentModelInput}
              cols="50"
              rows="8"
              dictionary={dictList}
              onInitCommands={this.initCommands}
              className="form-control"
              append={intl.formatMessage(messages.htmlModelAppend)}
              validate={[required]}
            />
          </Col>
          <Col xs={12}>
            <Field
              component={RenderTextInput}
              name="stylesheet"
              label={<FormLabel labelId="cms.contentmodel.form.stylesheet" helpId="cms.contentmodel.form.stylesheetHelp" />}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <Button
              className="pull-right"
              type="submit"
              bsStyle="primary"
              disabled={invalid || submitting}
            >
              <FormattedMessage id="cms.label.save" />
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

AddContentModelFormBody.propTypes = {
  intl: intlShape.isRequired,
  dictionary: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  contentTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  invalid: PropTypes.bool,
  onDidMount: PropTypes.func.isRequired,
  onDidUnmount: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  mode: PropTypes.string,
};

AddContentModelFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  mode: NEW_MODE,
};

const AddContentModelForm = reduxForm({
  form: 'contentmodelform',
})(AddContentModelFormBody);

export default AddContentModelForm;
