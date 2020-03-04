import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { FormattedMessage } from 'react-intl';

import UploadAssetModalContainer from 'ui/assets/modals/upload-assets/UploadAssetModalContainer';

const AssetsUpload = ({
  onUpload, onAssetSelected, name, customClassName,
  customTriggerComponent, customDropzoneProps,
}) => {
  const handleDrop = useCallback((acceptedFiles) => {
    onUpload(acceptedFiles);
  }, [onUpload]);

  const {
    getRootProps, getInputProps, isDragActive, open,
  } = useDropzone({
    onDrop: handleDrop,
    ...customDropzoneProps,
  });

  const defaultTrigger = () => (
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
  );
  const TriggerComponent = customTriggerComponent || defaultTrigger;
  return (
    <>
      <div {...getRootProps()} className={`UploadAsset ${customClassName}`}>
        <input {...getInputProps()} />
        <TriggerComponent onClick={open} />
      </div>
      <UploadAssetModalContainer
        onAssetSelected={onAssetSelected}
        name={name}
      />
    </>
  );
};

AssetsUpload.propTypes = {
  onUpload: PropTypes.func,
  onAssetSelected: PropTypes.func,
  name: PropTypes.string,
  customTriggerComponent: PropTypes.func,
  customClassName: PropTypes.string,
  customDropzoneProps: PropTypes.shape({}),
};

AssetsUpload.defaultProps = {
  onUpload: () => { },
  onAssetSelected: () => {},
  name: '',
  customTriggerComponent: null,
  customClassName: '',
  customDropzoneProps: {},
};

export default AssetsUpload;
