import React from 'react';
import {
  Row, Col, Grid, Breadcrumb,
} from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import CMSPageTitle from 'ui/common/CMSPageTitle';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import AddContentModelFormContainer from 'ui/content-model/AddContentModelFormContainer';

const AddContentModelPage = () => (
  <Grid fluid>
    <Row>
      <Col xs={12}>
        <Breadcrumb>
          <BreadcrumbItem active>
            <FormattedMessage id="cms.title" defaultMessage="CMS" />
          </BreadcrumbItem>
          <BreadcrumbItem to="/cms/content-models">
            <FormattedMessage id="cms.contentmodel.title" defaultMessage="Content Templates" />
          </BreadcrumbItem>
          <BreadcrumbItem active>
            <FormattedMessage id="cms.contentmodel.add.label" defaultMessage="Add" />
          </BreadcrumbItem>
        </Breadcrumb>
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <CMSPageTitle
          titleId="cms.contentmodel.add.label"
          helpId="cms.contentmodel.titletip"
          position="pull-right"
          largeTitle
        />
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <AddContentModelFormContainer />
      </Col>
    </Row>
  </Grid>
);

export default AddContentModelPage;
