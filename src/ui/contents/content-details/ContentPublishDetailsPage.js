import React from 'react';
import {
  Row, Col, Grid, Breadcrumb,
} from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import CMSPageTitle from 'ui/common/CMSPageTitle';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import ContentPublishDetailsContainer from 'ui/contents/content-details/ContentPublishDetailsContainer';

const ContentsDraftDetailsPage = () => (
  <Grid fluid>
    <Row>
      <Col xs={12}>
        <Breadcrumb>
          <BreadcrumbItem active>
            <FormattedMessage id="cms.title" defaultMessage="CMS" />
          </BreadcrumbItem>
          <BreadcrumbItem to="/cms/contents">
            <FormattedMessage id="cms.menu.contents" defaultMessage="Contents" />
          </BreadcrumbItem>
          <BreadcrumbItem active>
            <FormattedMessage id="cms.contents.label.inspect" defaultMessage="Inspect" />
          </BreadcrumbItem>
          <BreadcrumbItem active>
            <FormattedMessage id="cms.contents.label.publishedver" defaultMessage="Draft" />
          </BreadcrumbItem>
        </Breadcrumb>
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <CMSPageTitle
          titleId="cms.contents.label.publishedver"
          helpId="cms.contents.tip"
          position="pull-right"
          largeTitle
        />
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <ContentPublishDetailsContainer />
      </Col>
    </Row>
  </Grid>
);

export default ContentsDraftDetailsPage;
