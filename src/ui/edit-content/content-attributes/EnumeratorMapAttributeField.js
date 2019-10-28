import React from 'react';
import PropTypes from 'prop-types';

import attributeShape from './attributeShape';

const EnumeratorMapAttributeField = ({ attribute }) => {
  const { code } = attribute;

  return (
    <div />
  );
};

EnumeratorMapAttributeField.propTypes = {
  attribute: PropTypes.shape(attributeShape).isRequired,
};

export default EnumeratorMapAttributeField;
