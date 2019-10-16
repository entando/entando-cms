import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, FormSection, Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import {
  Button, Row, Col, FormGroup, Alert,
} from 'patternfly-react';
import AttributeOgnlValidation from 'ui/common/attributes/AttributeOgnlValidation';
import AttributeHypeLongMonoTextSettings from 'ui/common/attributes/AttributeHypeLongMonoTextSettings';
import AttributeEnumMapSettings from 'ui/common/attributes/AttributeEnumMapSettings';
import AttributesNumber from 'ui/common/attributes/AttributesNumber';
import AttributesDateSettings from 'ui/common/attributes/AttributesDateSettings';
import AttributeEnumSettings from 'ui/common/attributes/AttributeEnumSettings';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';
import FormLabel from 'ui/common/form/FormLabel';
import AttributeListTableComposite from 'ui/common/attributes/AttributeListTableComposite';
import AttributeInfoComposite from 'ui/common/attributes/AttributeInfoComposite';

import {
  TYPE_BOOLEAN,
  TYPE_CHECKBOX,
  TYPE_THREESTATE,
  TYPE_NUMBER,
  TYPE_DATE,
  TYPE_ENUMERATOR,
  TYPE_ENUMERATOR_MAP,
  TYPE_TEXT,
  TYPE_COMPOSITE,
  TYPE_MONOLIST,
  MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE,
} from 'state/content-type/const';

const NO_INFO_ATTRIBUTE = [TYPE_BOOLEAN, TYPE_CHECKBOX, TYPE_THREESTATE];

export class MonolistAttributeFormBody extends Component {
  componentDidMount() {
    const { onDidMount, ...allprops } = this.props;
    onDidMount(allprops);
  }

  render() {
    const {
      attributeCode,
      selectedAttributeType,
      isIndexable,
      type,
      invalid,
      submitting,
      onSubmit,
      mode,
      attributesList,
      onAddAttribute,
      onClickDelete,
      onMove,
      compositeAttributes,
      handleSubmit,
    } = this.props;
    const isMonoListComposite = mode === MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE;
    const attributeType = isMonoListComposite ? TYPE_COMPOSITE : type;
    const renderIndexable = () => {
      if (isIndexable) {
        return (
          <FormGroup>
            <label htmlFor="indexable" className="col-xs-2 control-label">
              <FormLabel labelId="cms.label.indexable" />
            </label>
            <Col xs={4}>
              <Field component={SwitchRenderer} name="indexable" />
            </Col>
          </FormGroup>
        );
      }
      return '';
    };

    const renderAttributeInfo = () => {
      if (isMonoListComposite) {
        return <AttributeInfoComposite />;
      }

      return !NO_INFO_ATTRIBUTE.includes(type) ? (
        <fieldset className="no-padding">
          <legend>
            <FormattedMessage id="cms.label.info" />
            <div className="MonolistAttributeForm__required-fields text-right">
              * <FormattedMessage id="cms.label.fieldsRequired" />
            </div>
          </legend>
          <Field
            component={RenderTextInput}
            name="type"
            label={<FormLabel labelId="cms.contenttype.form.type" />}
            disabled
          />
          {renderIndexable()}
        </fieldset>
      ) : null;
    };

    const renderSelectedAttribute = () => {
      switch (attributeType) {
        case TYPE_TEXT:
          return (
            <FormSection name="validationRules">
              <AttributeHypeLongMonoTextSettings {...this.props} />
            </FormSection>
          );
        case TYPE_NUMBER:
          return (
            <FormSection name="validationRules">
              <AttributesNumber {...this.props} />
            </FormSection>
          );
        case TYPE_DATE:
          return (
            <FormSection name="validationRules">
              <AttributesDateSettings {...this.props} />
            </FormSection>
          );
        case TYPE_ENUMERATOR:
          return (
            <AttributeEnumSettings
              enumeratorExtractorBeans={selectedAttributeType.enumeratorExtractorBeans}
            />
          );
        case TYPE_ENUMERATOR_MAP:
          return (
            <AttributeEnumMapSettings
              enumeratorMapExtractorBeans={selectedAttributeType.enumeratorMapExtractorBeans}
            />
          );
        case TYPE_COMPOSITE: {
          return isMonoListComposite ? (
            <AttributeListTableComposite
              {...this.props}
              attributesList={attributesList}
              compositeAttributes={compositeAttributes}
              onAddAttribute={onAddAttribute}
              onClickDelete={onClickDelete}
              onMove={onMove}
              invalid={invalid}
              submitting={submitting}
            />
          ) : null;
        }
        default:
          return null;
      }
    };

    const renderOgnlValidation = () => (!isMonoListComposite ? (
      <FormSection name="validationRules">
        <AttributeOgnlValidation />
      </FormSection>
    ) : null);

    return (
      <div className="MonoListAttributeForm">
        <Alert type="info">
          <FormattedMessage id="cms.contenttype.label.working" />
          {type},&nbsp;
          <FormattedMessage id="cms.contenttype.label.element.of" />
          &nbsp;
          {attributeCode}&nbsp; ({isMonoListComposite ? TYPE_MONOLIST : selectedAttributeType}).
        </Alert>
        <form onSubmit={handleSubmit(onSubmit)} className="form-horizontal">
          <Row>
            <Col xs={12}>
              <fieldset className="no-padding">
                <FormSection name="nestedAttribute">
                  {renderAttributeInfo()}
                  {renderSelectedAttribute()}
                  {renderOgnlValidation()}
                </FormSection>
              </fieldset>
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={12}>
              <Button
                className="pull-right MonolistAttributeForm__continue--btn"
                type="submit"
                bsStyle="primary"
                disabled={invalid || submitting}
              >
                <FormattedMessage id="cms.label.continue" />
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

MonolistAttributeFormBody.propTypes = {
  onDidMount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onAddAttribute: PropTypes.func,
  onClickDelete: PropTypes.func,
  onMove: PropTypes.func,
  type: PropTypes.string,
  attributeCode: PropTypes.string,
  selectedAttributeType: PropTypes.string,
  mode: PropTypes.string,
  attributesList: PropTypes.arrayOf(PropTypes.string),
  isIndexable: PropTypes.bool,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  compositeAttributes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

MonolistAttributeFormBody.defaultProps = {
  onAddAttribute: null,
  onClickDelete: null,
  onMove: null,
  invalid: false,
  submitting: false,
  isIndexable: false,
  type: '',
  attributeCode: '',
  selectedAttributeType: TYPE_MONOLIST,
  mode: '',
  attributesList: [],
};

const MonolistAttributeForm = reduxForm({
  form: 'monoListAttribute',
})(MonolistAttributeFormBody);

export default MonolistAttributeForm;
