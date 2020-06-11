import React from 'react';
import PropTypes from 'prop-types';
import {
  DropdownKebab,
  MenuItem,
} from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

const AttachmentsListItemActions = ({
  attachmentId, attachmentVersion, onClickRemove, onClickRecover,
}) => {
  const handleClickRecover = () => {
    // leaving console.log() until APIs are implemented to see interaction
    console.log(`onClickRecover(${attachmentId}, ${attachmentVersion})`); // eslint-disable-line no-console
    onClickRecover(attachmentId, attachmentVersion);
  };

  const handleClickRemove = () => {
    // leaving console.log() until APIs are implemented to see interaction
    console.log(`onClickDelete(${attachmentId})`); // eslint-disable-line no-console
    onClickRemove(attachmentId);
  };

  return (
    <DropdownKebab id="action2kebab" pullRight toggleStyle="link">
      <MenuItem onClick={handleClickRecover}><FormattedMessage id="cms.label.recover" /></MenuItem>
      <MenuItem divider />
      <MenuItem onClick={handleClickRemove}><FormattedMessage id="cms.label.remove" /></MenuItem>
    </DropdownKebab>
  );
};

AttachmentsListItemActions.propTypes = {
  attachmentId: PropTypes.number.isRequired,
  attachmentVersion: PropTypes.string.isRequired,
  onClickRemove: PropTypes.func,
  onClickRecover: PropTypes.func,
};

AttachmentsListItemActions.defaultProps = {
  onClickRemove: () => {},
  onClickRecover: () => {},
};


export default AttachmentsListItemActions;
