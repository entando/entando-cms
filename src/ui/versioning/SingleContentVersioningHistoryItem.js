import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { LinkMenuItem } from '@entando/menu';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { formatDate } from '@entando/utils';

const SingleContentVersioningHistoryItem = ({
  description, username, versionDate, version, onClickRestore, contentId, id,
}) => (
  <tr className="VersioningListRow">
    <td className="VersioningListRow__td text-center">
      <code>
        {version}
      </code>
    </td>
    <td className="VersioningListRow__td">{description}</td>
    <td className="VersioningListRow__td text-center">
      <code>
        {formatDate(versionDate)}
      </code>
    </td>
    <td className="VersioningListRow__td text-center">{username}</td>
    <td className="VersioningListRow__td text-center">
      <DropdownKebab pullRight id="VersioningListRow-dropdown">
        <LinkMenuItem
          id={`versioning-id${contentId}`}
          to=""
          label={<FormattedMessage id="cms.label.details" defaultMessage="Details" />}
          className="VersioningListRow__menu-item-edit"
        />
        <MenuItem onClick={() => onClickRestore({
          version, contentId, description, versionId: id,
        })}
        >
          <FormattedMessage id="cms.versioning.list.restoreVersion" defaultMessage="Restore version" />
        </MenuItem>
      </DropdownKebab>
    </td>
  </tr>
);


SingleContentVersioningHistoryItem.propTypes = {
  description: PropTypes.string.isRequired,
  contentId: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  versionDate: PropTypes.number.isRequired,
  version: PropTypes.string.isRequired,
  onClickRestore: PropTypes.func,
};

SingleContentVersioningHistoryItem.defaultProps = {
  onClickRestore: () => {},
};

export default SingleContentVersioningHistoryItem;
