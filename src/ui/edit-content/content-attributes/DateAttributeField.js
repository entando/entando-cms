import React from 'react';
import PropTypes from 'prop-types';

import attributeShape from './attributeShape';

const DateAttributeField = ({ attribute }) => {
  const { code } = attribute;

  return (
    <div />
  );
};

DateAttributeField.propTypes = {
  attribute: PropTypes.shape(attributeShape).isRequired,
};

export default DateAttributeField;
