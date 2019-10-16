import React from 'react';
import { FormattedMessage } from 'react-intl';
import { CardGrid, Row, Col, Breadcrumb } from 'patternfly-react';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import PageTitle from 'ui/common/PageTitle';
import EditContentTypeFormContainer from 'ui/content-type/EditContentTypeFormContainer';
import { ROUTE_CMS_CONTENTTYPE_LIST } from 'app-init/routes';

const EditContentTypePage = () => (
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
        <PageTitle titleId="cms.contenttype.edit.label" helpId="cms.contenttype.titletip" />
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <EditContentTypeFormContainer />
      </Col>
    </Row>
  </CardGrid>
);

export default EditContentTypePage;
