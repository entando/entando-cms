import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';

const AssetsListItem = ({ asset, onEditClicked }) => {
  const {
    createdAt, description, metadata = {}, group, categories, versions,
  } = asset;
  const fileType = versions == null ? 'file' : 'image';
  const previewRender = fileType === 'image' ? (
    // @TODO switch to URL (getURL from state?)
    <img src={`http://localhost:8080${versions[1].path}`} alt="Preview" />
  ) : (
    <div className="fa fa-file-text AssetsList__item-file" />
  );
  const type = metadata['Detected File Type Name']
    || description
      .split('.')
      .slice(-1)[0]
      .toUpperCase();
  const renderCategories = categories.map(cat => (
    <span key={cat}>
      {cat}
      <br />
    </span>
  ));
  const onEditClickHandle = () => onEditClicked(asset);
  return (
    <tr className="AssetsList__item" key={asset.id}>
      <td className={fileType === 'file' ? 'text-center' : ''}>{previewRender}</td>
      <td>{description}</td>
      <td>{type}</td>
      <td>Admin</td>
      <td>{new Date(createdAt).toLocaleDateString()}</td>
      <td>{group}</td>
      <td>{renderCategories}</td>
      <td>NO</td>
      <td>
        <DropdownKebab className="AssetsList__item-actions" id={asset.id}>
          <MenuItem className="" onClick={onEditClickHandle}>
            <FormattedMessage id="cms.label.edit" defaultMessage="Edit" />
          </MenuItem>
          <MenuItem className="" onClick={() => {}}>
            <FormattedMessage id="cms.label.delete" defaultMessage="Delete" />
          </MenuItem>
        </DropdownKebab>
      </td>
    </tr>
  );
};

AssetsListItem.propTypes = {
  asset: PropTypes.shape({}).isRequired,
  onEditClicked: PropTypes.func.isRequired,
};

export default AssetsListItem;
