import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import {
  Button,
  EmptyState,
  Modal,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateInfo,
} from 'patternfly-react';

export const REMOVE_RESOURCE_MODAL_ID = 'RemoveResourceModal';

const RemoveResourceModal = ({ onConfirmRemove, info }) => {
  const buttons = [
    <Button
      bsStyle="danger"
      id="RemoveResourceModal__button-delete"
      onClick={() => onConfirmRemove(info)}
    >
      <FormattedMessage id="cms.label.remove" />
    </Button>,
  ];

  const modalTitle = (
    <Modal.Title>
      <FormattedMessage id="cms.label.modal.removeResource" />
    </Modal.Title>
  );

  return (
    <GenericModalContainer
      modalId={REMOVE_RESOURCE_MODAL_ID}
      buttons={buttons}
      modalTitle={modalTitle}
      className="RemoveResourceModal"
    >
      <EmptyState>
        <EmptyStateIcon name="exclamation" type="fa" className="RemoveResourceModal__icon" />
        <EmptyStateTitle>
          <FormattedMessage id="cms.label.remove" />
          <br />
          <div className="max-description-size">
            {info.description}
          </div>
        </EmptyStateTitle>
        <EmptyStateInfo className="RemoveResourceModal__info">
          <FormattedMessage id="cms.label.modal.confirmRemove" values={{ name: info.description }} />
        </EmptyStateInfo>
      </EmptyState>
    </GenericModalContainer>
  );
};

RemoveResourceModal.propTypes = {
  onConfirmRemove: PropTypes.func.isRequired,
  info: PropTypes.shape({
    description: PropTypes.string,
  }),
};

RemoveResourceModal.defaultProps = {
  info: {
    version: '',
    description: '',
  },
};

export default RemoveResourceModal;
