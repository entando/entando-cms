import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Button,
  Modal,
  Grid,
  Row,
  Col,
  FormGroup,
  FormControl,
  InputGroup,
  ButtonGroup,
} from 'patternfly-react';
import Cropper from 'react-cropper';

import GenericModalContainer from 'ui/common/modal/GenericModalContainer';

export const MODAL_ID = 'AssetPhotoCropper';

const AssetPhotoCropper = ({ onConfirmSave, assetInfo, imgSrc }) => {
  const cropper = useRef(null);
  // const dataX = useRef(null);
  // const dataY = useRef(null);
  // const dataW = useRef(null);
  // const dataH = useRef(null);
  const [croppedImg, setCroppedImg] = useState(imgSrc);
  const [dataX, setDataX] = useState('');
  const [dataY, setDataY] = useState('');
  const [dataW, setDataW] = useState('');
  const [dataH, setDataH] = useState('');
  const [dataRotate, setDataRotate] = useState(0);
  const [dataScaleX, setDataScaleX] = useState(1);
  const [dataScaleY, setDataScaleY] = useState(1);
  const { metadata, versions } = assetInfo;
  const buttons = [
    <Button
      bsStyle="primary"
      id="AssetPhotoCropper__button-save"
      onClick={() => onConfirmSave(assetInfo)}
    >
      <FormattedMessage id="cms.label.save" />
    </Button>,
  ];

  const modalTitle = (
    <Modal.Title>
      <FormattedMessage id="cms.assets.label.imagedetails" defaultMessage="Image Details" />
    </Modal.Title>
  );

  const onConfirmCrop = (e) => {
    const { detail } = e;

    setDataX(Math.round(detail.x));
    setDataY(Math.round(detail.y));
    setDataH(Math.round(detail.height));
    setDataW(Math.round(detail.width));
    setDataRotate(detail.rotate ? detail.rotate : '0');
    setDataScaleX(detail.scaleX ? detail.scaleX : '');
    setDataScaleY(detail.scaleY ? detail.scaleY : '');
    // dataRotate.value = typeof data.rotate !== 'undefined' ? data.rotate : '';
    // dataScaleX.value = typeof data.scaleX !== 'undefined' ? data.scaleX : '';
    // dataScaleY.value = typeof data.scaleY !== 'undefined' ? data.scaleY : '';
  };

  const renderDiffSizes = () => (
    (versions && versions.length > 0) ? (
      <Grid fluid className="AssetPhotoCropper__imginfo dim">
        <Row>
          <Col xs={12}>
            <h5 className="caption">Details</h5>
          </Col>
        </Row>
        {versions.map(img => (
          <Row key={img.sizetype}>
            <Col xs={5}>{img.dimensions}</Col>
            <Col xs={4}>{img.sizetype}</Col>
            <Col xs={3}>{img.size}</Col>
          </Row>
        ))}
      </Grid>
    ) : null
  );

  const cropCommand = (ev) => {
    const { action } = ev.currentTarget.dataset;
    const crop = cropper.current;
    switch (action) {
      case 'move':
        crop.setDragMode('move');
        break;
      case 'crop':
        crop.setDragMode('crop');
        break;
      case 'scaley':
        crop.scaleY(dataScaleY === 1 ? -1 : 1);
        break;
      case 'scalex':
        crop.scaleX(dataScaleX === 1 ? -1 : 1);
        break;
      case 'panleft':
        crop.move(-10, 0);
        break;
      case 'panright':
        crop.move(10, 0);
        break;
      case 'pandown':
        crop.move(0, 10);
        break;
      case 'panup':
        crop.move(0, -10);
        break;
      case 'rotateleft':
        crop.rotate(45);
        break;
      case 'rotateright':
        crop.rotate(-45);
        break;
      case 'zoomin':
        crop.zoom(0.1);
        break;
      case 'zoomout':
        crop.zoom(-0.1);
        break;
      case 'save':
        // crop.crop();
        setCroppedImg(crop.getCroppedCanvas().toDataURL());
        break;
      case 'cancel':
        setCroppedImg(null);
        crop.clear();
        break;
      default:
        break;
    }
  };

  return (
    <GenericModalContainer
      modalId={MODAL_ID}
      buttons={buttons}
      modalTitle={modalTitle}
      modalClassName="AssetPhotoCropper"
    >
      <Grid fluid>
        <Row>
          <Col xs={12} md={6}>
            <Cropper
              ref={cropper}
              src={croppedImg || imgSrc}
              preview=".AssetPhotoCropper__crop-preview"
              style={{ height: 400 }}
              crop={onConfirmCrop}
            />
          </Col>
          <Col xs={12} md={6} className="AssetPhotoCropper__rightinfo">
            <div className="AssetPhotoCropper__previews">
              <div className="AssetPhotoCropper__crop-preview preview-lg" />
              <div className="AssetPhotoCropper__crop-preview preview-md" />
              <div className="AssetPhotoCropper__crop-preview preview-sm" />
              <div className="AssetPhotoCropper__crop-preview preview-xs" />
            </div>
            <Grid fluid className="AssetPhotoCropper__imginfo">
              <Row>
                <Col xs={4} className="lbl">Type</Col>
                <Col xs={8} className="inf">{metadata && metadata.type}</Col>
              </Row>
              <Row>
                <Col xs={4} className="lbl">Dimension</Col>
                <Col xs={8} className="inf">{metadata && metadata.dimension}</Col>
              </Row>
              <Row>
                <Col xs={4} className="lbl">Title</Col>
                <Col xs={8} className="inf">{assetInfo && assetInfo.name}</Col>
              </Row>
              <Row>
                <Col xs={4} className="lbl">Filename</Col>
                <Col xs={8} className="inf">{metadata && metadata.filename}</Col>
              </Row>
            </Grid>
          </Col>
          <Col xs={12} md={6} className="AssetPhotoCropper__rightinfo">
            <div className="AssetPhotoCropper__previews">
              <FormGroup>
                <InputGroup>
                  <InputGroup.Addon className="AssetPhotoCropper__input-prelabel">X</InputGroup.Addon>
                  <FormControl type="text" value={dataX} readOnly />
                  <InputGroup.Addon>px</InputGroup.Addon>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroup.Addon className="AssetPhotoCropper__input-prelabel">Y</InputGroup.Addon>
                  <FormControl type="text" value={dataY} readOnly />
                  <InputGroup.Addon>px</InputGroup.Addon>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroup.Addon className="AssetPhotoCropper__input-prelabel">Width</InputGroup.Addon>
                  <FormControl type="text" value={dataW} readOnly />
                  <InputGroup.Addon>px</InputGroup.Addon>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroup.Addon className="AssetPhotoCropper__input-prelabel">Height</InputGroup.Addon>
                  <FormControl type="text" value={dataH} readOnly />
                  <InputGroup.Addon>px</InputGroup.Addon>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroup.Addon className="AssetPhotoCropper__input-prelabel">Rotate</InputGroup.Addon>
                  <FormControl type="text" value={dataRotate} readOnly />
                  <InputGroup.Addon>deg</InputGroup.Addon>
                </InputGroup>
              </FormGroup>
              <div className="AssetPhotoCropper__two-inputs">
                <FormGroup>
                  <InputGroup>
                    <InputGroup.Addon>Scale X</InputGroup.Addon>
                    <FormControl type="text" value={dataScaleX} readOnly />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroup.Addon>Scale Y</InputGroup.Addon>
                    <FormControl type="text" value={dataScaleY} readOnly />
                  </InputGroup>
                </FormGroup>
              </div>
            </div>
            {renderDiffSizes()}
          </Col>
        </Row>
        <Row className="AssetPhotoCropper__tool-row">
          <Col xs={12} md={9}>
            <ButtonGroup title="move" bsSize="large" className="AssetPhotoCropper__tool">
              <span>move</span>
              <Button data-action="move" onClick={cropCommand}><span className="fa fa-arrows" /></Button>
            </ButtonGroup>
            <ButtonGroup title="crop" bsSize="large" className="AssetPhotoCropper__tool">
              <span>crop</span>
              <Button data-action="crop" onClick={cropCommand}><span className="fa fa-crop" /></Button>
            </ButtonGroup>
            <ButtonGroup title="scale" bsSize="large" className="AssetPhotoCropper__tool">
              <span>scale</span>
              <Button data-action="scaley" onClick={cropCommand}><span className="fa fa-arrows-v" /></Button>
              <Button data-action="scalex" onClick={cropCommand}><span className="fa fa-arrows-h" /></Button>
            </ButtonGroup>
            <ButtonGroup title="move" bsSize="large" className="AssetPhotoCropper__tool">
              <span>move</span>
              <Button data-action="panleft" onClick={cropCommand}><span className="fa fa-arrow-left" /></Button>
              <Button data-action="panright" onClick={cropCommand}><span className="fa fa-arrow-right" /></Button>
              <Button data-action="pandown" onClick={cropCommand}><span className="fa fa-arrow-down" /></Button>
              <Button data-action="panup" onClick={cropCommand}><span className="fa fa-arrow-up" /></Button>
            </ButtonGroup>
            <ButtonGroup title="rotate" bsSize="large" className="AssetPhotoCropper__tool">
              <span>rotate</span>
              <Button data-action="rotateleft" onClick={cropCommand}><span className="fa fa-rotate-left" /></Button>
              <Button data-action="rotateright" onClick={cropCommand}><span className="fa fa-rotate-right" /></Button>
            </ButtonGroup>
            <ButtonGroup title="zoom" bsSize="large" className="AssetPhotoCropper__tool">
              <span>zoom</span>
              <Button data-action="zoomin" onClick={cropCommand}><span className="fa fa-search-plus" /></Button>
              <Button data-action="zoomout" onClick={cropCommand}><span className="fa fa-search-minus" /></Button>
            </ButtonGroup>
            <ButtonGroup title="save" bsSize="large" className="AssetPhotoCropper__tool no-sep">
              <span>apply</span>
              <Button data-action="save" onClick={cropCommand}><span className="fa fa-check" /></Button>
            </ButtonGroup>
            <ButtonGroup title="cancel" bsSize="large" className="AssetPhotoCropper__tool">
              <span>revert</span>
              <Button data-action="cancel" onClick={cropCommand}><span className="fa fa-times" /></Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Grid>
    </GenericModalContainer>
  );
};

AssetPhotoCropper.propTypes = {
  onConfirmSave: PropTypes.func.isRequired,
  assetInfo: PropTypes.shape({}).isRequired,
  imgSrc: PropTypes.string.isRequired,
};

export default AssetPhotoCropper;
