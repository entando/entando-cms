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
    <form onSubmit={handleSubmit}>
      <Row>
        <Col xs={12} md={2}>
          <FormattedMessage id="cms.contentsettings.form.addmetadata" defaultMessage="Add Metadata" />
        </Col>
        <Col xs={12} md={4}>
          <Field
            component={RenderTextInput}
            name="key"
            label={
              <FormLabel labelId="cms.contentsettings.form.key" required />
            }
          />
        </Col>
        <Col xs={12} md={4}>
          <Field
            component={RenderTextInput}
            name="mapping"
            label={
              <FormLabel labelId="cms.contentsettings.form.mapping" />
            }
          />
        </Col>
        <Col xs={12} md={2}>
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
