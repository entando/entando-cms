import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Grid, Row, Col, Breadcrumb,
} from 'patternfly-react';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import CMSPageTitle from 'ui/common/CMSPageTitle';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import AddAttributeFormContainer from 'ui/content-type/attributes/AddAttributeFormContainer';
import { ROUTE_CMS_CONTENTTYPE_LIST } from 'app-init/routes';

const AddContentTypeAttributePage = () => (
  <Grid fluid>
    <Row>
      <Col xs={12}>
        <Breadcrumb>
          <BreadcrumbItem active>
            <FormattedMessage id="cms.title" defaultMessage="CMS" />
          </BreadcrumbItem>
          <BreadcrumbItem to={ROUTE_CMS_CONTENTTYPE_LIST}>
            <FormattedMessage id="cms.contenttype.title" defaultMessage="Content Types" />
          </BreadcrumbItem>
          <BreadcrumbItem active>
            <FormattedMessage id="cms.contenttype.editattribute.label" defaultMessage="Edit" />
          </BreadcrumbItem>
        </Breadcrumb>
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <CMSPageTitle
          titleId="cms.contenttype.editattribute.label"
          helpId="cms.contentType.helpattributes.label"
          position="pull-right"
          largeTitle
        />
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <ErrorsAlertContainer />
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <AddAttributeFormContainer />
      </Col>
    </Row>
  </Grid>
);

export default AddContentTypeAttributePage;
