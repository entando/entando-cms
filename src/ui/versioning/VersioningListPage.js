import React, { Fragment } from 'react';
import {
  Row, Col, Grid, Breadcrumb,
} from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import CMSPageTitle from 'ui/common/CMSPageTitle';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import VersioningListContainer from 'ui/versioning/VersioningListContainer';
import VersioningTypesContainer from 'ui/versioning/VersioningTypesContainer';

const VersioningListPage = () => (
  <Grid fluid>
    <Row>
      <Col xs={12}>
        <Breadcrumb>
          <BreadcrumbItem active>
            <FormattedMessage id="cms.title" defaultMessage="CMS" />
          </BreadcrumbItem>
          <BreadcrumbItem active>
            <FormattedMessage id="cms.versioning.title" defaultMessage="Versioning" />
          </BreadcrumbItem>
        </Breadcrumb>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={6}>
        <CMSPageTitle
          titleId="cms.versioning.title"
          helpId="cms.versioning.titletip"
          position="pull-right"
          largeTitle
        />
      </Col>
      <Col xs={12} md={6}>
        <VersioningTypesContainer />
      </Col>
    </Row>
    <Row className="VersioningList__filter">
      <Col xs={9}>
        {/* Inject filtering container here */}
        <Fragment />
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <VersioningListContainer />
      </Col>
    </Row>
  </Grid>
);

export default VersioningListPage;
