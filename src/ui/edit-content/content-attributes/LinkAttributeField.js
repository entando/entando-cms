import React from 'react';
import PropTypes from 'prop-types';
import {
  fieldMetaPropTypes,
} from 'redux-form';
import { FormattedMessage } from 'react-intl';

import RenderButton from 'ui/common/form/RenderButton';
import attributeShape from './attributeShape';

const LinkAttributeField = ({ label, meta, attribute }) => {
  const { code } = attribute;

  const handleAddClick = () => {
    // TODO: route to Configure Link Content page
    console.log(code);
  };

  return (
    <RenderButton
      bsStyle="primary"
      buttonContent={<FormattedMessage id="cms.label.add" defaultMessage="Add" />}
      label={label}
      meta={meta}
      onClick={handleAddClick}
    />
  );
};

LinkAttributeField.propTypes = {
  label: PropTypes.node.isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
  attribute: PropTypes.shape(attributeShape).isRequired,
};

export default LinkAttributeField;
