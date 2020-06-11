import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { LinkMenuItem } from '@entando/menu';
import { Link } from 'react-router-dom';
import { DropdownKebab } from 'patternfly-react';
import { routeConverter, formatDate } from '@entando/utils';
import { ROUTE_CMS_VERSIONING_DETAIL, ROUTE_CMS_EDIT_CONTENT } from 'app-init/routes';

const VersioningListItem = ({
  id, contentType, description, editor, lastModify, lastVersion, status, onLine: hasPublicVersion,
}) => {
  let statusColor = '';
  let statusTitle = '';
  if (status === 'PUBLIC') {
    statusColor = 'published';
    statusTitle = 'Published';
  } else if (status === 'ready') {
    statusColor = 'review';
    if (hasPublicVersion) {
      statusTitle = 'Public ≠ Ready';
    } else {
      statusTitle = 'Ready';
    }
  } else {
    statusColor = 'unpublished';
    if (hasPublicVersion) {
      statusTitle = 'Public ≠ Draft';
    } else {
      statusTitle = 'Unpublished';
    }
  }
  return (
    <tr className="VersioningListRow">
      <td className="VersioningListRow__td">{description}</td>
      <td className="VersioningListRow__td text-center">
        <Link to={routeConverter(ROUTE_CMS_EDIT_CONTENT, { id })}>
          <code>
            {id}
          </code>
        </Link>
      </td>
      <td className="VersioningListRow__td">{contentType}</td>
      <td className="VersioningListRow__td text-center">{editor}</td>
      <td className="VersioningListRow__td text-center">
        <code>
          {lastVersion} ({formatDate(lastModify)})
        </code>
      </td>
      <td className="VersioningListRow__td text-center">
        <span className={`ContentsFilter__status ContentsFilter__status--${statusColor}`} title={statusTitle} />
      </td>
      <td className="VersioningListRow__td text-center">
        <DropdownKebab pullRight id="VersioningListRow-dropdown">
          <LinkMenuItem
            id={`versioning-id${id}`}
            to={routeConverter(ROUTE_CMS_VERSIONING_DETAIL, { id })}
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
  editor: PropTypes.string.isRequired,
  lastModify: PropTypes.string.isRequired,
  lastVersion: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  onLine: PropTypes.bool.isRequired,
};

export default VersioningListItem;
