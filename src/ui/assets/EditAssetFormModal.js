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
  imgSrc,
  handleSubmit,
  group,
  language,
  categories,
  onModalOpen,
}) => {
  const modalTitle = (
    <Modal.Title>
      <FormattedMessage id="cms.assets.label.imagedetails" defaultMessage="Image Details" />
    </Modal.Title>
  );

  const toOpenModal = () => onModalOpen(assetInfo);

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
          <Field
            name="file"
            component={AssetPhotoCropperContainer}
            assetInfo={assetInfo}
            imgSrc={imgSrc}
          />
          <Row className="form-horizontal">
            <Col xs={12}>
              <fieldset className="no-padding">
                <legend>
                  <div className="AddContentModelForm__required-fields text-right">
                    * <FormattedMessage id="cms.label.fieldsRequired" />
                  </div>
                </legend>
                <Field
                  component={RenderTextInput}
                  name="name"
                  label={<FormLabel labelId="cms.assets.form.name" helpId="cms.contentmodel.form.nameHelp" required />}
                  validate={[required, maxLength50]}
                />
                <div className="form-group">
                  <Col xs={12} sm={6}>
                    <Field
                      component={RenderSelectInput}
                      name="group"
                      labelSize={4}
                      label={<FormLabel labelId="cms.assets.form.group" required />}
                      optionDisplayName="name"
                      optionValue="code"
                      options={[group]}
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
          <Row className="form-horizontal">
            <Col xs={12} className="text-right modal-footer">
              <Button bsStyle="default" className="btn-cancel">
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
  imgSrc: PropTypes.string.isRequired,
  onModalOpen: PropTypes.func.isRequired,
  assetInfo: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  group: PropTypes.shape({}).isRequired,
  language: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
};

EditAssetFormModalBody.defaultProps = {
  invalid: false,
  submitting: false,
};

const EditAssetFormModal = reduxForm({
  form: 'editassetformmodal',
})(EditAssetFormModalBody);

export default EditAssetFormModal;
