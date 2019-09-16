import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { LinkMenuItem } from '@entando/menu';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { routeConverter } from '@entando/utils';
import { ROUTE_CMS_CONTENTMODEL_EDIT } from 'app-init/routes';

const ContentModelListItem = (props) => {
  const {
    descr, contentType, id,
  } = props;

  return (
    <tr className="ContentModelList">
      <td className="ContentModelList__td">{contentType}</td>
      <td className="ContentModelList__td">{descr}</td>
      <td className="ContentModelList__td text-center">
        <DropdownKebab pullRight id="ContentModelList-dropdown">
          <LinkMenuItem
            id={`contmodel-id${id}`}
            to={routeConverter(ROUTE_CMS_CONTENTMODEL_EDIT, { id })}
            label={<FormattedMessage id="cms.label.edit" defaultMessage="Edit" />}
            className="ContentModelList__menu-item-edit"
          />
          <MenuItem
            className="ContentModelList__menu-item-delete"
          >
            <FormattedMessage id="cms.label.delete" defaultMessage="Delete" />
          </MenuItem>
        </DropdownKebab>

      </td>
    </tr>
  );
};

ContentModelListItem.propTypes = {
  contentType: PropTypes.string.isRequired,
  descr: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default ContentModelListItem;
