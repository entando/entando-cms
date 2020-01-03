import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  InputGroup,
  FormControl,
} from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

const AssetAttributeFieldInfo = ({
  metaProps,
  metaValues,
  assetInfo,
  onChange,
}) => {
  const [value, setValue] = useState({});
  const [fields, setFields] = useState([]);
  // console.log(metaProps, assetInfo);
  const { metadata } = assetInfo;
  useEffect(() => {
    setFields(metaProps);
    setValue(metaValues);
    // onChange(metaValues);
  }, []);

  const onMetaChangeEvent = (e) => {
    const { name, value: val } = e.target;
    const newVal = { ...value, [name]: val };
    setValue(newVal);
    onChange(newVal);
  };

  const previewRender = assetInfo.type === 'image' ? (
    <img src={assetInfo.previewUrl} alt="Preview" className="img-thumbnail AssetAttributeField__img-preview" />
  ) : (
    <div className="fa fa-file-text img-thumbnail AssetAttributeField__attach-preview" />
  );

  return (
    <Grid fluid className="AssetAttributeField__selected-info">
      <Row>
        <Col xs={12} sm={5} md={4} className="text-center">
          {previewRender}
        </Col>
        <Col xs={12} sm={7} md={8}>
          <Grid fluid>
            <Row>
              <Col xs={2} className="AssetAttributeField__lbl"><FormattedMessage id="cms.assets.form.name" /></Col>
              <Col xs={10} className="inf">{assetInfo.description}</Col>
            </Row>
            <Row className="form-group">
              <Col xs={2} className="AssetAttributeField__lbl"><FormattedMessage id="cms.assets.form.filename" /></Col>
              <Col xs={10} className="inf">{metadata && metadata.filename}</Col>
            </Row>
            {fields.map(tf => (
              <Row key={tf.name}>
                <Col xs={4} className="AssetAttributeField__lbl text-right">{tf.label}</Col>
                <Col xs={8}>
                  <FormGroup className="AssetAttributeField__input">
                    <InputGroup className="AssetAttributeField__input">
                      <FormControl type="text" name={tf.name} onChange={onMetaChangeEvent} defaultValue={tf.value || ''} className="AssetAttributeField__input--inner" />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
            ))}
          </Grid>
        </Col>
      </Row>
    </Grid>
  );
};

AssetAttributeFieldInfo.propTypes = {
  metaProps: PropTypes.arrayOf(PropTypes.shape({})),
  metaValues: PropTypes.shape({}),
  assetInfo: PropTypes.shape({}),
  onChange: PropTypes.func.isRequired,
};

AssetAttributeFieldInfo.defaultProps = {
  metaProps: [],
  metaValues: {},
  assetInfo: {},
};

export default AssetAttributeFieldInfo;
