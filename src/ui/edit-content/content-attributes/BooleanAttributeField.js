import React from 'react';
import PropTypes from 'prop-types';
import {
  fieldInputPropTypes,
  fieldMetaPropTypes,
} from 'redux-form';

import RadioInput from 'ui/common/form/RenderRadioInput';

const BooleanAttributeField = ({ label, input, meta }) => {
  const toggleElements = [
    { id: 'true', label: 'Yes' },
    { id: 'false', label: 'No' },
  ];

  const { name, value: inputValue, onChange: inputOnChange } = input;
  const { value: actualValue } = inputValue;

  const attrInput = {
    name,
    value: actualValue || 'false',
    onChange: (val) => {
      inputOnChange({
        ...inputValue,
        value: val,
      });
    },
  };

  return (
    <RadioInput
      input={attrInput}
      meta={meta}
      toggleElement={toggleElements}
      label={label}
    />
  );
};

BooleanAttributeField.propTypes = {
  label: PropTypes.node.isRequired,
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
};

export default BooleanAttributeField;
