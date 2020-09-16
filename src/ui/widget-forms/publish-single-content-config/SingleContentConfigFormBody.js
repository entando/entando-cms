import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  intlShape, FormattedMessage,
} from 'react-intl';
import { reduxForm, Field } from 'redux-form';
import { get, isEmpty } from 'lodash';
import {
  Button, Row, Col,
} from 'patternfly-react';
import FormSectionTitle from 'ui/common/form/FormSectionTitle';
import ConfirmCancelModalContainer from 'ui/common/cancel-modal/ConfirmCancelModalContainer';
import ContentsFilterModalContainer from 'ui/widget-forms/contents-filter/ContentsFilterModalContainer';

import { SINGLE_CONTENT_CONFIG } from 'ui/widget-forms/const';

export const SingleContentConfigContainerId = `widgets.${SINGLE_CONTENT_CONFIG}`;

export class SingleContentConfigFormBody extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedContent: null,
    };
    this.handleContentSelect = this.handleContentSelect.bind(this);
  }

  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  componentDidUpdate(prevProps) {
    const { chosenContent } = this.props;
    const { selectedContent } = this.state;
    if (
      prevProps.chosenContent !== chosenContent
      && !isEmpty(chosenContent)
      && isEmpty(selectedContent)
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ selectedContent: chosenContent });
    }
  }

  handleContentSelect(selectedContent) {
    const { onSelectContent } = this.props;
    this.setState({ selectedContent });
    onSelectContent(selectedContent);
  }

  enclosedWithForm(fields) {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit} className="form-horizontal SingleContentConfigForm well">
        {fields}
      </form>
    );
  }

  renderActionButtons() {
    const {
      onCancel,
      onDiscard,
      invalid,
      dirty,
      submitting,
    } = this.props;

    const { selectedContent } = this.state;

    const handleCancelClick = () => {
      if (dirty) {
        onCancel();
      } else {
        onDiscard();
      }
    };

    const contentExists = get(selectedContent, 'id', get(selectedContent, 'contentId', false));
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
      showFilterModal,
      onDiscard,
      ownerGroup,
      joinGroups,
      extFormName,
      putPrefixField,
    } = this.props;

    const { selectedContent } = this.state;

    const content = selectedContent;
    const contentId = get(content, 'contentId', get(content, 'id', ''));
    const contentDescription = get(content, 'contentDescription', get(content, 'description', ''));
    const typeCodeSub = contentId ? contentId.substr(0, 3) : '';
    const contentTypeCode = get(content, 'typeCode', typeCodeSub);

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
          <FormattedMessage id="widget.singleContent.config.content" />: {contentId} - {contentDescription}
        </h3>
        <Button
          className="ChooseContentBody__cancel--btn"
          bsStyle="default"
          onClick={showFilterModal}
        >
          <FormattedMessage id="cms.contents.change" />
        </Button>
        <Field name={putPrefixField('chosenContent')} component="div" />
        <Field
          name={putPrefixField('contentId')}
          component="span"
        />
        <div className="SingleContentConfigFormBody__templateTitle">
          <FormSectionTitle
            titleId="widget.form.publishingSettings"
            requireFields={false}
          />
          <span><FormattedMessage id="widget.form.contentTemplate" /></span>
          <Field
            name={putPrefixField('contentDescription')}
            component="span"
          />
        </div>
        <ContentsFilterModalContainer
          modalTitleText={intl.formatMessage({ id: 'cms.contents.modal.filter.title' })}
          invalid={invalid}
          submitting={submitting}
          onSave={this.handleContentSelect}
          onDiscard={onDiscard}
          ownerGroup={ownerGroup}
          joinGroups={joinGroups}
          compatibility={{
            joinGroups, ownerGroup,
          }}
        />

        {contentId && (
          <Row>
            <Col xs={12}>
              <Field
                component="select"
                name={putPrefixField('modelId')}
                className="form-control"
              >
                {contentTemplateOptions}
              </Field>
            </Col>
          </Row>
        )}
        {!extFormName && this.renderActionButtons()}
      </div>
    );
  }

  render() {
    const {
      extFormName,
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
            {extFormName ? formFields : this.enclosedWithForm(formFields)}
          </Col>
        </Row>
        {!extFormName && (
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

SingleContentConfigFormBody.propTypes = {
  intl: intlShape.isRequired,
  contentTemplates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onDidMount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
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
  extFormName: PropTypes.string,
  putPrefixField: PropTypes.func,
};

SingleContentConfigFormBody.defaultProps = {
  chosenContent: {},
  dirty: false,
  ownerGroup: '',
  joinGroups: [],
  extFormName: '',
  handleSubmit: () => {},
  invalid: false,
  submitting: false,
  putPrefixField: name => name,
};

export default reduxForm({
  form: SingleContentConfigContainerId,
})(SingleContentConfigFormBody);
