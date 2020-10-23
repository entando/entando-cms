import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { required, isNumber } from '@entando/utils';
import { isObject } from 'lodash';

import ContentFormFieldCollapse from 'ui/common/content/ContentFormFieldCollapse';
import FormLabel from 'ui/common/form/FormLabel';
import attributeShape from 'ui/edit-content/content-attributes/attributeShape';
import { getAttrValidators, linkValidate } from 'helpers/attrValidation';
import {
  TYPE_BOOLEAN,
  TYPE_CHECKBOX,
  TYPE_DATE,
  TYPE_ENUMERATOR,
  TYPE_ENUMERATOR_MAP,
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
import NumberAttributeField from 'ui/edit-content/content-attributes/NumberAttributeField';
import ThreeStateAttributeField from 'ui/edit-content/content-attributes/ThreeStateAttributeField';
import TimestampAttributeField from 'ui/edit-content/content-attributes/TimestampAttributeField';
import HypertextAttributeField from 'ui/edit-content/content-attributes/HypertextAttributeField';
import LongtextAttributeField from 'ui/edit-content/content-attributes/LongtextAttributeField';
import TextAttributeField from 'ui/edit-content/content-attributes/TextAttributeField';
import AttachAttributeFieldContainer from 'ui/edit-content/content-attributes/AttachAttributeFieldContainer';
import ImageAttributeFieldContainer from 'ui/edit-content/content-attributes/ImageAttributeFieldContainer';
import LinkAttributeField from 'ui/edit-content/content-attributes/LinkAttributeField';
import MonotextAttributeField from 'ui/edit-content/content-attributes/MonotextAttributeField';

const AttributeField = ({
  name,
  attribute,
  label,
  hasLabel,
  labelSize,
  langCode,
  mainGroup,
  joinGroups,
  selectedLangTab,
  locale,
  isSub,
}) => {
  const {
    type,
    code,
    names: attName,
    mandatory,
    listFilter,
    indexable,
    validationRules,
  } = attribute;

  const i18nName = isObject(attName)
    ? (attName[locale] || code) : (attName || code);

  const helpTextArr = [];
  if (listFilter) helpTextArr.push('Can be used as a filter in lists');
  if (indexable) helpTextArr.push('Searchable');
  const helpText = helpTextArr.join('<br>');
  const fieldLabel = label || (
    <FormLabel
      labelText={i18nName}
      required={mandatory}
      helpText={helpText}
    />
  );

  const validate = getAttrValidators({ ...validationRules, mandatory });
  if (mandatory) validate.push(required);


  let AttributeFieldComp;
  let actualName = `${name}.value`;
  const extraProps = {};

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
    case TYPE_TIMESTAMP:
      AttributeFieldComp = TimestampAttributeField;
      break;
    case TYPE_HYPERTEXT:
      AttributeFieldComp = HypertextAttributeField;
      actualName = `${name}.values.${langCode}`;
      break;
    case TYPE_NUMBER:
      validate.push(isNumber);
      AttributeFieldComp = NumberAttributeField;
      break;
    case TYPE_THREESTATE:
      AttributeFieldComp = ThreeStateAttributeField;
      break;
    case TYPE_LONGTEXT:
      AttributeFieldComp = LongtextAttributeField;
      actualName = `${name}.values.${langCode}`;
      break;
    case TYPE_TEXT:
      AttributeFieldComp = TextAttributeField;
      actualName = `${name}.values.${langCode}`;
      break;
    case TYPE_ATTACH:
      AttributeFieldComp = AttachAttributeFieldContainer;
      actualName = `${name}.values`;
      break;
    case TYPE_IMAGE:
      AttributeFieldComp = ImageAttributeFieldContainer;
      actualName = `${name}.values`;
      break;
    case TYPE_LINK:
      AttributeFieldComp = LinkAttributeField;
      actualName = name;
      if (mandatory) validate.push(linkValidate(langCode));
      break;
    case TYPE_MONOTEXT:
      AttributeFieldComp = MonotextAttributeField;
      break;
    default:
      return null;
  }

  const field = (
    <Field
      name={actualName}
      attribute={attribute}
      component={AttributeFieldComp}
      label={fieldLabel}
      hasLabel={hasLabel}
      labelSize={labelSize}
      validate={validate}
      mainGroup={mainGroup}
      joinGroups={joinGroups}
      {...(
        [TYPE_LINK, TYPE_IMAGE, TYPE_ATTACH, TYPE_BOOLEAN, TYPE_THREESTATE].includes(type)
        && { langCode, selectedLangTab }
      )}
      {...extraProps}
    />
  );

  return isSub ? field : (
    <ContentFormFieldCollapse label={fieldLabel}>{field}</ContentFormFieldCollapse>
  );
};

AttributeField.propTypes = {
  name: PropTypes.string.isRequired,
  attribute: PropTypes.shape(attributeShape).isRequired,
  label: PropTypes.node,
  hasLabel: PropTypes.bool,
  langCode: PropTypes.string,
  labelSize: PropTypes.number,
  mainGroup: PropTypes.string,
  joinGroups: PropTypes.arrayOf(PropTypes.string),
  selectedLangTab: PropTypes.string.isRequired,
  locale: PropTypes.string,
  isSub: PropTypes.bool,
};

AttributeField.defaultProps = {
  label: null,
  hasLabel: true,
  langCode: 'en',
  mainGroup: '',
  joinGroups: [],
  locale: '',
  labelSize: 2,
  isSub: false,
};

export default AttributeField;
