import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import {
  Button, EmptyState, Modal,
  EmptyStateIcon, EmptyStateTitle, EmptyStateInfo,
} from 'patternfly-react';

export const MODAL_ID = 'DeleteContentModelModal';

const DeleteContentModelModal = ({
  onConfirmDelete, info,
}) => {
  const buttons = [
    <Button bsStyle="danger" id="DeleteContentModelModal__button-delete" onClick={() => (onConfirmDelete(info))}>
      <FormattedMessage id="cms.label.delete" />
    </Button>,
  ];

  const modalTitle = (
    <Modal.Title><FormattedMessage id="cms.label.delete" /></Modal.Title>
  );

  return (
    <GenericModalContainer modalId={MODAL_ID} buttons={buttons} modalTitle={modalTitle} className="DeleteContentModelModal">
      <EmptyState>
        <EmptyStateIcon name="exclamation" type="fa" className="DeleteContentModelModal__icon" />
        <EmptyStateTitle>
          <FormattedMessage id="cms.label.delete" />&nbsp;{info.descr}
        </EmptyStateTitle>
        <EmptyStateInfo className="DeleteContentModelModal__info">
          <FormattedMessage id="cms.label.modal.confirmdelete" values={{ code: info.id }} />
        </EmptyStateInfo>
      </EmptyState>
    </GenericModalContainer>
  );
};

DeleteContentModelModal.propTypes = {
  onConfirmDelete: PropTypes.func.isRequired,
  info: PropTypes.shape({
    id: PropTypes.number,
    descr: PropTypes.string,
  }),
};

DeleteContentModelModal.defaultProps = {
  info: {
    id: '',
    descr: '',
  },
};

export default DeleteContentModelModal;
