import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import {
  Row,
  Col,
  Button,
} from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { required, code, maxLength } from '@entando/utils';

import RenderDropdownTypeaheadInput from 'ui/common/form/RenderDropdownTypeaheadInput';
import RenderContentModelInput from 'ui/common/form/RenderContentModelInput';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';


const EDIT_MODE = 'edit';
const NEW_MODE = 'new';

const maxLength50 = maxLength(50);
const maxLength70 = maxLength(70);

const AddContentModelFormBody = ({
  handleSubmit, invalid, submitting, mode,
}) => (
  <form onSubmit={handleSubmit} className="form-horizontal">
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
            name="code"
            label={
              <FormLabel labelId="cms.contentmodel.form.code" helpId="cms.contentmodel.form.codeHelp" required />
            }
            validate={[required, code, maxLength50]}
            disabled={mode === EDIT_MODE}
          />
          <Field
            component={RenderTextInput}
            name="name"
            label={<FormLabel labelId="cms.label.name" required />}
            validate={[required, maxLength70]}
          />
          <Field
            component={RenderDropdownTypeaheadInput}
            name="contentType"
            label={<FormLabel labelId="cms.contentmodel.list.contentTypeHeader" required />}
            options={[
              {
                id: 10013,
                contentType: 'Generic Content',
              },
              {
                id: 10002,
                contentType: 'News',
              },
            ]}
            labelKey="contentType"
            placeholder="Choose Content Type..."
          />
        </fieldset>
      </Col>
      <Col xs={12}>
        <Field
          name="model"
          label={<FormLabel labelId="cms.contentmodel.form.htmlmodel" required />}
          prepend={(
            <>
              <Button>Inline Editing Assistant</Button>
              <p>
                Content Assist is <strong>ON</strong><br />
                Help About Attributes Type is <strong>OFF</strong><br />
                If you want to change the status, you should set them in Admin Configuration Area
              </p>
            </>
          )}
          component={RenderContentModelInput}
          cols="50"
          rows="8"
          className="form-control"
          validate={[required]}
        />
      </Col>
      <Col xs={12}>
        <Field
          component={RenderTextInput}
          name="stylesheet"
          label={<FormLabel labelId="cms.contentmodel.form.stylesheet" />}
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

AddContentModelFormBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
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
