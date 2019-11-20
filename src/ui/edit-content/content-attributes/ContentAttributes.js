import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FieldArray,
  fieldArrayFieldsPropTypes,
} from 'redux-form';
import { Tabs, Tab } from 'patternfly-react';

import AttributeField from 'ui/edit-content/content-attributes/AttributeField';
import { TYPE_TIMESTAMP } from 'state/content-type/const';
import { FormattedMessage } from 'react-intl';

const AttributeFields = ({ attributes, fields, settings }) => {
  if (fields.length < attributes.length) {
    // initialize fields with values from attributes prop through `.push()` method
    // as it cannot be set directly from props
    attributes.forEach((attr) => {
      const {
        value, elements, compositeelements, type,
      } = attr;
      fields.push(
        (type === TYPE_TIMESTAMP && {})
        || (elements && { elements })
        || (compositeelements && { compositeelements })
        || value,
      );
    });
  }

  return fields.map((attrRef, idx) => (
    <AttributeField
      key={attributes[idx].code}
      name={attrRef}
      attribute={attributes[idx]}
      settings={settings}
    />
  ));
};

AttributeFields.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.object).isRequired,
  fields: PropTypes.shape(fieldArrayFieldsPropTypes).isRequired,
  settings: PropTypes.shape({}).isRequired,
};

class ContentAttributes extends Component {
  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  render() {
    const { attributes, settings } = this.props;

    return (
      <Tabs defaultActiveKey={1} animation={false}>
        <Tab eventKey={1} title="English">
          <FieldArray
            data-test-id="edit-content-content-attributes-field-array"
            name="attributes"
            component={AttributeFields}
            attributes={attributes}
            settings={settings}
          />
        </Tab>
        <Tab eventKey={2} title="Italiano">
          <FormattedMessage
            id="cms.contents.edit.contentAttributes.language"
            defaultMessage="Attributes can only be edited in the default language section"
          />
        </Tab>
      </Tabs>
    );
  }
}

ContentAttributes.propTypes = {
  onDidMount: PropTypes.func.isRequired,
  attributes: PropTypes.arrayOf(PropTypes.object).isRequired,
  settings: PropTypes.shape({}).isRequired,
};

export default ContentAttributes;
