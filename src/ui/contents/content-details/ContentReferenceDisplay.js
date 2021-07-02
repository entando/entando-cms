import React from 'react';
import { Row, Col, Icon } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

const ContentReferenceDisplay = () => (
  <Row>
    <Col xs="12">
      <div className="form-group">
        <Col xs={12} sm={2} className="ContentDetails__label-attribute">
          <FormattedMessage id="cms.contentdetails.label.references" />
        </Col>
        <Col xs={12} sm={9}>
          <dl id="jpcontentinspection_referral_contents">
            <dt>
              <Icon name="file-text-o" /> <FormattedMessage id="cms.contentdetails.label.referenceContent" />
            </dt>
            <dd><FormattedMessage id="cms.contentdetails.label.none" /></dd>
          </dl>
          <dl id="jpcontentinspection_pages">
            <dt>
              <Icon name="folder" /> <FormattedMessage id="cms.contentdetails.label.referencePage" />
            </dt>
            <dd><FormattedMessage id="cms.contentdetails.label.none" /></dd>
          </dl>
        </Col>
      </div>
    </Col>
    <Col xs="12">
      <div className="form-group">
        <Col xs={12} sm={2} className="ContentDetails__label-attribute"><FormattedMessage id="cms.contentdetails.label.externalReferences" /></Col>
        <Col xs={12} sm={9}>
          <dl id="jpcontentinspection_referral_contents">
            <dt><Icon name="file-text-o" /> <FormattedMessage id="cms.contentdetails.label.extReferenceContent" /></dt>
            <dd><FormattedMessage id="cms.contentdetails.label.none" /></dd>
          </dl>
          <dl id="jpcontentinspection_pages">
            <dt><Icon name="folder" /> <FormattedMessage id="cms.contentdetails.label.extReferencePage" /></dt>
            <dd>
              <a href="#" title="Edit: Home / My Homepage / About Us (about_us)">Home / My Homepage / About Us (about_us)</a>
            </dd>
          </dl>
        </Col>
      </div>
    </Col>
  </Row>
);

export default ContentReferenceDisplay;
