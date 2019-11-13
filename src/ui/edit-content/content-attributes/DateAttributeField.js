import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  fieldInputPropTypes,
  fieldMetaPropTypes,
} from 'redux-form';

import DatePickerInput from 'ui/common/form/RenderDatePickerInput';

const DateAttributeField = ({
  label,
  input,
  meta,
  ...rest
}) => {
  const dateFormat = 'DD/MM/YYYY';

  const { name, value: inputValue, onChange: inputOnChange } = input;

  const attrInput = {
    ...input,
    name,
    value: inputValue || moment().format(dateFormat),
    onChange: (val) => {
      inputOnChange(val);
    },
  };

  return (
    <DatePickerInput
      input={attrInput}
      label={label}
      meta={meta}
      dateFormat={dateFormat}
      isClearable={false}
      {...rest}
    />
  );
};

DateAttributeField.propTypes = {
  label: PropTypes.node.isRequired,
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
};

export default DateAttributeField;
