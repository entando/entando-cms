import React from 'react';
import PropTypes from 'prop-types';
import {
  defineMessages,
  injectIntl,
  intlShape,
  FormattedMessage,
} from 'react-intl';
import { FieldLevelHelp } from 'patternfly-react';

const FormLabel = ({
  labelId,
  langLabelId,
  helpId,
  helpValues,
  required,
  langLabelText,
  helpText,
  labelText,
  intl,
}) => {
  const requiredIcon = required ? (
    <sup><i className="fa fa-asterisk required-icon FormLabel__required-icon" /></sup>
  ) : null;

  const langLabel = langLabelId ? (
    <span className="label FormLabel__language-label">
      <FormattedMessage id={langLabelId} />
    </span>
  ) : null;

  const langLabelWithText = langLabelText ? (
    <span className="label FormLabel__language-label">
      {langLabelText}
    </span>
  ) : null;

  let fieldHelpId = null;
  if (helpId) {
    const msg = defineMessages({
      helpId: {
        id: helpId,
        defaultMessage: 'No tooltip found.',
      },
    });
    fieldHelpId = <FieldLevelHelp content={intl.formatMessage(msg.helpId, helpValues)} />;
  }


  const fieldHelpText = helpText ? (
    <FieldLevelHelp content={helpText} />
  ) : null;

  const fieldHelp = helpId ? fieldHelpId : fieldHelpText;

  const label = labelId ? (
    <FormattedMessage id={labelId} />
  ) : labelText;


  return (
    <span className="FormLabel">
      {langLabel || langLabelWithText}
      {label}
      {requiredIcon}
      {fieldHelp}
    </span>
  );
};

FormLabel.propTypes = {
  intl: intlShape.isRequired,
  labelId: PropTypes.string,
  labelText: PropTypes.string,
  langLabelText: PropTypes.string,
  langLabelId: PropTypes.string,
  helpId: PropTypes.string,
  helpText: PropTypes.string,
  helpValues: PropTypes.shape({}),
  required: PropTypes.bool,
};

FormLabel.defaultProps = {
  labelId: '',
  labelText: '',
  langLabelId: '',
  langLabelText: '',
  helpId: '',
  helpText: '',
  helpValues: {},
  required: false,
};
export default injectIntl(FormLabel);
