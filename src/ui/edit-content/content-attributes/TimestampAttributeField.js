import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  fieldInputPropTypes,
  fieldMetaPropTypes,
} from 'redux-form';

import DateTimePickerInput from 'ui/common/form/RenderDateTimePickerInput';
import { generateNumArray } from 'helpers/arrayUtils';

const TimestampAttributeField = ({
  label,
  input,
  meta,
  ...rest
}) => {
  const dateFormat = 'DD/MM/YYYY';
  const hoursList = generateNumArray(24);
  const minutesList = generateNumArray(60);
  const secondsList = generateNumArray(60);
  const timeOptions = {
    hoursList,
    minutesList,
    secondsList,
  };

  const { name, value: inputValue, onChange: inputOnChange } = input;

  let actualValue = inputValue;
  if (inputValue) {
    let inputDateFormat = dateFormat;
    if (inputValue.date.includes('-')) inputDateFormat = 'YYYY-MM-DD';
    actualValue = { date: moment(inputValue.date, inputDateFormat).format(dateFormat) };
  }

  const attrInput = {
    name,
    value: actualValue,
    onChange: (val) => {
      inputOnChange({
        date: val,
      });
    },
  };

  return (
    <DateTimePickerInput
      input={attrInput}
      label={label}
      meta={meta}
      dateFormat={dateFormat}
      isClearable={false}
      {...timeOptions}
      {...rest}
    />
  );
};

TimestampAttributeField.propTypes = {
  label: PropTypes.node.isRequired,
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
};

export default TimestampAttributeField;
