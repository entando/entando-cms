import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape, defineMessages } from 'react-intl';
import { LinkMenuItem } from '@entando/menu';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { routeConverter } from '@entando/utils';
import { ROUTE_CMS_CONTENTTYPE_EDIT } from 'app-init/routes';

import ContentTypeStatusIcon from 'ui/content-type/ContentTypeStatusIcon';

class ContentTypeListItem extends Component {
  constructor(props) {
    super(props);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickReload = this.onClickReload.bind(this);
  }

  onClickDelete() {
    const { onDelete, name, code } = this.props;
    onDelete({ name, code });
  }

  onClickReload() {
    const { onReload, code } = this.props;
    onReload(code);
  }

  render() {
    const { name, code, status, intl } = this.props;

    const msgs = defineMessages({
      statusTitle: {
        id: `cms.contenttype.list.status.${status}`,
        defaultMessage: 'unknown status',
      },
    });

    return (
      <tr className="ContentTypeList">
        <td className="ContentTypeList__td">{name}</td>
        <td className="ContentTypeList__td">{code}</td>
        <td className="ContentTypeList__td text-center">
          <ContentTypeStatusIcon status={status} title={intl.formatMessage(msgs.statusTitle)} />
        </td>
        <td className="ContentTypeList__td text-center">
          <DropdownKebab pullRight id="ContentTypeList-dropdown">
            <LinkMenuItem
              id={`conttype-id${code}`}
              to={routeConverter(ROUTE_CMS_CONTENTTYPE_EDIT, { code })}
              label={<FormattedMessage id="cms.label.edit" defaultMessage="Edit" />}
              className="ContentTypeList__menu-item-edit"
            />
            <MenuItem className="ContentTypeList__menu-item-reload" onClick={this.onClickReload}>
              <FormattedMessage id="cms.label.reload" defaultMessage="Refresh" />
            </MenuItem>
            <MenuItem className="ContentTypeList__menu-item-delete" onClick={this.onClickDelete}>
              <FormattedMessage id="cms.label.delete" defaultMessage="Delete" />
            </MenuItem>
          </DropdownKebab>
        </td>
      </tr>
    );
  }
}

ContentTypeListItem.propTypes = {
  intl: intlShape.isRequired,
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['0', '1', '2']).isRequired,
  onDelete: PropTypes.func.isRequired,
  onReload: PropTypes.func.isRequired,
};

export default injectIntl(ContentTypeListItem);
