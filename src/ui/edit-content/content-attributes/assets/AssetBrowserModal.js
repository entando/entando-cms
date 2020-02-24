import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Modal,
} from 'patternfly-react';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import AssetsListContainer from 'ui/assets/AssetsListContainer';

export const ATTACH_MODAL_ID = 'AssetBrowserModal_attach';
export const IMAGE_MODAL_ID = 'AssetBrowserModal_image';

const AssetBrowserModal = ({
  assetType,
  onAssetSelected,
  onModalOpened,
  name,
}) => {
  const modalTitle = (
    <Modal.Title>
      <FormattedMessage id="cms.assets.label.assetbrowser" defaultMessage="Browse Asset" />
    </Modal.Title>
  );
  const MODAL_ID = assetType === 'image' ? `${IMAGE_MODAL_ID}${name}` : `${ATTACH_MODAL_ID}${name}`;
  return (
    <GenericModalContainer
      modalId={MODAL_ID}
      modalTitle={modalTitle}
      modalFooter={<span />}
      modalClassName="AssetsList"
      onOpenModal={onModalOpened}
    >
      <AssetsListContainer
        assetType={assetType}
        browseMode
        onUseAsset={onAssetSelected}
      />
    </GenericModalContainer>
  );
};

AssetBrowserModal.propTypes = {
  assetType: PropTypes.string.isRequired,
  onAssetSelected: PropTypes.func.isRequired,
  onModalOpened: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default AssetBrowserModal;
