import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Grid,
  Row,
  Col,
  ControlLabel,
  Button,
  FormGroup,
  InputGroup,
  FormControl,
} from 'patternfly-react';

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
}) => {
  const handleAssetSelected = asset => input.onChange(asset);

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
        <AssetBrowserModal assetType="image" onAssetSelected={handleAssetSelected} />
      </>
    );
  };

  const renderAssetSelected = () => {
    const { value } = input;
    const { metadata } = value;
    const tfs = [
      {
        name: 'text',
        label: 'Text',
        value: value.description,
      },
      {
        name: 'alt',
        label: 'alt',
      },
      {
        name: 'description',
        label: 'description',
      },
      {
        name: 'legend',
        label: 'legend',
      },
      {
        name: 'title',
        label: 'title',
      },
    ];

    return (
      <>
        <Col xs={12} sm={5} md={4} lg={3}>
          <img src={value.previewUrl} alt="Preview" />
        </Col>
        <Col xs={12} sm={7} md={8} lg={9}>
          <Grid fluid>
            <Row>
              <Col xs={2} className="lbl"><FormattedMessage id="cms.assets.form.name" /></Col>
              <Col xs={10} className="inf">{value.description}</Col>
            </Row>
            <Row>
              <Col xs={2} className="lbl"><FormattedMessage id="cms.assets.form.filename" /></Col>
              <Col xs={10} className="inf">{metadata && metadata.filename}</Col>
            </Row>
            {tfs.map(tf => (
              <Row>
                <Col xs={4} className="lbl">{tf.label}</Col>
                <Col xs={8}>
                  <FormGroup>
                    <InputGroup>
                      <FormControl type="text" name={tf.name} value={tf.value || ''} />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
            ))}
          </Grid>
        </Col>
      </>
    );
  };

  const hasValue = !!input.value;

  const fieldAreaClass = hasValue ? 'AssetAttributeField__imgSelected' : '';

  return (
    <div className={containerClasses}>
      <Col xs={labelSize} className={alignClass}>
        <ControlLabel>
          {label} {help}
        </ControlLabel>
      </Col>
      <Col xs={inputSize || 12 - labelSize} className={fieldAreaClass}>
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
