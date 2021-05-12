import React from "react";
import PropTypes from "prop-types";
import {
  Modal,
  Tabs,
  Tab,
  Icon,
} from "patternfly-react";
import { FormattedMessage } from "react-intl";

import GenericModal from "ui/common/modal/GenericModal";
import LinkConfigPageForm from "ui/common/link-config/LinkConfigPageForm";
import LinkConfigContentFormContainer from "ui/common/link-config/LinkConfigContentFormContainer";
import LinkConfigResourceForm from "ui/common/link-config/LinkConfigResourceForm";
import LinkConfigUrlFormContainer from "../link-config/LinkConfigUrlFormContainer";

const getLinkUrl = (type, value) => `#!${type};${value}!#`;

const ID = "LinkConfigModal";

const LinkConfigModal = ({
  isVisible, hasResourceTab, onClose, onSave, mainGroup, joinGroups, parameters,
}) => {
  const handleSubmit = (values) => {
    console.log('LinkConfigModal - handleSubmit ', values);
    const linkObj = { ...values.attributes };
    if (values.url) {
      linkObj.url = getLinkUrl("U", values.url);
    } else if (values.page) {
      linkObj.url = getLinkUrl("P", values.page);
    } else if (values.content) {
      linkObj.url = getLinkUrl("C", values.content);
    } else if (values.resource) {
      linkObj.url = getLinkUrl("R", values.resource);
    } else {
      return;
    }
    onSave(linkObj);
  };

  const renderedModalTitle = (
    <Modal.Title>
      <FormattedMessage id="cms.linkconfig.title"/>
    </Modal.Title>
  );

  const renderedUrlTabTitle = (
    <>
      <Icon name="globe"/>&nbsp;
      <span>Link to an URL</span>
    </>
  );

  const renderedPageTabTitle = (
    <>
      <Icon name="folder"/>&nbsp;
      <span>Link to a page</span>
    </>
  );

  const renderedContentTabTitle = (
    <>
      <Icon name="file-text-o"/>&nbsp;
      <span>Link to a content</span>
    </>
  );

  const renderedResourceTabTitle = (
    <>
      <Icon name="book"/>&nbsp;
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
          <LinkConfigUrlFormContainer
            onSubmit={handleSubmit}
            onCancel={onClose}
            parameters={parameters}
          />
        </Tab>
        <Tab eventKey="page" title={renderedPageTabTitle}>
          <LinkConfigPageForm
            mainGroup={mainGroup}
            joinGroups={joinGroups}
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        </Tab>
        <Tab eventKey="content" title={renderedContentTabTitle}>
          <LinkConfigContentFormContainer
            mainGroup={mainGroup}
            joinGroups={joinGroups}
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        </Tab>
        {hasResourceTab && (
          <Tab eventKey="resource" title={renderedResourceTabTitle}>
            <LinkConfigResourceForm
              onSubmit={handleSubmit}
              joinGroups={joinGroups}
              onCancel={onClose}
              mainGroup={mainGroup}
            />
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
  mainGroup: PropTypes.string.isRequired,
  joinGroups: PropTypes.arrayOf(PropTypes.string),
  parameters: PropTypes.shape({
    dest: PropTypes.string,
    rel: PropTypes.string,
    target: PropTypes.string,
    hreflang: PropTypes.string,
  }),
};

LinkConfigModal.defaultProps = {
  hasResourceTab: false,
  joinGroups: [],
  parameters: {},
};

export default LinkConfigModal;
