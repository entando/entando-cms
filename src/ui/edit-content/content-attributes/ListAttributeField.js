import React from 'react';
import PropTypes from 'prop-types';

import attributeShape from './attributeShape';

const ListAttributeField = ({ attribute }) => {
  const { code } = attribute;

  return (
    <div />
  );
};

ListAttributeField.propTypes = {
  attribute: PropTypes.shape(attributeShape).isRequired,
};

export default ListAttributeField;
