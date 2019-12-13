import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import GenericModal from 'ui/common/modal/GenericModal';

const ID = 'LinkConfigModal';

const LinkConfigModal = ({ isVisible, onClose }) => {
  const renderedModalTitle = (
    <Modal.Title>
      <FormattedMessage id="cms.linkconfig.title" />
    </Modal.Title>
  );

  return (
    <GenericModal
      visibleModal={isVisible ? ID : null}
      modalId={ID}
      modalTitle={renderedModalTitle}
      onCloseModal={onClose}
    >
    link
    </GenericModal>
  );
};

LinkConfigModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LinkConfigModal;
