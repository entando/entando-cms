import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';

const AssetsListItem = ({
  asset,
  browseMode,
  onEditClicked,
  onClickDelete,
  onItemSelected,
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
  const onClickDeleteHandle = () => onClickDelete(asset);
  const onDownloadHandle = () => window.open(asset.downloadUrl);
  const onClickSelectHandle = () => onItemSelected(asset);

  return (
    <tr className="AssetsList__item" key={asset.id}>
      <td className={fileType === 'file' ? 'text-center' : ''}>{previewRender}</td>
      <td className="AssetsList__item-desc">{description}</td>
      <td>{type}</td>
      <td>{owner || 'N/A'}</td>
      <td>{new Date(createdAt).toLocaleDateString()}</td>
      <td>{group.name || group}</td>
      <td>{renderCategories}</td>
      <td>
        {browseMode ? (
          <DropdownKebab className="AssetsList__item-actions" id={asset.id} pullRight={browseMode}>
            <MenuItem onClick={onClickSelectHandle}>
              <FormattedMessage id="cms.label.use" defaultMessage="Use" />
            </MenuItem>
          </DropdownKebab>
        ) : (
          <DropdownKebab className="AssetsList__item-actions" id={asset.id} pullRight={browseMode}>
            <MenuItem onClick={onEditClickHandle}>
              <FormattedMessage id="cms.label.edit" defaultMessage="Edit" />
            </MenuItem>
            <MenuItem onClick={onDownloadHandle}>
              <FormattedMessage id="cms.label.download" defaultMessage="Download" />
            </MenuItem>
            <MenuItem onClick={onClickDeleteHandle}>
              <FormattedMessage id="cms.label.delete" defaultMessage="Delete" />
            </MenuItem>
          </DropdownKebab>
        )}
      </td>
    </tr>
  );
};

AssetsListItem.propTypes = {
  asset: PropTypes.shape({}).isRequired,
  onEditClicked: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onItemSelected: PropTypes.func,
  browseMode: PropTypes.bool,
};

AssetsListItem.defaultProps = {
  browseMode: false,
  onItemSelected: null,
};

export default AssetsListItem;
