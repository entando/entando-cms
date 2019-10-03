import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  CardGrid,
  Row,
  Col,
  Breadcrumb,
} from 'patternfly-react';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import CMSShell from 'ui/common/CMSShell';
import PageTitle from 'ui/common/PageTitle';
import AddContentTypeFormContainer from 'ui/content-type/AddContentTypeFormContainer';
import { ROUTE_CMS_CONTENTTYPE_LIST } from 'app-init/routes';


const AddContentTypePage = () => (
  <CMSShell className="AddContentTypePage">
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
              <FormattedMessage id="cms.contenttype.add.label" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <PageTitle
            titleId="cms.contenttype.add.label"
            helpId="cms.contenttype.titletip"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <AddContentTypeFormContainer />
        </Col>
      </Row>
    </CardGrid>
  </CMSShell>
);

export default AddContentTypePage;
