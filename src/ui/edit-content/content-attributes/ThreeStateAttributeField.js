import React from 'react';
import PropTypes from 'prop-types';

import attributeShape from './attributeShape';

const ThreeStateAttributeField = ({ attribute }) => {
  const { code } = attribute;

  return (
    <div />
  );
};

ThreeStateAttributeField.propTypes = {
  attribute: PropTypes.shape(attributeShape).isRequired,
};

export default ThreeStateAttributeField;
