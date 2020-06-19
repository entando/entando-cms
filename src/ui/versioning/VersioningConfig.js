import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Row, Col, Button } from 'patternfly-react';

import FormLabel from 'ui/common/form/FormLabel';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';
import RenderTextInput from 'ui/common/form/RenderTextInput';

const VersioningConfigBody = ({
  onDidMount,
  handleSubmit,
  invalid,
  submitting,
}) => {
  useEffect(() => {
    onDidMount();
  });

  return (
    <form onSubmit={handleSubmit} className="form-horizontal VersioningConfig">
      <Row>
        <Col xs={12}>
          <fieldset className="no-padding">
            <Field
              name="deleteMidVersion"
              component={SwitchRenderer}
              label={<FormLabel labelId="cms.versioning.config.labelDeleteMid" />}
            />
            <Field
              name="contentIgnore"
              component={RenderTextInput}
              label={<FormLabel labelId="cms.versioning.config.labelIgnoreContent" />}
            />
            <Field
              name="contentTypeIgnore"
              component={RenderTextInput}
              label={<FormLabel labelId="cms.versioning.config.labelIgnoreContentTypes" />}
            />
            <Button
              type="submit"
              className="pull-right"
              bsStyle="primary"
              disabled={invalid || submitting}
            >
              <FormattedMessage id="cms.label.save" />
            </Button>
          </fieldset>
        </Col>
      </Row>
    </form>
  );
};

VersioningConfigBody.propTypes = {
  onDidMount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
};

VersioningConfigBody.defaultProps = {
  invalid: false,
  submitting: false,
};

const VersioningConfig = reduxForm({
  form: 'versionConfig',
})(VersioningConfigBody);

export default VersioningConfig;
