import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';

const AssetsListGridView = ({
  assets, onEditClicked, onClickDelete, onDuplicateClicked,
}) => {
  const gridItems = assets.map((asset) => {
    const { versions } = asset;
    const fileType = versions == null ? 'file' : 'image';
    const previewRender = fileType === 'image' ? (
      <div
        style={{ backgroundImage: `url("${asset.previewLgUrl}")` }}
        className="AssetsListGridView__image"
      />
    ) : (
      <div className="fa fa-file-text AssetsList__item-file" />
    );
    const onEditClickHandle = () => onEditClicked(asset);
    const onClickDeleteHandle = () => onClickDelete(asset);
    const onDuplicateClickHandle = () => onDuplicateClicked(asset);
    const onDownloadHandle = () => window.open(asset.downloadUrl);
    return (
      <div className="AssetsListGridView__item" key={asset.id}>
        <div className="AssetsListGridView__header">
          <span className="AssetsListGridView__name">{asset.description}</span>
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
        </div>
        <div className="AssetsListGridView__image-wrapper">{previewRender}</div>
      </div>
    );
  });
  return <div className="AssetsListGridView">{gridItems}</div>;
};

AssetsListGridView.propTypes = {
  assets: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onEditClicked: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onDuplicateClicked: PropTypes.func.isRequired,
};

export default AssetsListGridView;
