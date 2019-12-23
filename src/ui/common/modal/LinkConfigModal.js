import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Tabs,
  Tab,
  Icon,
} from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import GenericModal from 'ui/common/modal/GenericModal';
import LinkConfigUrlForm from 'ui/common/link-config/LinkConfigUrlForm';
import LinkConfigPageForm from 'ui/common/link-config/LinkConfigPageForm';

const getLinkUrl = (type, value) => `#!${type};${value}!#`;

const ID = 'LinkConfigModal';

const LinkConfigModal = ({ isVisible, onClose, onSave }) => {
  const handleSubmit = (values) => {
    const linkObj = { ...values.attributes };

    if (values.url) {
      linkObj.url = getLinkUrl('U', values.url);
    } else if (values.page) {
      linkObj.url = getLinkUrl('P', values.page);
    } else if (values.content) {
      linkObj.url = getLinkUrl('C', values.content);
    } else {
      linkObj.url = getLinkUrl('R', values.resource);
    }

    onSave(linkObj);
  };

  const renderedModalTitle = (
    <Modal.Title>
      <FormattedMessage id="cms.linkconfig.title" />
    </Modal.Title>
  );

  const renderedUrlTabTitle = (
    <>
      <Icon name="globe" />&nbsp;
      <span>Link to an URL</span>
    </>
  );

  const renderedPageTabTitle = (
    <>
      <Icon name="folder" />&nbsp;
      <span>Link to a page</span>
    </>
  );

  const renderedContentTabTitle = (
    <>
      <Icon name="file-text-o" />&nbsp;
      <span>Link to a content</span>
    </>
  );

  return (
    <GenericModal
      modalClassName="LinkConfigModal"
      visibleModal={isVisible ? ID : null}
      modalId={ID}
      modalTitle={renderedModalTitle}
      modalFooter={<></>}
      onCloseModal={onClose}
    >
      <Tabs
        defaultActiveKey="url"
        id="LinkConfigModal-Tabs"
        animation={false}
        mountOnEnter
      >
        <Tab eventKey="url" title={renderedUrlTabTitle}>
          <LinkConfigUrlForm onSubmit={handleSubmit} onCancel={onClose} />
        </Tab>
        <Tab eventKey="page" title={renderedPageTabTitle}>
          <LinkConfigPageForm onSubmit={handleSubmit} onCancel={onClose} />
        </Tab>
        <Tab eventKey="content" title={renderedContentTabTitle}>
          content
        </Tab>
      </Tabs>
    </GenericModal>
  );
};

LinkConfigModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default LinkConfigModal;
