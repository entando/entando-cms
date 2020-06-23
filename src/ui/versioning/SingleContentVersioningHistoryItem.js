import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { routeConverter, formatDate } from '@entando/utils';
import { LinkMenuItem } from '@entando/menu';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { ROUTE_CMS_VERSIONING_CONTENT_DETAIL } from 'app-init/routes';

export const getContentVersionStatusDetails = (approved, onlineVersion) => {
  let color = 'review';
  let title = 'Public ≠ Ready';
  if (approved) {
    color = 'published';
    title = 'Published';
  } else if (onlineVersion === 0) {
    color = 'unpublished';
    title = 'Unpublished';
  }
  return { color, title };
};

const SingleContentVersioningHistoryItem = ({
  description, username, versionDate, version, onClickRestore,
  contentId, id, approved, onlineVersion,
}) => {
  const { color, title } = getContentVersionStatusDetails(approved, onlineVersion);
  return (
    <tr className="VersioningListRow">
      <td className="VersioningListRow__td text-center">
        <code>
          {version}
        </code>
      </td>
      <td className="VersioningListRow__td SingleContentCurrentVersion__description">{description}</td>
      <td className="VersioningListRow__td text-center">
        <code>
          {formatDate(versionDate)}
        </code>
      </td>
      <td className="VersioningListRow__td text-center">{username}</td>
      <td className="VersioningListRow__td text-center">
        <span className={`ContentsFilter__status ContentsFilter__status--${color}`} title={title} />
      </td>
      <td className="VersioningListRow__td text-center">
        <DropdownKebab pullRight id="VersioningListRow-dropdown">
          <LinkMenuItem
            id={`versioning-id${version}`}
            to={routeConverter(
              ROUTE_CMS_VERSIONING_CONTENT_DETAIL,
              { contentId, versionId: id },
            )}
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
};


SingleContentVersioningHistoryItem.propTypes = {
  description: PropTypes.string.isRequired,
  contentId: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  versionDate: PropTypes.number.isRequired,
  version: PropTypes.string.isRequired,
  onClickRestore: PropTypes.func,
  approved: PropTypes.bool.isRequired,
  onlineVersion: PropTypes.number.isRequired,
};

SingleContentVersioningHistoryItem.defaultProps = {
  onClickRestore: () => {},
};

export default SingleContentVersioningHistoryItem;
