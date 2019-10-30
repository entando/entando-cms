import React from 'react';
import PropTypes from 'prop-types';
import {
  fieldInputPropTypes,
  fieldMetaPropTypes,
} from 'redux-form';

import SwitchRenderer from 'ui/common/form/SwitchRenderer';

const CheckboxAttributeField = ({ label, input, meta }) => {
  const switchVals = {
    trueValue: true,
    falseValue: false,
  };

  const { name, value: inputValue, onChange: inputOnChange } = input;
  const { value: actualValue } = inputValue;

  const attrInput = {
    name,
    value: actualValue || switchVals.falseValue,
    onChange: (val) => {
      inputOnChange({
        ...inputValue,
        value: val,
      });
    },
  };

  return (
    <SwitchRenderer
      input={attrInput}
      meta={meta}
      label={label}
      {...switchVals}
    />
  );
};

CheckboxAttributeField.propTypes = {
  label: PropTypes.node.isRequired,
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
};

export default CheckboxAttributeField;
