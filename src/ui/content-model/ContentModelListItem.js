import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { LinkMenuItem } from '@entando/menu';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { routeConverter } from '@entando/utils';
import { ROUTE_CMS_CONTENTMODEL_EDIT } from 'app-init/routes';

class ContentModelListItem extends Component {
  constructor(props) {
    super(props);
    this.onClickDelete = this.onClickDelete.bind(this);
  }

  onClickDelete() {
    const { onDelete, id, descr } = this.props;
    onDelete({ id, descr });
  }

  render() {
    const {
      descr, contentType, id,
    } = this.props;

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
              onClick={this.onClickDelete}
            >
              <FormattedMessage id="cms.label.delete" defaultMessage="Delete" />
            </MenuItem>
          </DropdownKebab>

        </td>
      </tr>
    );
  }
}

ContentModelListItem.propTypes = {
  contentType: PropTypes.string.isRequired,
  descr: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContentModelListItem;
