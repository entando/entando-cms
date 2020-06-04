import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { LinkMenuItem } from '@entando/menu';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { routeConverter } from '@entando/utils';
import { ROUTE_CMS_CONTENTTEMPLATE_EDIT } from 'app-init/routes';

class ContentTemplateListItem extends Component {
  constructor(props) {
    super(props);
    this.onClickDelete = this.onClickDelete.bind(this);
  }

  onClickDelete() {
    const { onDelete } = this.props;
    onDelete(this.props);
  }

  render() {
    const { descr, contentType, id } = this.props;

    return (
      <tr className="ContentTemplateList">
        <td className="ContentTemplateList__td">{id}</td>
        <td className="ContentTemplateList__td">{contentType}</td>
        <td className="ContentTemplateList__td">{descr}</td>
        <td className="ContentTemplateList__td text-center">
          <DropdownKebab pullRight id="ContentTemplateList-dropdown">
            <LinkMenuItem
              id={`contmodel-id${id}`}
              to={routeConverter(ROUTE_CMS_CONTENTTEMPLATE_EDIT, { id })}
              label={<FormattedMessage id="cms.label.edit" defaultMessage="Edit" />}
              className="ContentTemplateList__menu-item-edit"
            />
            <MenuItem className="ContentTemplateList__menu-item-delete" onClick={this.onClickDelete}>
              <FormattedMessage id="cms.label.delete" defaultMessage="Delete" />
            </MenuItem>
          </DropdownKebab>
        </td>
      </tr>
    );
  }
}

ContentTemplateListItem.propTypes = {
  contentType: PropTypes.string.isRequired,
  descr: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContentTemplateListItem;
