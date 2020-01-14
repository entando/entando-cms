import React from 'react';
import PropTypes from 'prop-types';
import {
  reduxForm,
  Field,
  FormSection,
  fieldInputPropTypes,
} from 'redux-form';
import { Button } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import LinkConfigAttributes from 'ui/common/link-config/LinkConfigAttributes';
import AssetsListContainer from 'ui/assets/AssetsListContainer';

const AssetsField = ({ input }) => (
  <AssetsListContainer
    showColumns={['preview', 'name', 'type']}
    hideFooter
    singleView
    onSelect={input.onChange}
  />
);

AssetsField.propTypes = {
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
};

const LinkConfigResourceForm = ({ onCancel, handleSubmit }) => (
  <form className="form-horizontal" onSubmit={handleSubmit}>
    <Field
      component={AssetsField}
      name="resource"
    />
    <FormSection name="attributes">
      <LinkConfigAttributes />
    </FormSection>
    <div className="text-right">
      <Button
        bsStyle="default"
        style={{ marginRight: '10px' }}
        onClick={onCancel}
      >
        <FormattedMessage id="cms.label.cancel" />
      </Button>
      <Button bsStyle="primary" type="submit">
        <FormattedMessage id="cms.label.save" />
      </Button>
    </div>
  </form>
);

LinkConfigResourceForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'LinkConfigResource',
})(LinkConfigResourceForm);
