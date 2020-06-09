import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { LinkMenuItem } from '@entando/menu';
import { DropdownKebab } from 'patternfly-react';
import { routeConverter } from '@entando/utils';
import { ROUTE_CMS_VERSIONING_DETAIL } from 'app-init/routes';

const VersioningListItem = ({
  id, contentType, description, editor, lastModify, lastVersion, status,
}) => (
  <tr className="VersioningListRow">
    <td className="VersioningListRow__td">{description}</td>
    {/* @TODO make link */}
    <td className="VersioningListRow__td text-center">{id}</td>
    <td className="VersioningListRow__td">{contentType}</td>
    <td className="VersioningListRow__td text-center">{editor}</td>
    {/* @TODO make link */}
    <td className="VersioningListRow__td text-center">{lastVersion}{lastModify}</td>
    {/* @TODO color */}
    <td className="VersioningListRow__td text-center">{status}</td>
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

VersioningListItem.propTypes = {
  contentType: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  editor: PropTypes.string.isRequired,
  lastModify: PropTypes.string.isRequired,
  lastVersion: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  status: PropTypes.bool.isRequired,
};

export default VersioningListItem;
