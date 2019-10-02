import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Row, Col, Button } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';

const ContentSettingsMetadataBody = ({
  invalid,
  submitting,
  handleSubmit,
}) => (
  <>
    <h3 className="ContentSettingsMetadata__heading">
      <FormattedMessage id="cms.contentsettings.label.resourcemap" defaultMessage="Metadata Mapping" />
    </h3>
    <form onSubmit={handleSubmit} className="ContentSettingsMetadata__form">
      <Row>
        <Col xs={12} md={2} className="text-right ContentSettingsMetadata__label-emphasize">
          <FormLabel labelId="cms.contentsettings.form.addmetadata" helpId="cms.contentsettings.form.help" />
        </Col>
        <Col xs={12} md={4}>
          <Field
            component={RenderTextInput}
            name="key"
            labelSize={3}
            label={
              <FormLabel labelId="cms.contentsettings.form.key" required />
            }
          />
        </Col>
        <Col xs={12} md={5}>
          <Field
            component={RenderTextInput}
            name="mapping"
            labelSize={2}
            label={
              <FormLabel labelId="cms.contentsettings.form.mapping" />
            }
          />
        </Col>
        <Col xs={12} md={1} className="text-right">
          <Button
            type="submit"
            bsStyle="primary"
            disabled={invalid || submitting}
          >
            <FormattedMessage id="cms.label.add" />
          </Button>
        </Col>
      </Row>
    </form>
  </>
);

ContentSettingsMetadataBody.propTypes = {
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
};

ContentSettingsMetadataBody.defaultProps = {
  invalid: false,
  submitting: false,
};

const ContentSettingsMetadata = reduxForm({
  form: 'addsettingsmetadata',
  enableReinitialize: true,
})(ContentSettingsMetadataBody);

export default ContentSettingsMetadata;
