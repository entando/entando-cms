import React from 'react';
import { FormattedMessage } from 'react-intl';
import { memoize } from 'lodash';
import { maxLength, minLength } from '@entando/utils';

const number = value => !Number.isNaN(parseFloat(value));

export const equalDate = date => value => (
  value !== date
    ? (
      <FormattedMessage
        id="validateForm.equalDate"
        values={{ date: <b>{date}</b> }}
        defaultMessage="Must be equal to {date}"
      />
    ) : undefined
);

export const equalDateAttribute = () => {};

export const equalNumber = num => value => (
  number(value) && parseFloat(value) !== num
    ? (
      <FormattedMessage
        id="validateForm.equalNumber"
        values={{ num: <b>{num}</b> }}
        defaultMessage="Must be equal to {num}"
      />
    ) : undefined
);

export const equalNumberAttribute = () => {};

export const equalString = str => value => (
  value !== str
    ? (
      <FormattedMessage
        id="validateForm.rangeEqualString"
        values={{ str: <b>{str}</b> }}
        defaultMessage="Must be equal to {str}"
      />
    ) : undefined
);

export const equalStringAttribute = () => {};

export const rangeEndDate = date => value => (
  value > date
    ? (
      <FormattedMessage
        id="validateForm.rangeEndDate"
        values={{ date: <b>{date}</b> }}
        defaultMessage="Must be equal to or before {date}"
      />
    ) : undefined
);

export const rangeEndDateAttribute = () => {};

export const rangeEndNumber = num => value => (
  number(value) && parseFloat(value) > num
    ? (
      <FormattedMessage
        id="validateForm.rangeEndNumber"
        values={{ num: <b>{num}</b> }}
        defaultMessage="Must be equal to or less than {num}"
      />
    ) : undefined
);

export const rangeEndNumberAttribute = () => {};

export const rangeEndString = str => value => (
  value > str
    ? (
      <FormattedMessage
        id="validateForm.rangeEndString"
        values={{ str: <b>{str}</b> }}
        defaultMessage="Must be before {str}"
      />
    ) : undefined
);

export const rangeEndStringAttribute = () => {};

export const rangeStartDate = date => value => (
  value < date
    ? (
      <FormattedMessage
        id="validateForm.rangeStartDate"
        values={{ date: <b>{date}</b> }}
        defaultMessage="Must be after {date}"
      />
    ) : undefined
);

export const rangeStartDateAttribute = () => {};

export const rangeStartNumber = num => value => (
  number(value) && parseFloat(value) < num
    ? (
      <FormattedMessage
        id="validateForm.rangeStartNumber"
        values={{ num: <b>{num}</b> }}
        defaultMessage="Must be equal to or more than {num}"
      />
    ) : undefined
);

export const rangeStartNumberAttribute = () => {};

export const rangeStartString = str => value => (
  value < str
    ? (
      <FormattedMessage
        id="validateForm.rangeStartString"
        values={{ str: <b>{str}</b> }}
        defaultMessage="Must be after {str}"
      />
    ) : undefined
);

export const rangeStartStringAttribute = () => {};

export const regex = text => (value) => {
  const re = new RegExp(text);
  return !re.test(value)
    ? (
      <FormattedMessage
        id="validateForm.regex"
        values={{ regex: <b>{text}</b> }}
        defaultMessage="Must match regular expression {regex}"
      />
    ) : undefined;
};

// Attribute validator functions should be memoized as their parameters are dynamic.
// Otherwise, it will cause an infinite re-rendering of a redux-form Field
export const attrValidatorsObj = {
  equalDate: memoize(equalDate),
  equalDateAttribute: memoize(equalDateAttribute),
  equalNumber: memoize(equalNumber),
  equalNumberAttribute: memoize(equalNumberAttribute),
  equalString: memoize(equalString),
  equalStringAttribute: memoize(equalStringAttribute),
  maxLength: memoize(maxLength),
  minLength: memoize(minLength),
  rangeEndDate: memoize(rangeEndDate),
  rangeEndDateAttribute: memoize(rangeEndDateAttribute),
  rangeEndNumber: memoize(rangeEndNumber),
  rangeEndNumberAttribute: memoize(rangeEndNumberAttribute),
  rangeEndString: memoize(rangeEndString),
  rangeEndStringAttribute: memoize(rangeEndStringAttribute),
  rangeStartDate: memoize(rangeStartDate),
  rangeStartDateAttribute: memoize(rangeStartDateAttribute),
  rangeStartNumber: memoize(rangeStartNumber),
  rangeStartNumberAttribute: memoize(rangeStartNumberAttribute),
  rangeStartString: memoize(rangeStartString),
  rangeStartStringAttribute: memoize(rangeStartStringAttribute),
  regex: memoize(regex),
};

export const getAttrValidators = (validationRules) => {
  const validators = [];

  Object.keys(validationRules).forEach((key) => {
    if (
      validationRules[key] !== null
      && validationRules[key] !== false
      && attrValidatorsObj[key]
    ) {
      validators.push(attrValidatorsObj[key](validationRules[key]));
    }
  });

  return validators;
};
