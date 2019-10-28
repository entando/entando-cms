import React from 'react';
import PropTypes from 'prop-types';

import attributeShape from './attributeShape';

const BooleanAttributeField = ({ attribute }) => {
  const { code } = attribute;

  return (
    <div />
  );
};

BooleanAttributeField.propTypes = {
  attribute: PropTypes.shape(attributeShape).isRequired,
};

export default BooleanAttributeField;
