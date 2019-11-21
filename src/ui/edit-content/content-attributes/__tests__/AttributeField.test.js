import React from 'react';
import { shallow } from 'enzyme';

import { configEnzymeAdapter } from 'testutils/helpers';
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
import AttributeField from 'ui/edit-content/content-attributes/AttributeField';

configEnzymeAdapter();

const attributeFields = {
  [TYPE_BOOLEAN]: 'BooleanAttributeField',
  [TYPE_CHECKBOX]: 'CheckboxAttributeField',
  [TYPE_DATE]: 'DateAttributeField',
  [TYPE_ENUMERATOR]: 'EnumeratorAttributeField',
  [TYPE_ENUMERATOR_MAP]: 'EnumeratorMapAttributeField',
  [TYPE_NUMBER]: 'NumberAttributeField',
  [TYPE_THREESTATE]: 'ThreeStateAttributeField',
  [TYPE_TIMESTAMP]: 'TimestampAttributeField',
  [TYPE_HYPERTEXT]: 'HypertextAttributeField',
  [TYPE_LONGTEXT]: 'LongtextAttributeField',
  [TYPE_TEXT]: 'TextAttributeField',
  [TYPE_ATTACH]: 'AttachAttributeField',
  [TYPE_IMAGE]: 'ImageAttributeField',
  [TYPE_LINK]: 'LinkAttributeField',
  [TYPE_MONOTEXT]: 'MonotextAttributeField',
};

describe('ui/edit-content/content-attributes/AttributeField', () => {
  Object.keys(attributeFields).forEach((attrType) => {
    const attrCompName = attributeFields[attrType];
    it(`should render ${attrCompName} when type is ${attrType}`, () => {
      const attribute = {
        type: attrType,
        code: 'Test attribute code',
      };
      const wrapper = shallow(<AttributeField attribute={attribute} />);

      expect(wrapper.prop('component').name).toEqual(attrCompName);
    });
  });
});
