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
import CMSShell from 'ui/common/CMSShell';
import PageTitle from 'ui/common/PageTitle';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import ContentModelSearchForm from 'ui/content-model/ContentModelSearchForm';
import ContentModelList from 'ui/content-model/ContentModelList';

const ContentModelListPage = () => (
  <CMSShell>
    <CardGrid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem active>
              <FormattedMessage id="cms.title" defaultMessage="CMS" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="cms.contentmodel.title" defaultMessage="Content Models" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          <PageTitle titleId="cms.contentmodel.title" helpId="cms.contentmodel.titletip" />
        </Col>
      </Row>
      <Row className="ContentModelList__filter">
        <Col xs={9}>
          <ContentModelSearchForm />
        </Col>
        <Col xs={1} />
        <Col xs={2}>
          <Link to="/cms/content-models/add">
            <Button className="ContentModelList__addbutton">
              <FormattedMessage id="cms.contentmodel.add.label" defaultMessage="Add Content Model" />
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ContentModelList />
        </Col>
      </Row>
    </CardGrid>
  </CMSShell>
);

export default ContentModelListPage;
