import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FieldArray,
  fieldArrayFieldsPropTypes,
} from 'redux-form';

import AttributeField from 'ui/edit-content/content-attributes/AttributeField';

const AttributeFields = ({ attributes, fields }) => {
  if (fields.length < attributes.length) {
    // initialize fields with values from attributes prop through `.push()` method
    // as it cannot be set directly from props
    attributes.forEach((attr) => {
      const {
        value, values, elements, compositeelements, listelements,
      } = attr;
      fields.push({
        value,
        values,
        elements,
        compositeelements,
        listelements,
      });
    });
  }

  return fields.map((attrRef, idx) => (
    <AttributeField
      key={attributes[idx].code}
      name={attrRef}
      attribute={attributes[idx]}
    />
  ));
};

AttributeFields.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.object).isRequired,
  fields: PropTypes.shape(fieldArrayFieldsPropTypes).isRequired,
};

class ContentAttributes extends Component {
  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  render() {
    const { attributes } = this.props;

    return (
      <div>
        <FieldArray
          data-test-id="edit-content-content-attributes-field-array"
          name="attributes"
          component={AttributeFields}
          attributes={attributes}
        />
      </div>
    );
  }
}

ContentAttributes.propTypes = {
  onDidMount: PropTypes.func.isRequired,
  attributes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ContentAttributes;
