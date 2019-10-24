import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Icon, Button } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

const GenericModal = ({
  visibleModal,
  modalId,
  modalClassName,
  onCloseModal,
  children,
  buttons,
  modalFooter,
  modalTitle,
}) => {
  const footer = modalFooter || (
    <Modal.Footer>
      <Button bsStyle="default" className="btn-cancel" onClick={onCloseModal}>
        <FormattedMessage id="cms.label.cancel" />
      </Button>
      {buttons.map(button => (
        <Button {...button.props} key={button.props.id} />
      ))}
    </Modal.Footer>
  );

  return (
    <Modal
      show={visibleModal === modalId}
      onHide={onCloseModal}
      id={modalId}
      dialogClassName={modalClassName}
    >
      <Modal.Header>
        <button
          type="button"
          className="close"
          onClick={onCloseModal}
          aria-hidden="true"
          aria-label="Close"
        >
          <Icon type="pf" name="close" />
        </button>
        {modalTitle}
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {footer}
    </Modal>
  );
};

GenericModal.propTypes = {
  visibleModal: PropTypes.string,
  modalClassName: PropTypes.string,
  modalId: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  modalTitle: PropTypes.node,
  children: PropTypes.node.isRequired,
  modalFooter: PropTypes.node,
  buttons: PropTypes.arrayOf(PropTypes.node),
};

GenericModal.defaultProps = {
  visibleModal: '',
  modalClassName: '',
  modalTitle: '',
  modalFooter: '',
  buttons: [],
};

export default GenericModal;
