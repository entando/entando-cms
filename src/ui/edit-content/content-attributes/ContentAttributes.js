import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FieldArray,
} from 'redux-form';
import { Tabs, Tab } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import AttributeFields from 'ui/edit-content/content-attributes/AttributeFields';

class ContentAttributes extends Component {
  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  render() {
    const { attributes, settings } = this.props;

    return (
      <Tabs defaultActiveKey={1} animation={false} id="content-attributes-tabs">
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
