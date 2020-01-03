import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Col,
  ControlLabel,
  Button,
} from 'patternfly-react';

import AssetAttributeFieldInfoContainer from 'ui/edit-content/content-attributes/assets/AssetAttributeFieldInfoContainer';

import AssetBrowserModal from 'ui/edit-content/content-attributes/assets/AssetBrowserModal';

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
}) => {
  const handleAssetSelected = info => input.onChange(info);
  const updateInputValue = val => input.onChange({ ...input.value, ...val });

  const containerClasses = touched && error ? 'form-group has-error' : 'form-group';

  const renderChoose = () => {
    const errorBox = touched && error ? <span className="help-block">{error}</span> : null;
    return (
      <>
        <Button
          bsStyle="primary"
          onClick={onClickAdd}
        >
          <FormattedMessage id="cms.label.add" defaultMessage="Add" />
        </Button>
        {errorBox}
        <AssetBrowserModal assetType="image" onModalOpened={assetListBegin} onAssetSelected={handleAssetSelected} />
      </>
    );
  };

  const renderAssetSelected = () => (
    <AssetAttributeFieldInfoContainer inputValue={input.value} onChange={updateInputValue} />
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
  input: PropTypes.shape({}),
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
