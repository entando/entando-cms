import React from 'react';
import PropTypes from 'prop-types';

const ContentAssetDetails = ({ assetInfo, attributeType }) => {
  const previewRender = attributeType === 'Image' ? (
    <img src={assetInfo.previewUrl} alt="Preview" className="img-thumbnail ContentDetails__asset-img-preview" />
  ) : (
    <div className="fa fa-file-text img-thumbnail AssetAttributeField__attach-preview" />
  );
  return (
    <>
      {previewRender}{assetInfo.description}
    </>
  );
};

ContentAssetDetails.propTypes = {
  assetInfo: PropTypes.shape({
    previewUrl: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  attributeType: PropTypes.string.isRequired,
};

export default ContentAssetDetails;
