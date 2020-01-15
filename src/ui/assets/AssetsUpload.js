import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { FormattedMessage } from 'react-intl';

import UploadAssetModalContainer from 'ui/assets/modals/upload-assets/UploadAssetModalContainer';

const AssetsUpload = ({ onDrop }) => {
  const handleDrop = useCallback((acceptedFiles) => {
    onDrop(acceptedFiles);
  }, [onDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleDrop });

  return (
    <>
      <div {...getRootProps()} className="UploadAsset">
        <input {...getInputProps()} />
        <i className="fa fa-cloud-upload UploadAsset__upload-icon" />
        <p>
          {
            isDragActive
              ? <FormattedMessage id="cms.label.dropFilesHere" defaultMessage="Drop the files here" />
              : (
                <>
                  <FormattedMessage id="cms.label.dragAndDrop" defaultMessage="Drag and drop or " />
                  <span className="UploadAsset__upload-description-browse"><FormattedMessage id="cms.label.browseYourComputer" defaultMessage="Browse your computer" /></span>
                </>
              )
          }
        </p>
      </div>
      <UploadAssetModalContainer />
    </>
  );
};

AssetsUpload.propTypes = {
  onDrop: PropTypes.func,
};

AssetsUpload.defaultProps = {
  onDrop: () => { },
};

export default AssetsUpload;
