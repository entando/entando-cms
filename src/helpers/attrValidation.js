import { required, maxLength, minLength } from '@entando/utils';

export const equalDate = () => {};

export const equalDateAttribute = () => {};

export const equalNumber = () => {};

export const equalNumberAttribute = () => {};

export const equalString = () => {};

export const equalStringAttribute = () => {};

export const rangeEndDate = () => {};

export const rangeEndDateAttribute = () => {};

export const rangeEndNumber = () => {};

export const rangeEndNumberAttribute = () => {};

export const rangeEndString = () => {};

export const rangeEndStringAttribute = () => {};

export const rangeStartDate = () => {};

export const rangeStartDateAttribute = () => {};

export const rangeStartNumber = () => {};

export const rangeStartNumberAttribute = () => {};

export const rangeStartString = () => {};

export const rangeStartStringAttribute = () => {};

export const regex = () => {};

export const mandatory = (value, values, props) => {
  console.log(props);
  return required(value);
};

export const attrValidationsObj = {
  equalDate,
  equalDateAttribute,
  equalNumber,
  equalNumberAttribute,
  equalString,
  equalStringAttribute,
  maxLength,
  minLength,
  rangeEndDate,
  rangeEndDateAttribute,
  rangeEndNumber,
  rangeEndNumberAttribute,
  rangeEndString,
  rangeEndStringAttribute,
  rangeStartDate,
  rangeStartDateAttribute,
  rangeStartNumber,
  rangeStartNumberAttribute,
  rangeStartString,
  rangeStartStringAttribute,
  regex,
  mandatory,
};

export const getAttrValidators = (validationRules) => {
  const validators = [];

  Object.keys(validationRules).forEach((key) => {
    if (
      validationRules[key] !== null
      && validationRules[key] !== false
      && attrValidationsObj[key]
    ) {
      validators.push(attrValidationsObj[key]);
    }
  });

  return validators;
};
