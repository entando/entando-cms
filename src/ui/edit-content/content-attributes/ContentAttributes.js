import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FieldArray,
} from 'redux-form';

import AttributeField from 'ui/edit-content/content-attributes/AttributeField';

const AttributeFields = ({ attributes }) => attributes.map(attribute => (
  <AttributeField key={attribute.code} attribute={attribute} />
));

AttributeFields.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.object).isRequired,
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
