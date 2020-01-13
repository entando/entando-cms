import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';

const AssetsListItem = ({
  asset, onEditClicked, onClickDelete, onDuplicateClicked,
}) => {
  const {
    createdAt, description, metadata = {}, group, categories, versions, owner,
  } = asset;
  const fileType = versions == null ? 'file' : 'image';
  const previewRender = fileType === 'image' ? (
    <img src={asset.previewUrl} alt="Preview" />
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
  const onDuplicateClickHandle = () => onDuplicateClicked(asset);
  const onClickDeleteHandle = () => onClickDelete(asset);
  const onDownloadHandle = () => window.open(asset.downloadUrl);
  return (
    <tr className="AssetsList__item" key={asset.id}>
      <td className={fileType === 'file' ? 'text-center' : ''}>{previewRender}</td>
      <td>{description}</td>
      <td>{type}</td>
      <td>{owner || 'N/A'}</td>
      <td>{new Date(createdAt).toLocaleString()}</td>
      <td>{group.name || group}</td>
      <td>{renderCategories}</td>
      <td>
        <DropdownKebab className="AssetsList__item-actions" id={asset.id}>
          <MenuItem onClick={onEditClickHandle}>
            <FormattedMessage id="cms.label.edit" defaultMessage="Edit" />
          </MenuItem>
          <MenuItem onClick={onDuplicateClickHandle}>
            <FormattedMessage id="cms.label.duplicate" defaultMessage="Duplicate" />
          </MenuItem>
          <MenuItem onClick={onDownloadHandle}>
            <FormattedMessage id="cms.label.download" defaultMessage="Download" />
          </MenuItem>
          <MenuItem onClick={onClickDeleteHandle}>
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
  onDuplicateClicked: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
};

export default AssetsListItem;
