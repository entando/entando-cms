import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  intlShape, FormattedMessage, injectIntl,
} from 'react-intl';
import { reduxForm, Field } from 'redux-form';
import {
  Button, Row, Col,
} from 'patternfly-react';
import FormSectionTitle from 'ui/common/form/FormSectionTitle';
import ConfirmCancelModalContainer from 'ui/common/cancel-modal/ConfirmCancelModalContainer';
import ContentsFilterModalContainer from 'ui/widget-forms/contents-filter/ContentsFilterModalContainer';

import { SINGLE_CONTENT_CONFIG } from 'ui/widget-forms/const';

export const SingleContentConfigContainerId = `widgets.${SINGLE_CONTENT_CONFIG}`;

class SingleContentConfigFormBase extends PureComponent {
  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  renderActionButtons() {
    const {
      chosenContent,
      onCancel,
      onDiscard,
      invalid,
      submitting,
    } = this.props;

    const handleCancelClick = () => {
      if (dirty) {
        onCancel();
      } else {
        onDiscard();
      }
    };

    const contentExists = chosenContent && (chosenContent.id || chosenContent.contentId);
    return (
      <Row className="SingleContentConfigFormBody__actionBar">
        <Col xs={12}>
          <Button
            className="pull-right AddContentTypeFormBody__save--btn"
            type="submit"
            bsStyle="primary"
            disabled={invalid || submitting || !contentExists}
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
        </Col>
      </Row>
    );
  }

  renderFormFields() {
    const {
      contentTemplates,
      invalid,
      submitting,
      intl,
      chosenContent,
      showFilterModal,
      onSelectContent,
      onDiscard,
      ownerGroup,
      joinGroups,
      paramsMode,
    } = this.props;

    const content = chosenContent;
    const contentTypeCodeSub = content.contentId !== undefined ? content.contentId.substr(0, 3) : '';
    const contentTypeCode = content.typeCode || contentTypeCodeSub;

    const filterByCode = contentTemplate => contentTemplate.contentType === contentTypeCode;
    const contentTemplatesByContentType = [{ id: 'default', descr: intl.formatMessage({ id: 'widget.form.default' }) },
      ...contentTemplates.filter(filterByCode)];

    const contentTemplateOptions = contentTemplatesByContentType
      .map(item => (
        <option key={`opt-${item.id}`} value={item.id}>
          {item.descr}
        </option>
      ));
    
    return (
      <div>
        <span className="icon fa fa-puzzle-piece" title="Widget" />
        <h5 className="SingleContentConfigFormBody__widgetTitle"><FormattedMessage id="widget.singleContent.config.title" /> </h5>
        <FormSectionTitle
          titleId="app.info"
          requireFields={false}
        />
        <h3>
          <FormattedMessage id="widget.singleContent.config.content" />: {content.contentId || content.id} - {content.contentDescription || content.description}
        </h3>
        <Button
          className="ChooseContentBody__cancel--btn"
          bsStyle="default"
          onClick={showFilterModal}
        >
          <FormattedMessage id="cms.contents.change" />
        </Button>
        <Field name="chosenContent" component="div" />
        <Field
          name="chosenContent.contentId"
          component="span"
        />
        <div className="SingleContentConfigFormBody__templateTitle">
          <FormSectionTitle
            titleId="widget.form.publishingSettings"
            requireFields={false}
          />
          <span><FormattedMessage id="widget.form.contentTemplate" /></span>
          <Field
            name="chosenContent.contentDescription"
            component="span"
          />
        </div>
        <ContentsFilterModalContainer
          modalTitleText={intl.formatMessage({ id: 'cms.contents.modal.filter.title' })}
          invalid={invalid}
          submitting={submitting}
          onSave={onSelectContent}
          onDiscard={onDiscard}
          ownerGroup={ownerGroup}
          joinGroups={joinGroups}
          compatibility={{
            joinGroups, ownerGroup,
          }}
        />

        { (content.contentId || content.id)
          && (
          <Row>
            <Col xs={12}>
              <Field
                component="select"
                name="chosenContent.modelId"
                className="form-control"
              >
                {contentTemplateOptions}
              </Field>
            </Col>
          </Row>
          )
        }
        {!paramsMode && this.renderActionButtons()}
      </div>
    );
  }

  enclosedWithForm(fields) {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit} className="form-horizontal SingleContentConfigForm well">
        {fields}        
      </form>
    );
  }

  render() {
    const {
      paramsMode,
      invalid,
      submitting,
      intl,
      onSave,
      onDiscard,
    } = this.props;

    const formFields = this.renderFormFields();

    return (
      <Fragment>
        <Row>
          <Col xs={12}>
            {paramsMode ? formFields : this.enclosedWithForm(formFields)}
          </Col>
        </Row>
        {!paramsMode && (
          <ConfirmCancelModalContainer
            contentText={intl.formatMessage({ id: 'cms.label.modal.confirmCancel' })}
            invalid={invalid}
            submitting={submitting}
            onSave={onSave}
            onDiscard={onDiscard}
          />
        )}
      </Fragment>
    );
  }
}

SingleContentConfigFormBase.propTypes = {
  intl: intlShape.isRequired,
  contentTemplates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onDidMount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  chosenContent: PropTypes.shape({
    id: PropTypes.string,
    contentId: PropTypes.string,
  }),
  dirty: PropTypes.bool,
  onDiscard: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  showFilterModal: PropTypes.func.isRequired,
  onSelectContent: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  ownerGroup: PropTypes.string,
  joinGroups: PropTypes.arrayOf(PropTypes.string),
  paramsMode: PropTypes.bool,
};

SingleContentConfigFormBase.defaultProps = {
  chosenContent: {},
  dirty: false,
  ownerGroup: '',
  joinGroups: [],
  paramsMode: false,
};

export const SingleContentConfigFormBody = injectIntl(SingleContentConfigFormBase);

export default reduxForm({
  form: SingleContentConfigContainerId,
})(SingleContentConfigFormBody);
