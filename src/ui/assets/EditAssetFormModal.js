import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import {
  Button,
  Modal,
  Grid,
  Row,
  Col,
} from 'patternfly-react';
import { required, maxLength } from '@entando/utils';

import RenderTextInput from 'ui/common/form/RenderTextInput';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import RenderCategoryTreeInput from 'ui/common/category/RenderCategoryTreeInput';
import FormLabel from 'ui/common/form/FormLabel';

import AssetPhotoCropperContainer from 'ui/assets/cropper/AssetPhotoCropperContainer';

import GenericModalContainer from 'ui/common/modal/GenericModalContainer';

export const MODAL_ID = 'EditAssetFormModal';

const maxLength50 = maxLength(50);

const EditAssetFormModalBody = ({
  assetInfo,
  isImg,
  imgSrc,
  handleSubmit,
  group,
  language,
  categories,
  onModalOpen,
  onModalClose,
}) => {
  const modalTitle = (
    <Modal.Title>
      <FormattedMessage id={`cms.assets.label.${isImg ? 'imagedetails' : 'attachdetails'}`} defaultMessage="Image Details" />
    </Modal.Title>
  );

  const toOpenModal = () => onModalOpen(assetInfo);

  const groupItems = group && JSON.stringify(group) !== '{}' ? [group] : [];

  const metadata = assetInfo.metadata || {};

  const renderMetadataRows = Object.keys(metadata).map(k => metadata[k] && (
    <tr>
      <td>
        {k}
      </td>
      <td>
        {metadata[k]}
      </td>
    </tr>
  ));

  const renderMetadata = isImg ? (
    <Row>
      <Col xs={12}>
        <h2 className="AssetPhotoCropper__metadata"><FormattedMessage id="cms.label.metadata" defaultMessage="Metadata" /></h2>
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th width="50%">
                <FormattedMessage id="cms.label.name" />
              </th>
              <th width="50%">
                <FormattedMessage id="cms.label.value" />
              </th>
            </tr>
          </thead>
          <tbody>
            {renderMetadataRows}
          </tbody>
        </table>
      </Col>
    </Row>
  ) : null;

  return (
    <GenericModalContainer
      modalId={MODAL_ID}
      modalTitle={modalTitle}
      modalFooter={<span />}
      modalClassName="AssetPhotoCropper"
      onOpenModal={toOpenModal}
    >
      <form onSubmit={handleSubmit}>
        <Grid fluid>
          {isImg ? (
            <Field
              name="file"
              component={AssetPhotoCropperContainer}
              assetInfo={assetInfo}
              imgSrc={imgSrc}
            />
          ) : null}
          <Row className="form-horizontal">
            <Col xs={12}>
              <fieldset className="no-padding">
                <legend>
                  <div className="AddContentModelForm__required-fields text-right">
                    * <FormattedMessage id="cms.label.fieldsRequired" />
                  </div>
                </legend>
                <div className="form-group">
                  <Col xs={12} sm={6}>
                    <Field
                      component={RenderTextInput}
                      name="description"
                      labelSize={4}
                      label={<FormLabel labelId="cms.assets.form.desc" helpId="cms.contentmodel.form.nameHelp" required />}
                      validate={[required, maxLength50]}
                    />
                    <Field
                      component={RenderSelectInput}
                      name="group"
                      labelSize={4}
                      label={<FormLabel labelId="cms.assets.form.group" />}
                      optionDisplayName="name"
                      optionValue="code"
                      options={groupItems}
                      disabled
                    />
                  </Col>
                  <Col xs={12} sm={6}>
                    <Field
                      component={RenderCategoryTreeInput}
                      name="categories"
                      label={<FormLabel labelId="cms.assets.form.categories" />}
                      language={language}
                      categories={categories}
                    />
                  </Col>
                </div>
              </fieldset>
            </Col>
          </Row>
          {renderMetadata}
          <Row className="form-horizontal">
            <Col xs={12} className="text-right modal-footer">
              <Button bsStyle="default" className="btn-cancel" onClick={onModalClose}>
                <FormattedMessage id="cms.label.cancel" />
              </Button>
              <Button
                type="submit"
                bsStyle="primary"
                id="AssetPhotoCropper__button-save"
              >
                <FormattedMessage id="cms.label.save" />
              </Button>
            </Col>
          </Row>
        </Grid>
      </form>
    </GenericModalContainer>
  );
};

EditAssetFormModalBody.propTypes = {
  isImg: PropTypes.bool.isRequired,
  imgSrc: PropTypes.string.isRequired,
  onModalOpen: PropTypes.func.isRequired,
  assetInfo: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  group: PropTypes.shape({}).isRequired,
  language: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onModalClose: PropTypes.func.isRequired,
};

const EditAssetFormModal = reduxForm({
  form: 'editassetformmodal',
})(EditAssetFormModalBody);

export default EditAssetFormModal;
