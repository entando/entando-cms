import React from 'react';
import PropTypes from 'prop-types';
import {
  fieldInputPropTypes,
  fieldMetaPropTypes,
} from 'redux-form';

import RadioInput from 'ui/common/form/RenderRadioInput';
import attributeShape from './attributeShape';

// TODO: validation
const ThreeStateAttributeField = ({ attribute, input, meta }) => {
  const toggleElements = [
    { id: 'true', label: 'Yes' },
    { id: 'false', label: 'No' },
    { id: 'none', label: 'Both' },
  ];

  const { name, value: inputValue, onChange: inputOnChange } = input;
  const { value: actualValue } = inputValue;

  const attrInput = {
    name,
    value: actualValue || 'none',
    onChange: (val) => {
      inputOnChange({
        ...inputValue,
        value: val,
      });
    },
  };

  const { code } = attribute;

  return (
    <RadioInput
      input={attrInput}
      meta={meta}
      toggleElement={toggleElements}
      label={code}
    />
  );
};

ThreeStateAttributeField.propTypes = {
  attribute: PropTypes.shape(attributeShape).isRequired,
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
};

export default ThreeStateAttributeField;
