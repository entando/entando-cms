import React from 'react';
import PropTypes from 'prop-types';

import attributeShape from './attributeShape';

const AttachAttributeField = ({ attribute }) => {
  const { code } = attribute;

  return (
    <div />
  );
};

AttachAttributeField.propTypes = {
  attribute: PropTypes.shape(attributeShape).isRequired,
};

export default AttachAttributeField;
