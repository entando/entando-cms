import React from 'react';
import {
  Row,
  Col,
  CardGrid,
  Breadcrumb,
} from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import PageTitle from 'ui/common/PageTitle';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import AddContentModelFormContainer from 'ui/content-model/AddContentModelFormContainer';

const AddContentModelPage = () => (
  <CardGrid>
    <Row>
      <Col xs={12}>
        <Breadcrumb>
          <BreadcrumbItem active>
            <FormattedMessage id="cms.title" defaultMessage="CMS" />
          </BreadcrumbItem>
          <BreadcrumbItem to="/cms/content-models">
            <FormattedMessage id="cms.contentmodel.title" defaultMessage="Content Models" />
          </BreadcrumbItem>
          <BreadcrumbItem active>
            <FormattedMessage id="cms.contentmodel.add.label" defaultMessage="Add" />
          </BreadcrumbItem>
        </Breadcrumb>
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <PageTitle titleId="cms.contentmodel.add.label" helpId="cms.contentmodel.titletip" />
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <AddContentModelFormContainer />
      </Col>
    </Row>
  </CardGrid>
);

export default AddContentModelPage;
