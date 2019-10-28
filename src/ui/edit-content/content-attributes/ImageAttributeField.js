import React from 'react';
import PropTypes from 'prop-types';

import attributeShape from './attributeShape';

const ImageAttributeField = ({ attribute }) => {
  const { code } = attribute;

  return (
    <div />
  );
};

ImageAttributeField.propTypes = {
  attribute: PropTypes.shape(attributeShape).isRequired,
};

export default ImageAttributeField;
