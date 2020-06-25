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

export const RECOVER_RESOURCE_MODAL_ID = 'RecoverResourceModal';

const RecoverResourceModal = ({ onConfirmRecover, info, resourceType }) => {
  const buttons = [
    <Button
      bsStyle="primary"
      id="RecoverResourceModal__button-recover"
      onClick={() => onConfirmRecover(info)}
    >
      <FormattedMessage id="cms.label.recover" />
    </Button>,
  ];

  const modalTitle = (
    <Modal.Title>
      <FormattedMessage id={`cms.versioning.resource.${resourceType}Caption`} />
    </Modal.Title>
  );

  return (
    <GenericModalContainer
      modalId={RECOVER_RESOURCE_MODAL_ID}
      buttons={buttons}
      modalTitle={modalTitle}
      className="RecoverResourceModal"
    >
      <EmptyState>
        <EmptyStateIcon name="exclamation" type="fa" className="RecoverResourceModal__icon" />
        <EmptyStateTitle className="RecoverResourceModal__title">
          <FormattedMessage id="cms.label.recover" />
          &nbsp;{info.name}
        </EmptyStateTitle>
        <EmptyStateInfo className="RecoverResourceModal__info">
          <FormattedMessage
            id={`cms.versioning.resource.${resourceType}Prompt`}
            values={{ name: info.name }}
          />
        </EmptyStateInfo>
      </EmptyState>
    </GenericModalContainer>
  );
};

RecoverResourceModal.propTypes = {
  onConfirmRecover: PropTypes.func.isRequired,
  resourceType: PropTypes.string.isRequired,
  info: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
};

RecoverResourceModal.defaultProps = {
  info: {
    id: '',
    name: '',
  },
};

export default RecoverResourceModal;
