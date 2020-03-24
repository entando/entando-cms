import React from 'react';
import { Link } from 'react-router-dom';
import {
  Row, Col, Grid, Breadcrumb, Button,
} from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import CMSPageTitle from 'ui/common/CMSPageTitle';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import ContentModelSearchFormContainer from 'ui/content-model/ContentModelSearchFormContainer';
import ContentModelListContainer from 'ui/content-model/ContentModelListContainer';
import { ROUTE_CMS_CONTENTMODEL_ADD } from 'app-init/routes';

const ContentModelListPage = () => (
  <Grid fluid>
    <Row>
      <Col xs={12}>
        <Breadcrumb>
          <BreadcrumbItem active>
            <FormattedMessage id="cms.title" defaultMessage="CMS" />
          </BreadcrumbItem>
          <BreadcrumbItem active>
            <FormattedMessage id="cms.contentmodel.title" defaultMessage="Content Templates" />
          </BreadcrumbItem>
        </Breadcrumb>
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <CMSPageTitle
          titleId="cms.contentmodel.title"
          helpId="cms.contentmodel.titletip"
          position="pull-right"
          largeTitle
        />
      </Col>
    </Row>
    <Row className="ContentModelList__filter">
      <Col xs={9}>
        <ContentModelSearchFormContainer />
      </Col>
      <Col xs={1} />
      <Col xs={2}>
        <Link to={ROUTE_CMS_CONTENTMODEL_ADD}>
          <Button bsStyle="primary" className="ContentModelList__addbutton">
            <FormattedMessage id="cms.contentmodel.add.label" defaultMessage="Add Content Template" />
          </Button>
        </Link>
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <ContentModelListContainer />
      </Col>
    </Row>
  </Grid>
);

export default ContentModelListPage;
