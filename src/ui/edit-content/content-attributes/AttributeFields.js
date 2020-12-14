import React from 'react';
import PropTypes from 'prop-types';
import {
  Field,
  FieldArray,
  fieldArrayFieldsPropTypes,
} from 'redux-form';
import { isObject } from 'lodash';

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
  TYPE_BOOLEAN,
  TYPE_CHECKBOX,
  TYPE_THREESTATE,
} from 'state/content-type/const';
import { getDateTimeObjFromStr } from 'helpers/attrUtils';

const toFieldValue = (attrValue, type) => {
  switch (type) {
    case TYPE_TIMESTAMP:
      return getDateTimeObjFromStr(attrValue);
    case TYPE_BOOLEAN:
    case TYPE_CHECKBOX:
    case TYPE_THREESTATE:
      return attrValue === null ? 'none' : `${attrValue}`;
    default:
      return attrValue;
  }
};

const renderField = (
  name, attribute, langCode, mainGroup,
  joinGroups, isDefaultLang, locale, selectedLangTab, expanded,
) => {
  if (!attribute) {
    return '';
  }

  const {
    type, code, mandatory, listFilter, indexable, names: attName,
  } = attribute;

  const helpTextArr = [];
  if (listFilter) helpTextArr.push('Can be used as a filter in lists');
  if (indexable) helpTextArr.push('Searchable');
  const helpText = helpTextArr.join('<br>');
  const i18nName = isObject(attName)
    ? (attName[locale] || code) : (attName || code);
  const fieldLabel = (
    <FormLabel
      labelText={i18nName}
      required={mandatory && isDefaultLang}
      helpText={helpText}
    />
  );

  let fieldName = name;
  let FieldComp = Field;
  let AttributeFieldComp;

  // the attribute should not be mandatory for non-default languages
  const newAttribute = {
    ...attribute,
    mandatory: mandatory && isDefaultLang,
  };

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
          locale={locale}
          attribute={newAttribute}
          langCode={langCode}
          labelSize={0}
          hasLabel={false}
          mainGroup={mainGroup}
          joinGroups={joinGroups}
          selectedLangTab={selectedLangTab}
          openedAtStart={expanded}
        />
      );
  }

  return (
    <FieldComp
      key={code}
      name={fieldName}
      attribute={newAttribute}
      component={AttributeFieldComp}
      label={fieldLabel}
      mainGroup={mainGroup}
      joinGroups={joinGroups}
      langCode={langCode}
      selectedLangTab={selectedLangTab}
      openedAtStart={expanded}
    />
  );
};

const AttributeFields = ({
  attributes, fields, reInitializeForm, content, typeCode, mainGroup, langCode, joinGroups,
  isDefaultLang, selectedLangTab, locale, expanded,
}) => {
  if (fields.length < attributes.length) {
    // initialize fields with values from attributes prop through `.push()` method
    // as it cannot be set directly from props
    const atts = [];
    attributes.forEach((attr) => {
      const {
        type, code, value, values, elements, compositeelements, listelements, names,
      } = attr;
      atts.push({
        code,
        value: toFieldValue(value, type),
        values,
        elements,
        compositeelements,
        listelements,
        names,
      });
    });
    reInitializeForm('editcontentform', {
      ...content, attributes: atts, contentType: typeCode, mainGroup, joinGroups,
    });
  }

  return fields.map((name, idx) => renderField(name, attributes[idx],
    langCode, mainGroup, joinGroups, isDefaultLang, locale, selectedLangTab, expanded));
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
  selectedLangTab: PropTypes.string.isRequired,
  locale: PropTypes.string,
  expanded: PropTypes.bool.isRequired,
};

export default AttributeFields;
