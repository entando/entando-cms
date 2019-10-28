import React from 'react';
import PropTypes from 'prop-types';

import attributeShape from './attributeShape';

const HypertextAttributeField = ({ attribute }) => {
  const { code } = attribute;

  return (
    <div />
  );
};

HypertextAttributeField.propTypes = {
  attribute: PropTypes.shape(attributeShape).isRequired,
};

export default HypertextAttributeField;
