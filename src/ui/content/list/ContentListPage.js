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
import ContentListContainer from 'ui/content/list/ContentListContainer';

import ContentSearchForm from 'ui/content/list/ContentSearchForm';

const ContentListPage = () => (
  <CMSShell>
    <CardGrid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem active>
              <FormattedMessage id="cms.title" defaultMessage="CMS" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="cms.contentList.title" defaultMessage="Content List" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          <PageTitle titleId="cms.contentList.title" helpId="cms.contentList.titletip" />
        </Col>
      </Row>
      <ContentSearchForm />
      <Row className="ContentList__filter">
        <Col xs={1} />
        <Col xs={2}>
          <Link to="/cms/content/add">
            <Button className="Content__addbutton">
              <FormattedMessage id="cms.contentList.add.label" defaultMessage="Add Content" />
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ContentListContainer />
        </Col>
      </Row>
    </CardGrid>
  </CMSShell>
);

export default ContentListPage;
