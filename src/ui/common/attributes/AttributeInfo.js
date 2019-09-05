import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Row, Col, FormGroup } from 'patternfly-react';
import { required, maxLength } from '@entando/utils';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';
import { MODE_EDIT, MODE_ADD } from 'state/content-type/const';

const maxLength10 = maxLength(10);
const maxLength50 = maxLength(50);

const AttributeInfo = ({ isSearchable, isIndexable, mode }) => {
  const renderSearchable = () => {
    const html = (
      <FormGroup>
        <label htmlFor="indexable" className="col-xs-2 control-label">
          <FormLabel labelId="cms.label.indexable" />
        </label>
        <Col xs={4}>
          <Field component={SwitchRenderer} name="indexable" />
        </Col>
      </FormGroup>
    );
    return isSearchable ? html : null;
  };

  const renderIndexable = () => {
    const html = (
      <FormGroup>
        <label htmlFor="listFilter" className="col-xs-2 control-label">
          <FormLabel labelId="cms.contenttype.form.filterList" />
        </label>
        <Col xs={4}>
          <Field component={SwitchRenderer} name="listFilter" />
        </Col>
      </FormGroup>
    );
    return isIndexable ? html : null;
  };

  return (
    <Row>
      <Col xs={12}>
        <fieldset className="no-padding">
          <legend>
            <FormattedMessage id="cms.label.info" />
            <div className="DataTypeForm__required-fields text-right">
            * <FormattedMessage id="cms.label.fieldsRequired" />
            </div>
          </legend>
          <Field
            component={RenderTextInput}
            name="type"
            label={
              <FormLabel labelId="cms.contenttype.form.type" />
            }
            disabled
          />
          <Field
            component={RenderTextInput}
            name="code"
            label={
              <FormLabel labelId="cms.contenttype.form.code" helpId="cms.contenttype.form.codeHelp" required />
          }
            validate={[required, maxLength10]}
            disabled={mode === MODE_EDIT}
          />
          <Field
            component={RenderTextInput}
            name="name"
            label={
              <FormLabel labelId="cms.contenttype.form.name" helpId="validateForm.name.help" />
          }
            validate={[maxLength50]}
          />
          <FormGroup>
            <label htmlFor="mandatory" className="col-xs-2 control-label">
              <FormLabel labelId="cms.label.mandatory" />
            </label>
            <Col xs={4}>
              <Field component={SwitchRenderer} name="mandatory" />
            </Col>
          </FormGroup>
          {renderSearchable()}
          {renderIndexable()}
        </fieldset>
      </Col>
    </Row>
  );
};


AttributeInfo.propTypes = {
  isSearchable: PropTypes.bool,
  isIndexable: PropTypes.bool,
  mode: PropTypes.string,
};

AttributeInfo.defaultProps = {
  isSearchable: false,
  isIndexable: false,
};

AttributeInfo.defaultProps = {
  mode: MODE_ADD,
};

export default AttributeInfo;
