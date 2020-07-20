import React from 'react';
import PropTypes from 'prop-types';
import {
  Field,
  FieldArray,
  fieldArrayFieldsPropTypes,
} from 'redux-form';

import AttributeField from 'ui/edit-content/content-attributes/AttributeField';
import CompositeAttributeField from 'ui/edit-content/content-attributes/CompositeAttributeField';
import ListAttributeField from 'ui/edit-content/content-attributes/ListAttributeField';
import MonolistAttributeField from 'ui/edit-content/content-attributes/MonolistAttributeField';
import FormLabel from 'ui/common/form/FormLabel';
import {
  TYPE_COMPOSITE,
  TYPE_LIST,
  TYPE_MONOLIST,
  TYPE_TIMESTAMP,
} from 'state/content-type/const';
import { getDateTimeObjFromStr } from 'helpers/attrUtils';

const renderField = (name, idx, attribute, langCode, mainGroup, joinGroups) => {
  const {
    type, code, mandatory, listFilter, indexable, name: attName,
  } = attribute;

  const helpTextArr = [];
  if (listFilter) helpTextArr.push('Can be used as a filter in lists');
  if (indexable) helpTextArr.push('Searchable');
  const helpText = helpTextArr.join('<br>');
  const fieldLabel = (
    <FormLabel
      labelText={attName || code}
      required={mandatory}
      helpText={helpText}
    />
  );

  let fieldName = name;
  let FieldComp = Field;
  let AttributeFieldComp;

  switch (type) {
    case TYPE_COMPOSITE:
      fieldName = `${name}.compositeelements`;
      FieldComp = FieldArray;
      AttributeFieldComp = CompositeAttributeField;
      break;
    case TYPE_LIST:
      fieldName = `${name}.listelements.${langCode}`;
      FieldComp = FieldArray;
      AttributeFieldComp = ListAttributeField;
      break;
    case TYPE_MONOLIST:
      fieldName = `${name}.elements`;
      FieldComp = FieldArray;
      AttributeFieldComp = MonolistAttributeField;
      break;
    default:
      return (
        <AttributeField
          key={code}
          name={name}
          attribute={attribute}
          langCode={langCode}
          mainGroup={mainGroup}
          joinGroups={joinGroups}
        />
      );
  }

  return (
    <FieldComp
      key={code}
      name={fieldName}
      attribute={attribute}
      component={AttributeFieldComp}
      label={fieldLabel}
      mainGroup={mainGroup}
      joinGroups={joinGroups}
    />
  );
};

const AttributeFields = ({
  attributes, fields, reInitializeForm, content, typeCode, mainGroup, langCode, joinGroups,
}) => {
  if (fields.length < attributes.length) {
    // initialize fields with values from attributes prop through `.push()` method
    // as it cannot be set directly from props
    const atts = [];
    attributes.forEach((attr) => {
      const {
        type, code, value, values, elements, compositeelements, listelements, name,
      } = attr;
      atts.push({
        code,
        value: type === TYPE_TIMESTAMP ? (getDateTimeObjFromStr(value)) : value,
        values,
        elements,
        compositeelements,
        listelements,
        name,
      });
    });
    reInitializeForm('editcontentform', {
      ...content, attributes: atts, contentType: typeCode, mainGroup, joinGroups,
    });
  }

  return fields.map((name, idx) => renderField(name, idx, attributes[idx],
    langCode, mainGroup, joinGroups));
};

AttributeFields.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.object).isRequired,
  fields: PropTypes.shape(fieldArrayFieldsPropTypes).isRequired,
  reInitializeForm: PropTypes.func.isRequired,
  content: PropTypes.shape({}).isRequired,
  typeCode: PropTypes.string.isRequired,
  mainGroup: PropTypes.string.isRequired,
  langCode: PropTypes.string.isRequired,
  joinGroups: PropTypes.arrayOf(PropTypes.string),
};

export default AttributeFields;
