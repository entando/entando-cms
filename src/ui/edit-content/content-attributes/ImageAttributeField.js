import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Col,
  ControlLabel,
  Button,
} from 'patternfly-react';
import AssetAttributeFieldInfo from 'ui/edit-content/content-attributes/assets/AssetAttributeFieldInfo';

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
  const [value, setValue] = useState({ info: null });

  const setInputValue = (val) => {
    const newVal = { ...value, ...val };
    setValue(newVal);
    input.onChange(newVal);
  };

  const handleAssetSelected = info => setInputValue({ info });

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
    <AssetAttributeFieldInfo inputValue={input.value.info} onChange={setInputValue} />
  );

  const hasValue = !!input.value.info;

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
