import React from 'react';
import PropTypes from 'prop-types';
import {
  fieldInputPropTypes,
  fieldMetaPropTypes,
} from 'redux-form';

import TextAreaInput from 'ui/common/form/RenderTextAreaInput';

const HypertextAttributeField = ({
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
    <TextAreaInput
      input={attrInput}
      label={label}
      meta={meta}
      rows={3}
      cols={50}
    />
  );
};

HypertextAttributeField.propTypes = {
  label: PropTypes.node.isRequired,
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
};

export default HypertextAttributeField;
