import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';

const AssetsListItem = ({
  asset, onEditClicked, onClickDelete, onDuplicateClicked,
  showColumns, onSelect, selected,
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

  const handleItemClick = () => {
    onSelect(asset.id);
  };

  return (
    <tr className={`AssetsList__item ${selected ? 'selected' : ''}`} key={asset.id} onClick={handleItemClick}>
      {[
        <td key="preview" className={fileType === 'file' ? 'text-center' : ''}>{previewRender}</td>,
        <td key="name">{description}</td>,
        <td key="type">{type}</td>,
        <td key="uploadedBy">{owner || 'N/A'}</td>,
        <td key="uploadedAt">{new Date(createdAt).toLocaleString()}</td>,
        <td key="group">{group.name || group}</td>,
        <td key="categories">{renderCategories}</td>,
        <td key="actions">
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
        </td>,
      ].filter(({ key }) => showColumns.includes(key))}
    </tr>
  );
};

AssetsListItem.propTypes = {
  asset: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
    createdAt: PropTypes.string,
    id: PropTypes.string,
    owner: PropTypes.string,
    previewUrl: PropTypes.string,
    downloadUrl: PropTypes.string,
    metadata: PropTypes.shape({}),
    group: PropTypes.shape({
      name: PropTypes.string,
    }),
    versions: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  onEditClicked: PropTypes.func.isRequired,
  onDuplicateClicked: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  showColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

AssetsListItem.defaultProps = {
  selected: false,
};

export default AssetsListItem;
