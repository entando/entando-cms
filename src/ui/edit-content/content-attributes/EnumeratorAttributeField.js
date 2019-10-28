import React from 'react';
import PropTypes from 'prop-types';

import attributeShape from './attributeShape';

const EnumeratorAttributeField = ({ attribute }) => {
  const { code } = attribute;

  return (
    <div />
  );
};

EnumeratorAttributeField.propTypes = {
  attribute: PropTypes.shape(attributeShape).isRequired,
};

export default EnumeratorAttributeField;
