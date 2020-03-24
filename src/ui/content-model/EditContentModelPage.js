import React from 'react';
import {
  Row, Col, Grid, Breadcrumb,
} from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import CMSPageTitle from 'ui/common/CMSPageTitle';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import EditContentModelFormContainer from 'ui/content-model/EditContentModelFormContainer';

const EditContentModelPage = () => (
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
            <FormattedMessage id="cms.contentmodel.edit.label" defaultMessage="Edit" />
          </BreadcrumbItem>
        </Breadcrumb>
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <CMSPageTitle
          titleId="cms.label.edit"
          helpId="cms.contentmodel.titletip"
          position="pull-right"
          largeTitle
        />
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <EditContentModelFormContainer />
      </Col>
    </Row>
  </Grid>
);

export default EditContentModelPage;
