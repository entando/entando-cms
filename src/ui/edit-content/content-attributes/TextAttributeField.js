import React from 'react';
import PropTypes from 'prop-types';
import {
  fieldInputPropTypes,
  fieldMetaPropTypes,
} from 'redux-form';

import TextInput from 'ui/common/form/RenderTextInput';

const TextAttributeField = ({
  label, input, meta,
}) => {
  const { name, value: inputValue, onChange: inputOnChange } = input;
  const { value: actualValue } = inputValue;

  const attrInput = {
    name,
    value: actualValue || '',
    onChange: (event) => {
      inputOnChange({
        ...inputValue,
        value: event.target.value,
      });
    },
  };

  return (
    <TextInput
      input={attrInput}
      label={label}
      meta={meta}
    />
  );
};

TextAttributeField.propTypes = {
  label: PropTypes.node.isRequired,
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
};

export default TextAttributeField;
