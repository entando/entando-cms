import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  fieldInputPropTypes,
  fieldMetaPropTypes,
} from 'redux-form';

import DatePickerInput from 'ui/common/form/RenderDatePickerInput';

const DateAttributeField = ({
  label, input, meta,
}) => {
  const dateFormat = 'DD/MM/YYYY';

  const { name, value: inputValue, onChange: inputOnChange } = input;
  const { value: actualValue } = inputValue;

  const attrInput = {
    name,
    value: actualValue || moment().format(dateFormat),
    onChange: (val) => {
      inputOnChange({
        ...inputValue,
        value: val,
      });
    },
  };

  return (
    <DatePickerInput
      input={attrInput}
      label={label}
      meta={meta}
      dateFormat={dateFormat}
      isClearable={false}
    />
  );
};

DateAttributeField.propTypes = {
  label: PropTypes.node.isRequired,
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
};

export default DateAttributeField;
