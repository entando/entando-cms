import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';

const AssetsListGridView = ({
  assets, domain, onEditClicked, onClickDelete,
}) => {
  const gridItems = assets.map((asset) => {
    const { versions, path } = asset;
    const fileType = versions == null ? 'file' : 'image';
    const downloadUrl = `${domain}${fileType === 'image' ? `${versions[0].path}` : `${path}`}`;
    const previewRender = fileType === 'image' ? (
      <img
        src={`${domain}${versions[3].path}`}
        alt="Preview"
        className="AssetsListGridView__image"
      />
    ) : (
      <div className="fa fa-file-text AssetsList__item-file" />
    );
    const onEditClickHandle = () => onEditClicked(asset);
    const onClickDeleteHandle = () => onClickDelete(asset);
    return (
      <div className="AssetsListGridView__item" key={asset.id}>
        <div className="AssetsListGridView__header">
          <span className="AssetsListGridView__name">{asset.description}</span>
          <DropdownKebab className="AssetsList__item-actions" id={asset.id}>
            <MenuItem className="" onClick={onEditClickHandle}>
              <FormattedMessage id="cms.label.edit" defaultMessage="Edit" />
            </MenuItem>
            <MenuItem className="" onClick={() => window.open(downloadUrl)}>
              <FormattedMessage id="cms.label.download" defaultMessage="Download" />
            </MenuItem>
            <MenuItem className="" onClick={onClickDeleteHandle}>
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
  domain: PropTypes.string.isRequired,
  onEditClicked: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
};

export default AssetsListGridView;
