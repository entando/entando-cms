import React from 'react';
import PropTypes from 'prop-types';

import attributeShape from './attributeShape';

const LinkAttributeField = ({ attribute }) => {
  const { code } = attribute;

  return (
    <div />
  );
};

LinkAttributeField.propTypes = {
  attribute: PropTypes.shape(attributeShape).isRequired,
};

export default LinkAttributeField;
