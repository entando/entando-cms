import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';

const ContentListItem = (props) => {
  const {
    typeDescription, typeCode,
  } = props;

  return (
    <tr className="ContentList">
      <td className="ContentList__td">{typeCode}</td>
      <td className="ContentList__td">{typeDescription}</td>
      <td className="ContentList__td text-center">
        <DropdownKebab pullRight id="ContentList-dropdown">
          <MenuItem
            className="ContentList__menu-item-delete"
          >
            <FormattedMessage id="cms.label.delete" defaultMessage="Delete" />
          </MenuItem>
        </DropdownKebab>

      </td>
    </tr>
  );
};

ContentListItem.propTypes = {
  typeDescription: PropTypes.string.isRequired,
  typeCode: PropTypes.string.isRequired,
};

export default ContentListItem;
