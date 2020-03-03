import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { FormattedMessage } from 'react-intl';
import { Button } from 'patternfly-react';

import UploadAssetModalContainer from 'ui/assets/modals/upload-assets/UploadAssetModalContainer';

const AssetsUpload = ({
  onDrop, buttonVersion, onAssetSelected, name,
}) => {
  const handleDrop = useCallback((acceptedFiles) => {
    onDrop(acceptedFiles);
  }, [onDrop]);

  const {
    getRootProps, getInputProps, isDragActive, open,
  } = useDropzone({
    onDrop: handleDrop,
    ...(buttonVersion && { noClick: true, noKeyboard: true }),
  });

  return (
    <>
      <div {...getRootProps()} className={buttonVersion ? 'UploadAsset--button-version' : 'UploadAsset'}>
        <input {...getInputProps()} />
        {
          buttonVersion ? (
            <Button
              bsStyle="primary"
              onClick={open}
            >
              <FormattedMessage id="cms.label.upload" defaultMessage="Upload" />
            </Button>
          ) : (
            <React.Fragment>
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
            </React.Fragment>
          )
        }
      </div>
      <UploadAssetModalContainer
        buttonVersion={buttonVersion}
        onAssetSelected={onAssetSelected}
        name={name}
      />
    </>
  );
};

AssetsUpload.propTypes = {
  onDrop: PropTypes.func,
  onAssetSelected: PropTypes.func,
  buttonVersion: PropTypes.bool,
  name: PropTypes.string,
};

AssetsUpload.defaultProps = {
  onDrop: () => { },
  onAssetSelected: () => {},
  buttonVersion: false,
  name: '',
};

export default AssetsUpload;
