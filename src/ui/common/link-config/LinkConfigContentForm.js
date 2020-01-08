import React from 'react';
import PropTypes from 'prop-types';
import {
  reduxForm, Field, FormSection, fieldInputPropTypes,
} from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Button } from 'patternfly-react';

import LinkConfigAttributes from 'ui/common/link-config/LinkConfigAttributes';
import ContentsContainer from 'ui/common/content/ContentsContainer';

const ContentsField = ({ input }) => (
  <ContentsContainer onContentSelect={input.onChange} />
);

ContentsField.propTypes = {
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
};

const LinkConfigContentForm = ({ onCancel, handleSubmit }) => (
  <form className="form-horizontal" onSubmit={handleSubmit}>
    <Field
      component={ContentsField}
      name="content"
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

LinkConfigContentForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'LinkConfigContent',
})(LinkConfigContentForm);
