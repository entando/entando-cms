import React from 'react';
import {
  Row,
  Col,
  CardGrid,
  Breadcrumb,
} from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import CMSShell from 'ui/common/CMSShell';
import PageTitle from 'ui/common/PageTitle';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import ContentSettingsGeneralContainer from 'ui/content-settings/ContentSettingsGeneralContainer';
import ContentSettingsMetadataListContainer from 'ui/content-settings/metadata/ContentSettingsMetadataListContainer';
import AddContentSettingsMetadataContainer from 'ui/content-settings/metadata/AddContentSettingsMetadataContainer';

const ContentSettingsPage = () => (
  <CMSShell>
    <CardGrid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem active>
              <FormattedMessage id="cms.title" defaultMessage="CMS" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="cms.contentsettings.title" defaultMessage="Settings" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          <PageTitle titleId="cms.contentsettings.title" helpId="cms.contentsettings.titletip" />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ContentSettingsGeneralContainer />
          <ContentSettingsMetadataListContainer />
          <AddContentSettingsMetadataContainer />
        </Col>
      </Row>
    </CardGrid>
  </CMSShell>
);

export default ContentSettingsPage;
