import React from 'react';
import {
  Row, Col, CardGrid, Breadcrumb,
} from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import PageTitle from 'ui/common/PageTitle';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import ContentsContainer from 'ui/contents/ContentsContainer';

const ContentsPage = () => (
  <CardGrid>
    <Row>
      <Col xs={12}>
        <Breadcrumb>
          <BreadcrumbItem active>
            <FormattedMessage id="cms.title" defaultMessage="CMS" />
          </BreadcrumbItem>
          <BreadcrumbItem active>
            <FormattedMessage id="cms.contents.title" defaultMessage="Contents" />
          </BreadcrumbItem>
        </Breadcrumb>
      </Col>
    </Row>
    <Row>
      <Col xs={4}>
        <PageTitle titleId="cms.contents.title" helpId="cms.contents.tip" />
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <ContentsContainer />
      </Col>
    </Row>
  </CardGrid>
);

export default ContentsPage;
