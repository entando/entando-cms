import React from 'react';
import {
  Row, Col, Grid, Breadcrumb,
} from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import CMSPageTitle from 'ui/common/CMSPageTitle';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import ContentDraftDetailsContainer from 'ui/contents/content-details/ContentDraftDetailsContainer';

const ContentsDraftDetailsPage = () => (
  <Grid fluid>
    <Row>
      <Col xs={12}>
        <Breadcrumb>
          <BreadcrumbItem active>
            <FormattedMessage id="cms.title" defaultMessage="CMS" />
          </BreadcrumbItem>
          <BreadcrumbItem active>
            <FormattedMessage id="cms.menu.contents" defaultMessage="Contents" />
          </BreadcrumbItem>
        </Breadcrumb>
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <CMSPageTitle
          titleId="cms.contents.title"
          helpId="cms.contents.tip"
          position="pull-right"
          largeTitle
        />
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <ContentDraftDetailsContainer />
      </Col>
    </Row>
  </Grid>
);

export default ContentsDraftDetailsPage;
