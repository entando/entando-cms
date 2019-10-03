import React from 'react';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'patternfly-react';
import FormLabel from 'ui/common/form/FormLabel';
import RenderDatePickerInput from 'ui/common/form/RenderDatePickerInput';

const AttributesDateSettings = () => (
  <Row>
    <Col xs={12}>
      <fieldset className="no-padding">
        <legend>
          <FormattedMessage id="cms.label.settings" />
        </legend>
        <Field
          component={RenderDatePickerInput}
          name="rangeStartDate"
          dateFormat="DD/MM/YYYY"
          label={
            <FormLabel labelId="cms.label.from" />
          }
        />
        <Col xs={10} xsOffset={2}>
          <div className="AttributesDateSettings__placeholder">
            <FormattedMessage id="cms.label.date.placeholder" />
          </div>
        </Col>
        <Field
          component={RenderDatePickerInput}
          name="rangeEndDate"
          dateFormat="DD/MM/YYYY"
          label={
            <FormLabel labelId="cms.label.to" />
          }
        />
        <Col xs={10} xsOffset={2}>
          <div className="AttributesDateSettings__placeholder">
            <FormattedMessage id="cms.label.date.placeholder" />
          </div>
        </Col>
        <Field
          component={RenderDatePickerInput}
          name="equalDate"
          dateFormat="DD/MM/YYYY"
          label={
            <FormLabel labelId="cms.label.equal" />
          }
        />
        <Col xs={10} xsOffset={2}>
          <div className="AttributesDateSettings__placeholder">
            <FormattedMessage id="cms.label.date.placeholder" />
          </div>
        </Col>
      </fieldset>
    </Col>
  </Row>
);

export default AttributesDateSettings;
