import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';
import { reduxForm, FieldArray, Field } from 'redux-form';
import {
  Button, Row, Col, Alert,
} from 'patternfly-react';
import { Collapse } from 'react-collapse';
import { isUndefined } from 'lodash';
import { maxLength } from '@entando/utils';
import ContentTableRenderer from 'ui/widget-forms/ContentTableRenderer';
import FormSectionTitle from 'ui/common/form/FormSectionTitle';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import FormLabel from 'ui/common/form/FormLabel';
import ConfirmCancelModalContainer from 'ui/common/cancel-modal/ConfirmCancelModalContainer';
import { MULTIPLE_CONTENTS_CONFIG } from 'ui/widget-forms/const';

const maxLength70 = maxLength(70);

export const MultipleContentsConfigContainerId = `widgets.${MULTIPLE_CONTENTS_CONFIG}`;

export class ContentConfigFormBody extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      extraOptionsOpen: false,
      publishingSettingsOpen: false,
    };
  }

  componentDidMount() {
    const { onDidMount, cloneMode } = this.props;
    if (cloneMode) {
      this.setState({
        extraOptionsOpen: true,
        publishingSettingsOpen: true,
      });
    }
    onDidMount();
  }

  collapseSection(sectionName) {
    const { [sectionName]: currentVisibility } = this.state;
    this.setState({
      [sectionName]: !currentVisibility,
    });
  }

  normalizeTitles(arr) {
    const { language } = this.props;
    return arr.map((c) => {
      const fullTitle = c.fullTitles[language];
      const title = c.titles[language];
      const countSlashes = (fullTitle.match(/\//g) || []).length;
      return Object.assign(c, { name: `${'.. / '.repeat(countSlashes)}${title}`, level: countSlashes });
    }).sort((a, b) => (a.level > b.level ? 1 : -1));
  }

  renderFormFields() {
    const {
      contentTemplates,
      extFormName,
      putPrefixField,
      invalid,
      submitting,
      languages,
      pages,
      intl,
      widgetCode,
      chosenContents,
      dirty,
      onCancel,
      onDiscard,
      onSave,
      ownerGroup,
      joinGroups,
    } = this.props;
    const { extraOptionsOpen, publishingSettingsOpen } = this.state;
    const multipleContentsMode = widgetCode === MULTIPLE_CONTENTS_CONFIG;
    const normalizedLanguages = languages.map(lang => lang.code);
    const normalizedPages = this.normalizeTitles(pages || []);
    const noContents = chosenContents.length === 0;

    const elementNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 50, 100, 500]
      .map(i => Object.assign({}, { code: i, name: i }));

    const renderTitleFields = !isUndefined(normalizedLanguages) ? normalizedLanguages
      .map(langCode => (
        <Field
          key={langCode}
          component={RenderTextInput}
          name={putPrefixField(`title_${langCode}`)}
          label={<FormLabel langLabelText={langCode} labelId="app.title" />}
          validate={[maxLength70]}
        />
      )) : null;

    const renderLinkTextFields = !isUndefined(normalizedLanguages) ? normalizedLanguages
      .map(langCode => (
        <Field
          key={langCode}
          component={RenderTextInput}
          name={putPrefixField(`linkDescr_${langCode}`)}
          label={<FormLabel langLabelText={langCode} labelId="widget.form.linkText" />}
          validate={[maxLength70]}
        />
      )) : null;

    const handleCollapsePublishingSettings = () => this.collapseSection('publishingSettingsOpen');
    const handleCollapseExtraOptions = () => this.collapseSection('extraOptionsOpen');

    const handleCancelClick = () => {
      if (dirty) {
        onCancel();
      } else {
        onDiscard();
      }
    };

    const renderExtraOptions = multipleContentsMode ? (
      <Row>
        <Col xs={12}>
          <fieldset className="no-padding">
            <FormSectionTitle
              titleId="widget.form.extraOptions"
              requireFields={false}
              collapsable
              onClick={handleCollapseExtraOptions}
            />
            <Collapse isOpened={extraOptionsOpen}>
              <Alert type="info" onDismiss={null}>
                <FormattedMessage id="widget.form.extraOptionsDescription" />
              </Alert>
              <div>
                {renderTitleFields}
                <Field
                  component={RenderSelectInput}
                  name={putPrefixField('pageLink')}
                  label={
                    <FormLabel labelId="widget.form.page" />
              }
                  options={normalizedPages}
                  optionValue="code"
                  optionDisplayName="name"
                  defaultOptionId="app.enumerator.none"
                />
                {renderLinkTextFields}
              </div>
            </Collapse>
          </fieldset>
        </Col>
      </Row>
    ) : null;

    const renderPublishingSettings = multipleContentsMode ? (
      <Row>
        <Col xs={12}>
          <fieldset className="no-padding">
            <FormSectionTitle
              titleId="widget.form.publishingSettings"
              requireFields={false}
              collapsable
              onClick={handleCollapsePublishingSettings}
            />
            <Collapse isOpened={publishingSettingsOpen}>
              <div>
                <Field
                  component={RenderSelectInput}
                  name={putPrefixField('maxElemForItem')}
                  label={
                    <FormLabel labelId="widget.form.elementsPP" />
                }
                  options={elementNumbers}
                  optionValue="code"
                  optionDisplayName="name"
                  defaultOptionId="user.profile.all"
                />
              </div>
            </Collapse>
          </fieldset>
        </Col>
      </Row>
    ) : null;

    return (
      <Fragment>
        <Row>
          <Col xs={12}>
            <FieldArray
              component={ContentTableRenderer}
              contentTemplates={contentTemplates}
              name={putPrefixField('contents')}
              intl={intl}
              ownerGroup={ownerGroup}
              joinGroups={joinGroups}
              multipleContentsMode={multipleContentsMode}
            />
          </Col>
        </Row>
        {renderPublishingSettings}
        {renderExtraOptions}
        {!extFormName && (
          <Row>
            <Col xs={12}>
              <Button
                className="pull-right AddContentTypeFormBody__save--btn"
                type="submit"
                bsStyle="primary"
                disabled={invalid || submitting || noContents}
              >
                <FormattedMessage id="app.save" />
              </Button>
              <Button
                className="pull-right AddContentTypeFormBody__cancel--btn"
                bsStyle="default"
                onClick={handleCancelClick}
              >
                <FormattedMessage id="cms.label.cancel" />
              </Button>
              <ConfirmCancelModalContainer
                contentText={intl.formatMessage({ id: 'cms.label.modal.confirmCancel' })}
                invalid={invalid}
                submitting={submitting}
                onSave={onSave}
                onDiscard={onDiscard}
              />
            </Col>
          </Row>
        )}
      </Fragment>
    );
  }

  renderWithForm(formContent) {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit} className="form-horizontal">
        {formContent}
      </form>
    );
  }

  render() {
    const { extFormName } = this.props;
    const formFields = this.renderFormFields();
    return (
      <Fragment>
        <h5>
          <span className="icon fa fa-puzzle-piece" title="Widget" />
          {' '}
          <FormattedMessage id="widget.multipleContents.config.title" defaultMessage="Content List" />
        </h5>
        {extFormName ? formFields : this.renderWithForm(formFields)}
      </Fragment>
    );
  }
}

ContentConfigFormBody.propTypes = {
  intl: intlShape.isRequired,
  contentTemplates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  languages: PropTypes.arrayOf(PropTypes.shape({})),
  pages: PropTypes.arrayOf(PropTypes.shape({})),
  onDidMount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  language: PropTypes.string.isRequired,
  widgetCode: PropTypes.string.isRequired,
  chosenContents: PropTypes.arrayOf(PropTypes.shape({})),
  dirty: PropTypes.bool,
  onDiscard: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  ownerGroup: PropTypes.string,
  joinGroups: PropTypes.arrayOf(PropTypes.string),
  extFormName: PropTypes.string,
  putPrefixField: PropTypes.func,
};

ContentConfigFormBody.defaultProps = {
  languages: [],
  pages: [],
  chosenContents: [],
  dirty: false,
  ownerGroup: '',
  joinGroups: null,
  extFormName: '',
  invalid: false,
  submitting: false,
  handleSubmit: () => {},
  putPrefixField: name => name,
};

export default reduxForm({
  form: MultipleContentsConfigContainerId,
})(ContentConfigFormBody);
