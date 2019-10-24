import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, FormSection } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import {
  Button, Row, Col, Alert,
} from 'patternfly-react';
import AttributeInfo from 'ui/common/attributes/AttributeInfo';
import AttributeInfoComposite from 'ui/common/attributes/AttributeInfoComposite';
import AttributeRole from 'ui/common/attributes/AttributeRole';
import AttributeOgnlValidation from 'ui/common/attributes/AttributeOgnlValidation';
import AttributeHypeLongMonoTextSettings from 'ui/common/attributes/AttributeHypeLongMonoTextSettings';
import AttributeEnumSettings from 'ui/common/attributes/AttributeEnumSettings';
import AttributeEnumMapSettings from 'ui/common/attributes/AttributeEnumMapSettings';
import AttributeMonoListMonoSettings from 'ui/common/attributes/AttributeMonoListMonoSettings';
import AttributesNumber from 'ui/common/attributes/AttributesNumber';
import AttributesDateSettings from 'ui/common/attributes/AttributesDateSettings';
import AttributeListTableComposite from 'ui/common/attributes/AttributeListTableComposite';

import {
  MODE_ADD_COMPOSITE,
  MODE_EDIT_COMPOSITE,
  MODE_ADD_ATTRIBUTE_COMPOSITE,
  MODE_EDIT,
  TYPE_COMPOSITE,
  TYPE_BOOLEAN,
  TYPE_CHECKBOX,
  TYPE_DATE,
  TYPE_ENUMERATOR,
  TYPE_ENUMERATOR_MAP,
  TYPE_MONOLIST,
  TYPE_LIST,
  TYPE_NUMBER,
  TYPE_THREESTATE,
  TYPE_TIMESTAMP,
} from 'state/content-type/const';

export class EditAttributeFormBody extends Component {
  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount(this.props);
  }

  render() {
    const {
      selectedAttributeType,
      selectedAttributeTypeForAddComposite,
      attributeCode,
      mode,
      nestedAttributeComposite,
      isSearchable,
      isIndexable,
      attributesList,
      onSubmit,
      allowedRoles,
      handleSubmit,
      invalid,
      submitting,
    } = this.props;

    const isComposite = mode === MODE_EDIT_COMPOSITE || mode === MODE_ADD_COMPOSITE;
    const isModeAddAttributeComposite = mode === MODE_ADD_ATTRIBUTE_COMPOSITE;
    const attributeType = isModeAddAttributeComposite
      ? selectedAttributeTypeForAddComposite.code
      : selectedAttributeType;

    const labelsubmit = !isComposite ? 'cms.label.continue' : 'cms.label.save';

    const renderAttributeInfo = () => (isComposite ? (
      <AttributeInfoComposite />
    ) : (
      <AttributeInfo isSearchable={isSearchable} isIndexable={isIndexable} mode={mode} />
    ));

    const renderSelectedAttribute = () => {
      switch (attributeType) {
        case TYPE_BOOLEAN:
          return null;
        case TYPE_CHECKBOX:
          return null;
        case TYPE_THREESTATE:
          return null;
        case TYPE_TIMESTAMP:
          return null;
        case TYPE_MONOLIST:
          return isComposite ? (
            <AttributeListTableComposite {...this.props} />
          ) : (
            <AttributeMonoListMonoSettings
              {...this.props}
              attributeType={selectedAttributeType}
              attributesList={attributesList}
            />
          );
        case TYPE_LIST:
          return (
            <AttributeMonoListMonoSettings
              {...this.props}
              attributeType={selectedAttributeType}
              attributesList={attributesList}
            />
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
              <AttributesDateSettings />
            </FormSection>
          );
        case TYPE_ENUMERATOR:
          return <AttributeEnumSettings mode={MODE_EDIT} />;
        case TYPE_ENUMERATOR_MAP:
          return <AttributeEnumMapSettings />;
        case TYPE_COMPOSITE:
          return isComposite ? <AttributeListTableComposite {...this.props} /> : null;

        default:
          return (
            <FormSection name="validationRules">
              <AttributeHypeLongMonoTextSettings {...this.props} />
            </FormSection>
          );
      }
    };

    const renderAttributeRole = () => (!isComposite ? <AttributeRole {...this.props} /> : null);

    const renderOgnlValidation = () => (!isComposite ? (
      <FormSection name="validationRules">
        <AttributeOgnlValidation />
      </FormSection>
    ) : null);

    const header = () => {
      switch (selectedAttributeType) {
        case TYPE_COMPOSITE:
          return (
            <Alert type="info">
              <FormattedMessage id="cms.contenttype.label.working" /> {attributeCode}
            </Alert>
          );
        case TYPE_MONOLIST:
          return mode === MODE_EDIT_COMPOSITE ? (
            <Alert type="info">
              <FormattedMessage id="cms.contenttype.label.working" />
              {TYPE_COMPOSITE},&nbsp;
              <FormattedMessage id="cms.contenttype.label.element.of" />
              &nbsp;
              {isComposite ? attributeCode : nestedAttributeComposite}&nbsp; ({TYPE_MONOLIST})
            </Alert>
          ) : null;
        default:
          return null;
      }
    };

    return (
      <form
        onSubmit={handleSubmit(values => onSubmit(values, allowedRoles, mode))}
        className="form-horizontal"
      >
        <Row>
          <Col xs={12}>{header()}</Col>
        </Row>
        <Row>
          <Col xs={12}>
            <fieldset className="no-padding">
              {renderAttributeInfo()}
              {renderAttributeRole()}
              {renderSelectedAttribute()}
              {renderOgnlValidation()}
            </fieldset>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <Button
              className="pull-right EditAttributeForm__continue--btn"
              type="submit"
              bsStyle="primary"
              disabled={invalid || submitting}
            >
              <FormattedMessage id={labelsubmit} />
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

EditAttributeFormBody.propTypes = {
  onDidMount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  contentTypeAttributeCode: PropTypes.string,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  selectedAttributeType: PropTypes.string,
  selectedAttributeTypeForAddComposite: PropTypes.PropTypes.shape({}),
  attributeCode: PropTypes.string.isRequired,
  allowedRoles: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      descr: PropTypes.string,
    }),
  ),
  indexable: PropTypes.bool,
  listFilter: PropTypes.bool,
  mode: PropTypes.string.isRequired,
  attributesList: PropTypes.arrayOf(PropTypes.string).isRequired,
  nestedAttributeComposite: PropTypes.string.isRequired,
  isSearchable: PropTypes.bool,
  isIndexable: PropTypes.bool,
};

EditAttributeFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  contentTypeAttributeCode: '',
  selectedAttributeType: '',
  selectedAttributeTypeForAddComposite: '',
  indexable: false,
  listFilter: false,
  allowedRoles: [],
  isSearchable: false,
  isIndexable: false,
};

const EditAttributeForm = reduxForm({
  form: 'attribute',
})(EditAttributeFormBody);

export default EditAttributeForm;
