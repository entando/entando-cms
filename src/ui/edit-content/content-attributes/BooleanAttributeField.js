import React from 'react';
import PropTypes from 'prop-types';
import {
  fieldInputPropTypes,
  fieldMetaPropTypes,
} from 'redux-form';

import RadioInput from 'ui/common/form/RenderRadioInput';

const BooleanAttributeField = ({
  label,
  input,
  meta,
  ...rest
}) => {
  const toggleElements = [
    { id: 'true', label: 'Yes' },
    { id: 'false', label: 'No' },
  ];

  const { name, value: inputValue, onChange: inputOnChange } = input;

  const attrInput = {
    ...input,
    name,
    value: inputValue || 'false',
    onChange: (val) => {
      inputOnChange(val);
    },
  };

  return (
    <RadioInput
      input={attrInput}
      meta={meta}
      toggleElement={toggleElements}
      label={label}
      {...rest}
    />
  );
};

BooleanAttributeField.propTypes = {
  label: PropTypes.node.isRequired,
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
};

export default BooleanAttributeField;
