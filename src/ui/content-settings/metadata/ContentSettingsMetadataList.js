import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'patternfly-react';
import { reduxForm, Field } from 'redux-form';

import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';

const ContentSettingsMetadataListBody = ({ handleSubmit, metadatas }) => (
  <>
    <h3>Resource Metadata Mapping</h3>
    <form onSubmit={handleSubmit}>
      {metadatas.map(metadata => (
        <Row>
          <Col xs={12} md={2}>
            {`'${metadata.key}' Metadata`}
          </Col>
          <Col xs={9} md={8}>
            <Field
              component={RenderTextInput}
              name={`meta${metadata.key}`}
              label={
                <FormLabel labelId="cms.contentsettings.form.key" required />
              }
            />
          </Col>
          <Col xs={12} md={2}>
            <Button>Delete</Button>
          </Col>
        </Row>
      ))}
    </form>
  </>
);

ContentSettingsMetadataListBody.propTypes = {
  metadatas: PropTypes.arrayOf(PropTypes.shape({})),
  handleSubmit: PropTypes.func.isRequired,
};

ContentSettingsMetadataListBody.defaultProps = {
  metadatas: [],
};

const ContentSettingsMetadataList = reduxForm({
  form: 'settingsmetadata',
  enableReinitialize: true,
})(ContentSettingsMetadataListBody);


export default ContentSettingsMetadataList;
