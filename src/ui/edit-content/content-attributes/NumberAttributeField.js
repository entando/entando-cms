import React from 'react';
import PropTypes from 'prop-types';
import {
  fieldInputPropTypes,
  fieldMetaPropTypes,
} from 'redux-form';

import TextInput from 'ui/common/form/RenderTextInput';

const NumberAttributeField = ({
  label,
  input,
  meta,
  ...rest
}) => {
  const { name, value: inputValue, onChange: inputOnChange } = input;

  const attrInput = {
    ...input,
    name,
    value: inputValue || '',
    onChange: (event) => {
      inputOnChange(event.target.value);
    },
  };

  return (
    <TextInput
      input={attrInput}
      label={label}
      meta={meta}
      {...rest}
    />
  );
};

NumberAttributeField.propTypes = {
  label: PropTypes.node.isRequired,
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
};

export default NumberAttributeField;
