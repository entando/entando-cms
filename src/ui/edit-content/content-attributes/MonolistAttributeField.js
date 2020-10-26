import React from 'react';
import PropTypes from 'prop-types';
import {
  fieldArrayFieldsPropTypes,
  fieldArrayMetaPropTypes,
} from 'redux-form';

import ListField from 'ui/common/form/RenderListField';
import attributeShape from './attributeShape';

const MonolistAttributeField = ({
  fields,
  label,
  meta,
  attribute,
  ...rest
}) => (
  <ListField
    label={label}
    fields={fields}
    meta={meta}
    attribute={attribute.nestedAttribute}
    {...rest}
  />
);

MonolistAttributeField.propTypes = {
  fields: PropTypes.shape(fieldArrayFieldsPropTypes).isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.shape(fieldArrayMetaPropTypes).isRequired,
  attribute: PropTypes.shape(attributeShape).isRequired,
};

export default MonolistAttributeField;
