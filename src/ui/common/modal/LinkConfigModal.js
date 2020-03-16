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
import LinkConfigContentFormContainer from 'ui/common/link-config/LinkConfigContentFormContainer';
import LinkConfigResourceForm from 'ui/common/link-config/LinkConfigResourceForm';

const getLinkUrl = (type, value) => `#!${type};${value}!#`;

const ID = 'LinkConfigModal';

const LinkConfigModal = ({
  isVisible, hasResourceTab, onClose, onSave,
}) => {
  const handleSubmit = (values) => {
    const linkObj = { ...values.attributes };
    if (values.url) {
      linkObj.url = getLinkUrl('U', values.url);
    } else if (values.page) {
      linkObj.url = getLinkUrl('P', values.page);
    } else if (values.content) {
      linkObj.url = getLinkUrl('C', values.content);
    } else if (values.resource) {
      linkObj.url = getLinkUrl('R', values.resource);
    } else {
      return;
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

  const renderedResourceTabTitle = (
    <>
      <Icon name="book" />&nbsp;
      <span>Link to a resource</span>
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
          <LinkConfigContentFormContainer onSubmit={handleSubmit} onCancel={onClose} />
        </Tab>
        {hasResourceTab && (
          <Tab eventKey="resource" title={renderedResourceTabTitle}>
            <LinkConfigResourceForm onSubmit={handleSubmit} onCancel={onClose} />
          </Tab>
        )}
      </Tabs>
    </GenericModal>
  );
};

LinkConfigModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  hasResourceTab: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

LinkConfigModal.defaultProps = {
  hasResourceTab: false,
};

export default LinkConfigModal;
