import React from 'react';
import PropTypes from 'prop-types';

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
import attributeShape from 'ui/edit-content/content-attributes/attributeShape';

const AttributeField = ({
  attribute,
}) => {
  const { type } = attribute;
  let AttributeFieldComp;

  switch (type) {
    // case TYPE_BOOLEAN:
    //   AttributeFieldComp = BooleanAttributeField;
    //   break;
    // case TYPE_CHECKBOX:
    //   AttributeFieldComp = CheckboxAttributeField;
    //   break;
    // case TYPE_DATE:
    //   AttributeFieldComp = DateAttributeField;
    //   break;
    // case TYPE_ENUMERATOR:
    //   AttributeFieldComp = EnumeratorAttributeField;
    //   break;
    // case TYPE_ENUMERATOR_MAP:
    //   AttributeFieldComp = EnumeratorMapAttributeField;
    //   break;
    // case TYPE_COMPOSITE:
    //   AttributeFieldComp = CompositeAttributeField;
    //   break;
    // case TYPE_LIST:
    //   AttributeFieldComp = ListAttributeField;
    //   break;
    // case TYPE_MONOLIST:
    //   AttributeFieldComp = MonolistAttributeField;
    //   break;
    // case TYPE_TIMESTAMP:
    //   AttributeFieldComp = TimestampAttributeField;
    //   break;
    // case TYPE_HYPERTEXT:
    //   AttributeFieldComp = HypertextAttributeField;
    //   break;
    // case TYPE_NUMBER:
    //   AttributeFieldComp = NumberAttributeField;
    //   break;
    // case TYPE_THREESTATE:
    //   AttributeFieldComp = ThreeStateAttributeField;
    //   break;
    // case TYPE_LONGTEXT:
    //   AttributeFieldComp = LongtextAttributeField;
    //   break;
    // case TYPE_TEXT:
    //   AttributeFieldComp = TextAttributeField;
    //   break;
    // case TYPE_ATTACH:
    //   AttributeFieldComp = AttachAttributeField;
    //   break;
    // case TYPE_IMAGE:
    //   AttributeFieldComp = ImageAttributeField;
    //   break;
    // case TYPE_LINK:
    //   AttributeFieldComp = LinkAttributeField;
    //   break;
    // case TYPE_MONOTEXT:
    //   AttributeFieldComp = MonotextAttributeField;
    //   break;
    default:
      return null;
  }

  return <AttributeFieldComp attribute={attribute} />;
};

AttributeField.propTypes = {
  attribute: PropTypes.shape(attributeShape).isRequired,
};

export default AttributeField;
