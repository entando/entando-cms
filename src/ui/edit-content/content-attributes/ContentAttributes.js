import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FieldArray,
} from 'redux-form';
import { Tabs, Tab } from 'patternfly-react';

import AttributeFields from 'ui/edit-content/content-attributes/AttributeFields';

class ContentAttributes extends Component {
  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  componentWillUnmount() {
    const { onWillUnmount } = this.props;
    onWillUnmount();
  }

  render() {
    const {
      attributes, languages, reInitializeForm, content, typeCode, mainGroup,
      joinGroups,
    } = this.props;
    return (
      <Tabs defaultActiveKey="en" animation={false} id="content-attributes-tabs">
        {languages.map(({ code, name }) => (
          <Tab key={code} eventKey={code} title={name}>
            <FieldArray
              data-test-id="edit-content-content-attributes-field-array"
              name="attributes"
              content={content}
              typeCode={typeCode}
              mainGroup={mainGroup}
              joinGroups={joinGroups}
              reInitializeForm={reInitializeForm}
              component={AttributeFields}
              attributes={attributes}
              langCode={code}
            />
          </Tab>
        ))}
      </Tabs>
    );
  }
}

ContentAttributes.propTypes = {
  onDidMount: PropTypes.func.isRequired,
  onWillUnmount: PropTypes.func.isRequired,
  attributes: PropTypes.arrayOf(PropTypes.object).isRequired,
  languages: PropTypes.arrayOf(PropTypes.object).isRequired,
  reInitializeForm: PropTypes.func.isRequired,
  content: PropTypes.shape({}).isRequired,
  typeCode: PropTypes.string.isRequired,
  mainGroup: PropTypes.string.isRequired,
  joinGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ContentAttributes;
