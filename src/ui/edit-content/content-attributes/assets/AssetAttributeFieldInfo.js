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
  inputValue,
  onChange,
}) => {
  const [value, setValue] = useState({});
  const [fields, setFields] = useState([]);
  const { metadata, type: assetType } = inputValue;
  useEffect(() => {
    let tfs = [
      {
        name: 'text',
        label: 'Text',
        value: inputValue.description,
      },
    ];

    if (assetType === 'image') {
      tfs = [...tfs, ...[{
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
      }]];
    }
    setFields(tfs);
    // const fields = tfs.map(tf => tf.name);
    const values = tfs.reduce((prev, curr) => ({
      ...prev,
      [curr.name]: curr.value || '',
    }), {});
    setValue(values);
    onChange(values);
  }, []);

  const onMetaChangeEvent = (e) => {
    const { name, value: val } = e.target;
    const newVal = { ...value, [name]: val };
    setValue(newVal);
    onChange(newVal);
  };

  return (
    <Grid fluid className="AssetAttributeField__selected-info">
      <Row>
        <Col xs={12} sm={5} md={4} className="text-center">
          <img src={inputValue.previewUrl} alt="Preview" className="img-thumbnail AssetAttributeField__img-preview" />
        </Col>
        <Col xs={12} sm={7} md={8}>
          <Grid fluid>
            <Row>
              <Col xs={2} className="AssetAttributeField__lbl"><FormattedMessage id="cms.assets.form.name" /></Col>
              <Col xs={10} className="inf">{inputValue.description}</Col>
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
  inputValue: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AssetAttributeFieldInfo;
