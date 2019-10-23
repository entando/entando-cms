import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';

const AssetsListGridView = ({ assets, domain }) => {
  const gridItems = assets.map((asset) => {
    const { versions } = asset;
    const fileType = versions == null ? 'file' : 'image';
    const previewRender = fileType === 'image' ? (
      <img
        src={`http://${domain}${versions[3].path}`}
        alt="Preview"
        className="AssetsListGridView__image"
      />
    ) : (
      <div className="fa fa-file-text AssetsList__item-file" />
    );
    return (
      <div className="AssetsListGridView__item" key={asset.id}>
        <div className="AssetsListGridView__header">
          <span className="AssetsListGridView__name">{asset.description}</span>
          <DropdownKebab className="AssetsList__item-actions" id={asset.id}>
            <MenuItem className="" onClick={() => {}}>
              <FormattedMessage id="cms.label.edit" defaultMessage="Edit" />
            </MenuItem>
            <MenuItem className="" onClick={() => {}}>
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
};

export default AssetsListGridView;
