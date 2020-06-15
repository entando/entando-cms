import React from 'react';
import { Tabs, Tab } from 'patternfly-react';

const ContentVersionDetails = () => (
  <div>
    <Tabs defaultActiveKey="en" animation={false} id="detail-lang-tabs">
      <Tab key="en" eventKey="en" title="English" />
      <Tab key="it" eventKey="it" title="Italian" />
    </Tabs>
  </div>
);

export default ContentVersionDetails;
