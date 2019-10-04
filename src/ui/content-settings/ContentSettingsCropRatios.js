import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
} from 'patternfly-react';

import RatioInput from 'ui/content-settings/ContentSettingsCropRatioInput';

const propTypes = {
  cropRatios: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

// TODO: use intl messages
const ContentSettingsCropRatios = ({ cropRatios, onAdd, onDelete }) => (
  <div>
    <h3 data-test-id="content-settings-crop-ratios-heading">
      Settings Image Crop Dimensions
    </h3>
    <hr />
    <Row>
      <Col>
        <h5 data-test-id="content-settings-crop-ratios-form-title">
          Add Crop Dimension
        </h5>
      </Col>
    </Row>
    {cropRatios.map(cropRatio => (
      <Row key={cropRatio}>
        <Col xs={12} sm={5} smOffset={2}>
          <RatioInput
            data-test-id="content-settings-crop-ratios-form-input"
            value={cropRatio}
            onDelete={() => onDelete(cropRatio)}
          />
        </Col>
      </Row>
    ))}
    <Row>
      <Col xs={12} sm={5} smOffset={2}>
        <RatioInput
          data-test-id="content-settings-crop-ratios-form-input"
          isNew
          onAdd={onAdd}
        />
      </Col>
    </Row>
  </div>
);

ContentSettingsCropRatios.propTypes = propTypes;

export default ContentSettingsCropRatios;
