import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form';

import FormLabel from 'ui/common/form/FormLabel';
import attributeShape from 'ui/edit-content/content-attributes/attributeShape';
import {
  TYPE_BOOLEAN,
  TYPE_CHECKBOX,
  TYPE_DATE,
  TYPE_ENUMERATOR,
  TYPE_ENUMERATOR_MAP,
  TYPE_COMPOSITE,
  TYPE_LIST,
  TYPE_MONOLIST,
  TYPE_NUMBER,
  TYPE_THREESTATE,
  TYPE_TIMESTAMP,
  TYPE_HYPERTEXT,
  TYPE_LONGTEXT,
  TYPE_TEXT,
  TYPE_ATTACH,
  TYPE_IMAGE,
  TYPE_LINK,
  TYPE_MONOTEXT,
} from 'state/content-type/const';
import BooleanAttributeField from 'ui/edit-content/content-attributes/BooleanAttributeField';
import CheckboxAttributeField from 'ui/edit-content/content-attributes/CheckboxAttributeField';
import DateAttributeField from 'ui/edit-content/content-attributes/DateAttributeField';
import EnumeratorAttributeField from 'ui/edit-content/content-attributes/EnumeratorAttributeField';
import EnumeratorMapAttributeField from 'ui/edit-content/content-attributes/EnumeratorMapAttributeField';
import CompositeAttributeField from 'ui/edit-content/content-attributes/CompositeAttributeField';
import ListAttributeField from 'ui/edit-content/content-attributes/ListAttributeField';
import MonolistAttributeField from 'ui/edit-content/content-attributes/MonolistAttributeField';
import NumberAttributeField from 'ui/edit-content/content-attributes/NumberAttributeField';
import ThreeStateAttributeField from 'ui/edit-content/content-attributes/ThreeStateAttributeField';
import TimestampAttributeField from 'ui/edit-content/content-attributes/TimestampAttributeField';
import HypertextAttributeField from 'ui/edit-content/content-attributes/HypertextAttributeField';
import LongtextAttributeField from 'ui/edit-content/content-attributes/LongtextAttributeField';
import TextAttributeField from 'ui/edit-content/content-attributes/TextAttributeField';
import AttachAttributeField from 'ui/edit-content/content-attributes/AttachAttributeField';
import ImageAttributeField from 'ui/edit-content/content-attributes/ImageAttributeField';
import LinkAttributeField from 'ui/edit-content/content-attributes/LinkAttributeField';
import MonotextAttributeField from 'ui/edit-content/content-attributes/MonotextAttributeField';

// TODO: validation
const AttributeField = ({
  name,
  attribute,
  label,
}) => {
  const {
    type,
    code,
    mandatory,
    listFilter,
    indexable,
  } = attribute;

  const helpTextArr = [];
  if (listFilter) helpTextArr.push('Can be used as a filter in lists');
  if (indexable) helpTextArr.push('Searchable');
  const helpText = helpTextArr.join('<br>');

  const fieldLabel = label || (
    <FormLabel
      labelText={code}
      required={mandatory}
      helpText={helpText}
    />
  );

  let fieldName = name;
  let FieldComp = Field;
  let AttributeFieldComp;

  switch (type) {
    case TYPE_BOOLEAN:
      AttributeFieldComp = BooleanAttributeField;
      break;
    case TYPE_CHECKBOX:
      AttributeFieldComp = CheckboxAttributeField;
      break;
    case TYPE_DATE:
      AttributeFieldComp = DateAttributeField;
      break;
    case TYPE_ENUMERATOR:
      AttributeFieldComp = EnumeratorAttributeField;
      break;
    case TYPE_ENUMERATOR_MAP:
      AttributeFieldComp = EnumeratorMapAttributeField;
      break;
    case TYPE_COMPOSITE:
      AttributeFieldComp = CompositeAttributeField;
      break;
    case TYPE_LIST:
      fieldName = `${name}.elements`;
      FieldComp = FieldArray;
      AttributeFieldComp = ListAttributeField;
      break;
    case TYPE_MONOLIST:
      AttributeFieldComp = MonolistAttributeField;
      break;
    case TYPE_TIMESTAMP:
      AttributeFieldComp = TimestampAttributeField;
      break;
    case TYPE_HYPERTEXT:
      AttributeFieldComp = HypertextAttributeField;
      break;
    case TYPE_NUMBER:
      AttributeFieldComp = NumberAttributeField;
      break;
    case TYPE_THREESTATE:
      AttributeFieldComp = ThreeStateAttributeField;
      break;
    case TYPE_LONGTEXT:
      AttributeFieldComp = LongtextAttributeField;
      break;
    case TYPE_TEXT:
      AttributeFieldComp = TextAttributeField;
      break;
    case TYPE_ATTACH:
      AttributeFieldComp = AttachAttributeField;
      break;
    case TYPE_IMAGE:
      AttributeFieldComp = ImageAttributeField;
      break;
    case TYPE_LINK:
      AttributeFieldComp = LinkAttributeField;
      break;
    case TYPE_MONOTEXT:
      AttributeFieldComp = MonotextAttributeField;
      break;
    default:
      return null;
  }

  return (
    <FieldComp
      name={fieldName}
      attribute={attribute}
      component={AttributeFieldComp}
      label={fieldLabel}
    />
  );
};

AttributeField.propTypes = {
  name: PropTypes.string.isRequired,
  attribute: PropTypes.shape(attributeShape).isRequired,
  label: PropTypes.node,
};

AttributeField.defaultProps = {
  label: null,
};

export default AttributeField;
