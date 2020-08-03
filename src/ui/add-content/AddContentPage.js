import React from 'react';
import {
  Row, Col, Grid, Breadcrumb,
} from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import CMSPageTitle from 'ui/common/CMSPageTitle';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import AddContentFormContainer from 'ui/add-content/AddContentFormContainer';

const AddContentPage = () => (
  <Grid fluid>
    <Row>
      <Col xs={12}>
        <Breadcrumb>
          <BreadcrumbItem active>
            <FormattedMessage id="cms.title" defaultMessage="CMS" />
          </BreadcrumbItem>
          <BreadcrumbItem to="/cms/contents">
            <FormattedMessage id="cms.menu.contents" defaultMessage="Contents" />
          </BreadcrumbItem>
          <BreadcrumbItem active>
            <FormattedMessage id="cms.contents.add.title" defaultMessage="Add" />
          </BreadcrumbItem>
        </Breadcrumb>
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <CMSPageTitle
          titleId="cms.contents.add.title"
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
        <AddContentFormContainer />
      </Col>
    </Row>
  </Grid>
);

export default AddContentPage;
