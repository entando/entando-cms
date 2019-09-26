import React from 'react';
import {
  Row,
  Col,
  Button,
} from 'patternfly-react';

// TODO: use intl messages for Add and Save buttons
const ContentSettingsCropRatios = () => (
  <div>
    <h2 data-test-id="content-settings-crop-ratios-heading">
      Settings Image Crop Dimensions
    </h2>
    <Row>
      <Col xs={12} sm={5} smOffset={2}>
        <Button
          data-test-id="content-settings-crop-ratios-form-add"
          bsStyle="primary"
        >
          Add
        </Button>
      </Col>
    </Row>
    <br />
    <Row>
      <Col xs={12} sm={5} smOffset={2}>
        <Button
          data-test-id="content-settings-crop-ratios-form-save"
          bsStyle="primary"
        >
          Save
        </Button>
      </Col>
    </Row>
  </div>
);

export default ContentSettingsCropRatios;
