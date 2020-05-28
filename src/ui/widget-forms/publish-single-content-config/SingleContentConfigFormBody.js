import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  intlShape, FormattedMessage,
} from 'react-intl';
import { Field } from 'redux-form';
import {
  Button, Row, Col, FormGroup,
} from 'patternfly-react';
import ContentsFilterModalContainer from '../contents-filter/ContentsFilterModalContainer';

export default class SingleContentConfigFormBody extends PureComponent {
  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  render() {
    const {
      contentTemplates,
      handleSubmit,
      invalid,
      submitting,
      intl,
      widgetCode,
      chosenContents,
      dirty,
      onCancel,
      onDiscard,
      showFilterModal,
      onSelectContent,
    } = this.props;
    const noContents = chosenContents.length === 0;
    console.log('noContents', noContents);
    console.log('chosenContents', chosenContents);

    const handleCancelClick = () => {
      if (dirty) {
        onCancel();
      } else {
        onDiscard();
      }
    };

    const content = chosenContents[0];
    const contentTypeCodeSub = content.contentId !== undefined ? content.contentId.substr(0, 3) : '';
    const contentTypeCode = content.typeCode || contentTypeCodeSub;
    console.log('contentTypeCode', contentTypeCode);

    const filterByCode = contentTemplate => contentTemplate.contentType === contentTypeCode;
    const contentTemplatesByContentType = [{ id: 'default', descr: intl.formatMessage({ id: 'widget.form.default' }) },
      ...contentTemplates.filter(filterByCode)];
    console.log('contentTemplatesByContentType', contentTemplatesByContentType);

    const contentTemplateOptions = contentTemplatesByContentType
      .map(item => (
        <option key={`opt-${item.id}`} value={item.id}>
          {item.descr}
        </option>
      ));


    return (
      <Fragment>
        <h2><FormattedMessage id="widget.form.content" /></h2>
        <form onSubmit={handleSubmit} className="form-horizontal SingleContentConfigForm well">
          <FormGroup>
            <Row>
              <Col xs={12}>
                <label><FormattedMessage id="widget.singleContent.config.title" /> </label>

                <h3> <FormattedMessage id="widget.singleContent.config.content" />: {content.contentId} - {content.contentDescription}</h3>

                <Field
                  name="contentId"
                  component="span"
                />
                <label><FormattedMessage id="widget.form.contentTemplate" /></label>
                <Field
                  name="contentDescription"
                  component="span"
                />
                <Button
                  className="pull-right ChooseContentBody__cancel--btn"
                  bsStyle="default"
                  onClick={showFilterModal}
                >
                  <FormattedMessage id="cms.contents.change" />
                </Button>
                <ContentsFilterModalContainer
                  modalTitleText={intl.formatMessage({ id: 'cms.contents.modal.filter.title' })}
                  invalid={invalid}
                  submitting={submitting}
                  onSave={onSelectContent}
                  onDiscard={onDiscard}
                />
              </Col>
            </Row>

            { content.contentId
          && (
          <Row>
            <Col xs={12}>  <Field
              component="select"
              name="contentTemplateModelId"
              className="form-control"
            >
              {contentTemplateOptions}
            </Field>
            </Col>
          </Row>
          )
        }

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


              </Col>
            </Row>
          </FormGroup>
        </form>
      </Fragment>
    );
  }
}

SingleContentConfigFormBody.propTypes = {
  intl: intlShape.isRequired,
  contentTemplates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onDidMount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  language: PropTypes.string.isRequired,
  widgetCode: PropTypes.string.isRequired,
  chosenContents: PropTypes.arrayOf(PropTypes.shape({})),
  dirty: PropTypes.bool,
  onDiscard: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  showFilterModal: PropTypes.func.isRequired,
  onSelectContent: PropTypes.func.isRequired,
};

SingleContentConfigFormBody.defaultProps = {
  chosenContents: [{}],
  dirty: false,
};
