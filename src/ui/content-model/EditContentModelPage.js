import React from 'react';
import {
  Row, Col, CardGrid, Breadcrumb,
} from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import PageTitle from 'ui/common/PageTitle';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import EditContentModelFormContainer from 'ui/content-model/EditContentModelFormContainer';

const EditContentModelPage = () => (
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
            <FormattedMessage id="cms.contentmodel.edit.label" defaultMessage="Edit" />
          </BreadcrumbItem>
        </Breadcrumb>
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <PageTitle titleId="cms.label.edit" helpId="cms.contentmodel.titletip" />
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <EditContentModelFormContainer />
      </Col>
    </Row>
  </CardGrid>
);

export default EditContentModelPage;
