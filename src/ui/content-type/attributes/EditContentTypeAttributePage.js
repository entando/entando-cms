import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  CardGrid, Row, Col, Breadcrumb,
} from 'patternfly-react';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import PageTitle from 'ui/common/PageTitle';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import EditAttributeFormContainer from 'ui/content-type/attributes/EditAttributeFormContainer';
import { ROUTE_CMS_CONTENTTYPE_LIST } from 'app-init/routes';

const EditContentTypeAttributePage = () => (
  <CardGrid>
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
            <FormattedMessage id="cms.contenttype.edit.label" />
          </BreadcrumbItem>
        </Breadcrumb>
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <PageTitle titleId="cms.contenttype.attribute.edit.title" />
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <ErrorsAlertContainer />
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <EditAttributeFormContainer />
      </Col>
    </Row>
  </CardGrid>
);

export default EditContentTypeAttributePage;
