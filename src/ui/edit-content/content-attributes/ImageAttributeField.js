import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Col,
  ControlLabel,
  Button,
} from 'patternfly-react';

import AssetAttributeFieldInfoContainer from 'ui/edit-content/content-attributes/assets/AssetAttributeFieldInfoContainer';
import UploadTriggerButton from 'ui/common/button/UploadTriggerButton';
import AssetBrowserModal from 'ui/edit-content/content-attributes/assets/AssetBrowserModal';
import AssetsUploadContainer from 'ui/assets/AssetsUploadContainer';


const ImageAttributeField = ({
  input,
  meta: { touched, error },
  label,
  labelSize,
  inputSize,
  alignClass,
  help,
  onClickAdd,
  assetListBegin,
  mainGroup,
}) => {
  const handleAssetSelected = info => input.onChange(info);

  const containerClasses = touched && error ? 'form-group has-error' : 'form-group';

  const renderChoose = () => {
    const errorBox = touched && error ? <span className="help-block">{error}</span> : null;
    return (
      <>
        <Button
          bsStyle="primary"
          style={{ marginRight: 10 }}
          onClick={() => onClickAdd(input.name)}
        >
          <FormattedMessage id="cms.label.browse" defaultMessage="Browse" />
        </Button>
        <AssetsUploadContainer
          customTriggerComponent={UploadTriggerButton}
          customClassName="UploadAsset--button-version"
          customDropzoneProps={{ noClick: true }}
          onAssetSelected={handleAssetSelected}
          name={input.name}
        />
        {errorBox}
        <AssetBrowserModal
          assetType="image"
          name={input.name}
          onModalOpened={assetListBegin}
          onAssetSelected={handleAssetSelected}
          ownerGroup={mainGroup}
        />
      </>
    );
  };

  const renderAssetSelected = () => (
    <AssetAttributeFieldInfoContainer input={input} />
  );

  const hasValue = !!input.value;

  return (
    <div className={containerClasses}>
      <Col xs={labelSize} className={alignClass}>
        <ControlLabel>
          {label} {help}
        </ControlLabel>
      </Col>
      <Col xs={inputSize || 12 - labelSize}>
        {hasValue ? renderAssetSelected() : renderChoose()}
      </Col>
    </div>
  );
};

ImageAttributeField.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.shape({}),
      PropTypes.string,
    ]),
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  }),
  labelSize: PropTypes.number,
  alignClass: PropTypes.string,
  help: PropTypes.node,
  inputSize: PropTypes.number,
  label: PropTypes.node.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.shape({}),
  }),
  onClickAdd: PropTypes.func.isRequired,
  assetListBegin: PropTypes.func.isRequired,
  mainGroup: PropTypes.string.isRequired,
};

ImageAttributeField.defaultProps = {
  input: {},
  meta: {
    touched: false,
    error: {},
  },
  labelSize: 2,
  alignClass: 'text-right',
  help: null,
  inputSize: null,
};

export default ImageAttributeField;
