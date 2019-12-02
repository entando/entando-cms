import React from 'react';
import {
  Row, Col, Grid, Breadcrumb,
} from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import CMSPageTitle from 'ui/common/CMSPageTitle';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import AssetsListContainer from 'ui/assets/AssetsListContainer';
import EditAssetFormModalContainer from 'ui/assets/EditAssetFormModalContainer';
import DeleteAssetModalContainer from 'ui/assets/DeleteAssetModalContainer';

const AssetsListPage = () => (
  <Grid fluid>
    <Row>
      <Col xs={12}>
        <Breadcrumb>
          <BreadcrumbItem active>
            <FormattedMessage id="cms.title" defaultMessage="CMS" />
          </BreadcrumbItem>
          <BreadcrumbItem active>
            <FormattedMessage id="cms.assets.title" defaultMessage="Digital Assets" />
          </BreadcrumbItem>
        </Breadcrumb>
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <CMSPageTitle
          titleId="cms.assets.title"
          helpId="cms.assets.tip"
          position="pull-right"
          largeTitle
        />
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <AssetsListContainer />
      </Col>
    </Row>
    <EditAssetFormModalContainer />
    <DeleteAssetModalContainer />
  </Grid>
);

export default AssetsListPage;
