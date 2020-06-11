import React from 'react';
import {
  Nav, NavItem, TabContent, TabPane, TabContainer,
} from 'patternfly-react';

import VersioningListContainer from 'ui/versioning/VersioningListContainer';
import AttachmentsListContainer from 'ui/versioning/attachments/AttachmentsListContainer';

const VersioningTypes = () => (
  <TabContainer id="basic-tabs" defaultActiveKey="attachments">
    <div>
      <Nav
        bsClass="nav nav-tabs"
        justified
        onSelect={null}
        pullLeft={false}
        pullRight={false}
        stacked={false}
      >
        <NavItem
          active={false}
          disabled={false}
          eventKey="contents"
        >
      Contents
        </NavItem>
        <NavItem
          active={false}
          disabled={false}
          eventKey="images"
        >
      Images
        </NavItem>
        <NavItem
          active={false}
          disabled={false}
          eventKey="attachments"
        >
      Attachments
        </NavItem>
        <NavItem
          active={false}
          disabled={false}
          eventKey="configuration"
        >
      Configuration
        </NavItem>
      </Nav>
      <TabContent
        animation
        bsClass="tab"
        componentClass="div"
        mountOnEnter
        unmountOnExit
      >
        <TabPane
          bsClass="tab-pane"
          eventKey="contents"
        >
          <VersioningListContainer />
        </TabPane>
        <TabPane
          bsClass="tab-pane"
          eventKey="images"
        >
      images tab active
        </TabPane>
        <TabPane
          bsClass="tab-pane"
          eventKey="attachments"
        >
          <AttachmentsListContainer />
        </TabPane>
        <TabPane
          bsClass="tab-pane"
          eventKey="configuration"
        >
      configuration tab active
        </TabPane>
      </TabContent>
    </div>
  </TabContainer>
);

export default VersioningTypes;
