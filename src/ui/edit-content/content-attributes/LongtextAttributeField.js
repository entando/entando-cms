import React from 'react';
import PropTypes from 'prop-types';

import attributeShape from './attributeShape';

const LongtextAttributeField = ({ attribute }) => {
  const { code } = attribute;

  return (
    <div />
  );
};

LongtextAttributeField.propTypes = {
  attribute: PropTypes.shape(attributeShape).isRequired,
};

export default LongtextAttributeField;
