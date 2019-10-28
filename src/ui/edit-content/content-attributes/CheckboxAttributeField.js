import React from 'react';
import PropTypes from 'prop-types';

import attributeShape from './attributeShape';

const CheckboxAttributeField = ({ attribute }) => {
  const { code } = attribute;

  return (
    <div />
  );
};

CheckboxAttributeField.propTypes = {
  attribute: PropTypes.shape(attributeShape).isRequired,
};

export default CheckboxAttributeField;
