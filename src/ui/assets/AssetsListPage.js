import React from 'react';
import { Row, Col, CardGrid, Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import PageTitle from 'ui/common/PageTitle';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import AssetsListContainer from 'ui/assets/AssetsListContainer';

const ContentModelListPage = () => (
  <CardGrid>
    <Row>
      <Col xs={12}>
        <Breadcrumb>
          <BreadcrumbItem active>
            <FormattedMessage id="cms.title" defaultMessage="CMS" />
          </BreadcrumbItem>
          <BreadcrumbItem active>
            <FormattedMessage id="cms.assets.title" defaultMessage="Digital Assets" />
          </BreadcrumbItem>
        </Breadcrumb>
      </Col>
    </Row>
    <Row>
      <Col xs={4}>
        <PageTitle titleId="cms.assets.title" helpId="cms.assets.tip" />
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <AssetsListContainer />
      </Col>
    </Row>
  </CardGrid>
);

export default ContentModelListPage;
