import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { LinkMenuItem } from '@entando/menu';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { routeConverter, formatDate } from '@entando/utils';
import { ROUTE_CMS_VERSIONING_DETAIL } from 'app-init/routes';

const SingleContentVersioningHistoryItem = ({
  description, editor, lastModify, lastVersion, onClickRestore,
}) => (
  <tr className="VersioningListRow">
    <td className="VersioningListRow__td text-center">
      <code>
        {lastVersion}
      </code>
    </td>
    <td className="VersioningListRow__td">{description}</td>
    <td className="VersioningListRow__td text-center">
      <code>
        {formatDate(lastModify)}
      </code>
    </td>
    <td className="VersioningListRow__td text-center">{editor}</td>
    <td className="VersioningListRow__td text-center">
      <DropdownKebab pullRight id="VersioningListRow-dropdown">
        <LinkMenuItem
          id={`versioning-id${lastVersion}`}
          to={routeConverter(ROUTE_CMS_VERSIONING_DETAIL, { lastVersion })}
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
  description: PropTypes.string.isRequired,
  editor: PropTypes.string.isRequired,
  lastModify: PropTypes.string.isRequired,
  lastVersion: PropTypes.string.isRequired,
  onClickRestore: PropTypes.func,
};

SingleContentVersioningHistoryItem.defaultProps = {
  onClickRestore: () => {},
};

export default SingleContentVersioningHistoryItem;
