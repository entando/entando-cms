import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { LinkMenuItem } from '@entando/menu';
import { DropdownKebab } from 'patternfly-react';
import { routeConverter, formatDate } from '@entando/utils';
import { ROUTE_CMS_VERSIONING_CONTENT_HISTORY } from 'app-init/routes';
import { getContentVersionStatusDetails } from 'ui/versioning/SingleContentVersioningHistoryItem';

const VersioningListItem = ({
  id, contentType, description, username, versionDate, version, approved, contentId, status,
}) => {
  const { color, title } = getContentVersionStatusDetails(status, approved);
  return (
    <tr className="VersioningListRow">
      <td className="VersioningListRow__td SingleContentCurrentVersion__description">{description}</td>
      <td className="VersioningListRow__td text-center">
        <code>
          {contentId}
        </code>
      </td>
      <td className="VersioningListRow__td">{contentType}</td>
      <td className="VersioningListRow__td text-center">{username}</td>
      <td className="VersioningListRow__td text-center">
        <code>
          {version} ({formatDate(versionDate)})
        </code>
      </td>
      <td className="VersioningListRow__td text-center">
        <span className={`ContentsFilter__status ContentsFilter__status--${color}`} title={title} />
      </td>
      <td className="VersioningListRow__td text-center">
        <DropdownKebab pullRight id="VersioningListRow-dropdown">
          <LinkMenuItem
            id={`versioning-id${id}`}
            to={routeConverter(ROUTE_CMS_VERSIONING_CONTENT_HISTORY, { contentId })}
            label={<FormattedMessage id="cms.label.details" defaultMessage="Details" />}
            className="VersioningListRow__menu-item-edit"
          />
        </DropdownKebab>
      </td>
    </tr>
  );
};


VersioningListItem.propTypes = {
  contentType: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  versionDate: PropTypes.number.isRequired,
  version: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  contentId: PropTypes.string.isRequired,
  approved: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
};

export default VersioningListItem;
