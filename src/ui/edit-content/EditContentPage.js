import React from 'react';
import { Row, Col, CardGrid, Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import CMSShell from 'ui/common/CMSShell';
import PageTitle from 'ui/common/PageTitle';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import EditContentFormContainer from 'ui/edit-content/EditContentFormContainer';

const EditContentPage = () => (
  <CMSShell>
    <CardGrid>
      <Row>
        <Col>
          <Breadcrumb>
            <BreadcrumbItem active>
              <FormattedMessage id="cms.title" defaultMessage="CMS" />
            </BreadcrumbItem>
            <BreadcrumbItem to="/cms/contents">
              <FormattedMessage id="cms.contents.title" defaultMessage="Contents" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="cms.contents.edit.title" defaultMessage="Edit" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col>
          <PageTitle
            titleId="cms.contents.edit.title"
            helpId="cms.contents.edit.titletip"
            position="pull-right"
            noHeaderMargin
            largeTitle
          />
          <div className="FormGroupSeparator" />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <EditContentFormContainer />
        </Col>
      </Row>
    </CardGrid>
  </CMSShell>
);

export default EditContentPage;
