import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { LinkMenuItem } from '@entando/menu';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { routeConverter, formatDate } from '@entando/utils';
import { ROUTE_CMS_VERSIONING_CONTENT_DETAIL } from 'app-init/routes';

const SingleContentVersioningHistoryItem = ({
  id, description, username, versionDate, version, onClickRestore,
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
          id={`versioning-id${version}`}
          to={routeConverter(
            ROUTE_CMS_VERSIONING_CONTENT_DETAIL,
            { contentId: id, versionId: version },
          )}
          label={<FormattedMessage id="cms.label.details" defaultMessage="Details" />}
          className="VersioningListRow__menu-item-edit"
        />
        <MenuItem onClick={onClickRestore}>
          <FormattedMessage id="cms.versioning.list.restoreVersion" defaultMessage="Restore version" />
        </MenuItem>
      </DropdownKebab>
    </td>
  </tr>
);


SingleContentVersioningHistoryItem.propTypes = {
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  versionDate: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
  onClickRestore: PropTypes.func,
};

SingleContentVersioningHistoryItem.defaultProps = {
  onClickRestore: () => {},
};

export default SingleContentVersioningHistoryItem;
