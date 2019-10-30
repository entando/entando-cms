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
  label, input, meta,
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
    <DateTimePickerInput
      input={attrInput}
      label={label}
      meta={meta}
      dateFormat={dateFormat}
      isClearable={false}
      {...timeOptions}
    />
  );
};

TimestampAttributeField.propTypes = {
  label: PropTypes.node.isRequired,
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
};

export default TimestampAttributeField;
