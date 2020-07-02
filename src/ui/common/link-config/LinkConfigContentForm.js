import React from 'react';
import PropTypes from 'prop-types';
import {
  reduxForm, Field, FormSection, fieldInputPropTypes,
} from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Button } from 'patternfly-react';

import LinkConfigAttributes from 'ui/common/link-config/LinkConfigAttributes';
import ContentsContainer from 'ui/common/content/ContentsContainer';

const ContentsField = ({ input, mainGroup }) => (
  <ContentsContainer
    status="published"
    author="all"
    onContentSelect={input.onChange}
    ownerGroup={mainGroup}
  />
);

ContentsField.propTypes = {
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  mainGroup: PropTypes.string.isRequired,
};

const LinkConfigContentForm = ({
  onCancel, handleClick, selectedContent, mainGroup,
}) => (
  <div className="form-horizontal">
    <Field
      component={ContentsField}
      mainGroup={mainGroup}
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
      <Button bsStyle="primary" onClick={() => handleClick(selectedContent)}>
        <FormattedMessage id="cms.label.save" />
      </Button>
    </div>
  </div>
);

LinkConfigContentForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  selectedContent: PropTypes.string,
  mainGroup: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

LinkConfigContentForm.defaultProps = {
  selectedContent: '',
};

export default reduxForm({
  form: 'LinkConfigContent',
})(LinkConfigContentForm);
