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
  onDuplicateClicked,
  showColumns,
  onSelect,
  selected,
  language,
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
    <span key={cat.code || cat}>
      {cat && cat.titles && cat.titles[language]}
      <br />
    </span>
  ));
  const onEditClickHandle = () => onEditClicked(asset);
  const onDuplicateClickHandle = () => onDuplicateClicked(asset);
  const onClickDeleteHandle = () => onClickDelete(asset);
  const onDownloadHandle = () => window.open(asset.downloadUrl);

  const onClickSelectHandle = () => onItemSelected(asset);

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
          )}
        </td>,
      ].filter(({ key }) => showColumns.includes(key))}
    </tr>
  );
};

AssetsListItem.propTypes = {
  asset: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string])),
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
  onItemSelected: PropTypes.func,
  browseMode: PropTypes.bool,
  showColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  language: PropTypes.string.isRequired,
};

AssetsListItem.defaultProps = {
  browseMode: false,
  onItemSelected: null,
  selected: false,
};

export default AssetsListItem;
