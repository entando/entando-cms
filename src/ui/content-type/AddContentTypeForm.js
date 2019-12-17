import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import {
  InputGroup, Button, Row, Col,
} from 'patternfly-react';

import { required, maxLength } from '@entando/utils';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import FormLabel from 'ui/common/form/FormLabel';
import AttributeListTable from 'ui/common/contenttype-attributes/AttributeListTable';
import DeleteAttributeModalContainer from 'ui/content-type/attributes/DeleteAttributeModalContainer';

const uppercaseThreeLetters = value => (value && !/[A-Z]$/g.test(value) ? <FormattedMessage id="validateForm.element.code" /> : undefined);

const maxLength3 = maxLength(3);

const maxLength50 = maxLength(50);

export class AddContentTypeFormBody extends Component {
  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount(this.props);
  }

  render() {
    const {
      attributesType,
      mode,
      handleSubmit,
      onAddAttribute,
      invalid,
      submitting,
      contentTypeCode,
      viewPages,
      contentModels,
    } = this.props;

    const isEdit = mode === 'edit';

    const selectOptions = attributesType.map(item => ({
      value: item,
      text: item,
    }));

    const renderAttributeTable = () => {
      if (isEdit) {
        return (
          <Row>
            <AttributeListTable entityCode={contentTypeCode} {...this.props} />
            <DeleteAttributeModalContainer />
          </Row>
        );
      }
      return '';
    };

    const renderSelectOption = () => {
      if (isEdit) {
        return (
          <div>
            <legend>
              <FormattedMessage id="cms.contenttype.attributes.label" />
            </legend>
            <InputGroup>
              <Field
                component={RenderSelectInput}
                options={selectOptions}
                defaultOptionId="cms.label.select"
                label={<FormLabel labelId="cms.contenttype.form.type" required />}
                name="type"
              />
              <span className="input-group-btn">
                <Button
                  type="button"
                  className="pull-right ContentTypeForm__add"
                  bsStyle="primary"
                  onClick={() => onAddAttribute(this.props)}
                  disabled={invalid || submitting}
                >
                  <FormattedMessage id="cms.label.add" />
                </Button>
              </span>
            </InputGroup>
          </div>
        );
      }
      return '';
    };

    const renderMetadataSection = () => {
      if (isEdit) {
        const selectViewPageOptions = [{ value: '', text: 'None' }]
          .concat(viewPages.map(({ code }) => ({
            value: code,
            text: code,
          })));

        const selectContentModelOptions = [{ value: '', text: 'No model' }]
          .concat(contentModels.map(({ id, descr }) => ({
            value: id,
            text: descr,
          })));

        return (
          <div>
            <legend>
              <FormattedMessage id="cms.label.metadata" />
            </legend>
            <Field
              component={RenderSelectInput}
              options={selectViewPageOptions}
              label={
                <FormLabel labelId="cms.contenttype.form.metadata.viewPage" />
              }
              name="viewPage"
            />
            <Field
              component={RenderSelectInput}
              options={selectContentModelOptions}
              label={
                <FormLabel labelId="cms.contenttype.form.metadata.defaultContentModel" />
              }
              name="defaultContentModel"
            />
            <Field
              component={RenderSelectInput}
              options={selectContentModelOptions}
              label={
                <FormLabel labelId="cms.contenttype.form.metadata.defaultContentModelLists" />
              }
              name="defaultContentModelLists"
            />
          </div>
        );
      }
      return '';
    };

    return (
      <form onSubmit={handleSubmit} className="form-horizontal ContentTypeForm">
        <Row>
          <Col xs={12}>
            <fieldset className="no-padding">
              <legend>
                <FormattedMessage id="cms.label.info" />
                <div className="ContentTypeForm__required-fields text-right">
                  * <FormattedMessage id="cms.label.fieldsRequired" />
                </div>
              </legend>
              <Field
                component={RenderTextInput}
                className="ContentTypeForm__input-code"
                name="code"
                label={(
                  <FormLabel
                    labelId="cms.contenttype.form.code"
                    helpId="validateForm.element.code"
                    required
                  />
)}
                validate={[required, uppercaseThreeLetters, maxLength3]}
                disabled={isEdit}
              />
              <Field
                component={RenderTextInput}
                name="name"
                label={(
                  <FormLabel
                    labelId="cms.contenttype.form.name"
                    helpId="validateForm.name.help"
                    required
                  />
)}
                validate={[required, maxLength50]}
              />
              {renderMetadataSection()}
              {renderSelectOption()}
              {renderAttributeTable()}
            </fieldset>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <Button
              className="pull-right AddContentTypeFormBody__save--btn"
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

AddContentTypeFormBody.propTypes = {
  onDidMount: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onAddAttribute: PropTypes.func,
  attributesType: PropTypes.arrayOf(PropTypes.string).isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  mode: PropTypes.string,
  contentTypeCode: PropTypes.string,
  viewPages: PropTypes.arrayOf(PropTypes.object),
  contentModels: PropTypes.arrayOf(PropTypes.object),
};

AddContentTypeFormBody.defaultProps = {
  onDidMount: () => {},
  onAddAttribute: () => {},
  invalid: false,
  submitting: false,
  mode: 'add',
  contentTypeCode: '',
  viewPages: [],
  contentModels: [],
};

const AddContentTypeForm = reduxForm({
  form: 'ContentType',
})(AddContentTypeFormBody);

export default AddContentTypeForm;
