import React from 'react';
import PropTypes from 'prop-types';

import attributeShape from './attributeShape';

const CompositeAttributeField = ({ attribute }) => {
  const { code } = attribute;

  return (
    <div />
  );
};

CompositeAttributeField.propTypes = {
  attribute: PropTypes.shape(attributeShape).isRequired,
};

export default CompositeAttributeField;
