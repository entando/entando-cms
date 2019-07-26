import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';

const ContentModelListItem = (props) => {
  const {
    descr, contentType,
  } = props;

  return (
    <tr className="ContentModelList">
      <td className="ContentModelList__td">{contentType}</td>
      <td className="ContentModelList__td">{descr}</td>
      <td className="ContentModelList__td text-center">
        <DropdownKebab pullRight id="ContentModelList-dropdown">
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
};

export default ContentModelListItem;
