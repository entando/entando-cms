import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import {
  Row, Col, Button, Modal,
} from 'patternfly-react';
import {
  FormattedMessage, FormattedHTMLMessage, intlShape, defineMessages,
} from 'react-intl';
import { required, code, maxLength } from '@entando/utils';

import RenderDropdownTypeaheadInput from 'ui/common/form/RenderDropdownTypeaheadInput';
import RenderContentModelInput from 'ui/common/form/RenderContentModelInput';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import DraggableDialog from 'ui/common/DraggableDialog';

const EDIT_MODE = 'edit';
const NEW_MODE = 'new';

const maxLength50 = maxLength(50);
const maxLength70 = maxLength(70);

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
    };
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  handleModalOpen() {
    this.setState({ modalOpened: true });
  }

  handleModalClose() {
    this.setState({ modalOpened: false });
  }

  render() {
    const {
      handleSubmit, invalid, submitting, intl, mode, contentTypes,
    } = this.props;
    const { modalOpened } = this.state;
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
              <FormattedMessage
                id="cms.contentmodel.form.editassistant"
                defaultMessage="Help Assistant"
              />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormattedHTMLMessage id="cms.contentmodel.form.editassist.dialog" />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleModalClose}>
              <FormattedMessage id="cms.label.close" defaultMessage="close" />
            </Button>
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
                label={(
                  <FormLabel
                    labelId="cms.contentmodel.form.code"
                    helpId="cms.contentmodel.form.codeHelp"
                    required
                  />
)}
                validate={[required, code, maxLength50]}
                disabled={mode === EDIT_MODE}
              />
              <Field
                component={RenderTextInput}
                name="descr"
                label={(
                  <FormLabel
                    labelId="cms.label.name"
                    helpId="cms.contentmodel.form.nameHelp"
                    required
                  />
)}
                validate={[required, maxLength70]}
              />
              <Field
                component={RenderDropdownTypeaheadInput}
                name="contentType"
                label={(
                  <FormLabel
                    labelId="cms.contentmodel.list.contentTypeHeader"
                    helpId="cms.contentmodel.form.contentTypeHelp"
                    required
                  />
)}
                options={contentTypes}
                labelKey="name"
                placeholder={intl.formatMessage(messages.chooseContentType)}
                validate={[required]}
              />
            </fieldset>
          </Col>
          <Col xs={12}>
            <Field
              name="contentShape"
              label={(
                <FormLabel
                  labelId="cms.contentmodel.form.htmlmodel"
                  helpId="cms.contentmodel.form.htmlmodelHelp"
                  required
                />
)}
              prepend={(
                <>
                  <Button
                    className="AddContentModelForm__editassistbtn"
                    onClick={this.handleModalOpen}
                  >
                    <FormattedMessage
                      id="cms.contentmodel.form.editassistant"
                      defaultMessage="Help Assistant"
                    />
                  </Button>
                  <p>
                    <FormattedHTMLMessage id="cms.contentmodel.form.htmlmodel.statusassist" />
                    <br />
                    <FormattedHTMLMessage id="cms.contentmodel.form.htmlmodel.statusattrhelp" />
                    <br />
                    <FormattedMessage id="cms.contentmodel.form.htmlmodel.statusadminconf" />
                  </p>
                </>
)}
              component={RenderContentModelInput}
              cols="50"
              rows="8"
              className="form-control"
              append={intl.formatMessage(messages.htmlModelAppend)}
              validate={[required]}
            />
          </Col>
          <Col xs={12}>
            <Field
              component={RenderTextInput}
              name="stylesheet"
              label={(
                <FormLabel
                  labelId="cms.contentmodel.form.stylesheet"
                  helpId="cms.contentmodel.form.stylesheetHelp"
                />
)}
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
  handleSubmit: PropTypes.func.isRequired,
  contentTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  invalid: PropTypes.bool,
  onDidMount: PropTypes.func.isRequired,
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
  enableReinitialize: true,
})(AddContentModelFormBody);

export default AddContentModelForm;
