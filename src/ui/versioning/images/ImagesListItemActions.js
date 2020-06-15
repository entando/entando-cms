import React from 'react';
import PropTypes from 'prop-types';
import {
  DropdownKebab,
  MenuItem,
} from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

const ImagesListItemActions = ({
  imageId, imageVersion, onClickRemove, onClickRecover,
}) => {
  const handleClickRecover = () => {
    // leaving console.log() until APIs are implemented to see interaction
    console.log(`onClickRecover(${imageId}, ${imageVersion})`); // eslint-disable-line no-console
    onClickRecover(imageId, imageVersion);
  };

  const handleClickRemove = () => {
    // leaving console.log() until APIs are implemented to see interaction
    console.log(`onClickDelete(${imageId})`); // eslint-disable-line no-console
    onClickRemove(imageId);
  };

  return (
    <DropdownKebab id="action2kebab" pullRight toggleStyle="link">
      <MenuItem onClick={handleClickRecover}>
        <FormattedMessage id="cms.label.recover" defaultMessage="Recover" />
      </MenuItem>
      <MenuItem divider />
      <MenuItem onClick={handleClickRemove}>
        <FormattedMessage id="cms.label.remove" defaultMessage="Remove" />
      </MenuItem>
    </DropdownKebab>
  );
};

ImagesListItemActions.propTypes = {
  imageId: PropTypes.string.isRequired,
  imageVersion: PropTypes.string.isRequired,
  onClickRemove: PropTypes.func,
  onClickRecover: PropTypes.func,
};

ImagesListItemActions.defaultProps = {
  onClickRemove: () => {},
  onClickRecover: () => {},
};


export default ImagesListItemActions;