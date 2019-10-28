import React from 'react';
import PropTypes from 'prop-types';

import attributeShape from './attributeShape';

const MonotextAttributeField = ({ attribute }) => {
  const { code } = attribute;

  return (
    <div />
  );
};

MonotextAttributeField.propTypes = {
  attribute: PropTypes.shape(attributeShape).isRequired,
};

export default MonotextAttributeField;
