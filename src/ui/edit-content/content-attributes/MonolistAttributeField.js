import React from 'react';
import PropTypes from 'prop-types';

import attributeShape from './attributeShape';

const MonolistAttributeField = ({ attribute }) => {
  const { code } = attribute;

  return (
    <div />
  );
};

MonolistAttributeField.propTypes = {
  attribute: PropTypes.shape(attributeShape).isRequired,
};

export default MonolistAttributeField;
