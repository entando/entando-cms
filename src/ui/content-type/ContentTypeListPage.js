import React from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  CardGrid,
  Breadcrumb,
  Button,
} from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import PageTitle from 'ui/common/PageTitle';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import ContentTypeListContainer from 'ui/content-type/ContentTypeListContainer';
import { ROUTE_CMS_CONTENTTYPE_ADD } from 'app-init/routes';

const ContentTypeListPage = () => (
  <CardGrid>
    <Row>
      <Col xs={12}>
        <Breadcrumb>
          <BreadcrumbItem active>
            <FormattedMessage id="cms.title" defaultMessage="CMS" />
          </BreadcrumbItem>
          <BreadcrumbItem active>
            <FormattedMessage id="cms.contenttype.title" defaultMessage="Content Types" />
          </BreadcrumbItem>
        </Breadcrumb>
      </Col>
    </Row>
    <Row>
      <Col xs={4}>
        <PageTitle titleId="cms.contenttype.title" helpId="cms.contenttype.titletip" />
      </Col>
    </Row>
    <Row className="ContentTypeList__filter">
      <Col xs={10} />
      <Col xs={2}>
        <Link to={ROUTE_CMS_CONTENTTYPE_ADD}>
          <Button className="ContentTypeList__addbutton">
            <FormattedMessage id="cms.contenttype.add.label" defaultMessage="Add" />
          </Button>
        </Link>
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <ContentTypeListContainer />
      </Col>
    </Row>
  </CardGrid>
);

export default ContentTypeListPage;
