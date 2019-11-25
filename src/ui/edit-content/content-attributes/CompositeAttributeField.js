import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'patternfly-react';
import { Panel } from 'react-bootstrap';
import {
  FormSection,
  fieldArrayFieldsPropTypes,
} from 'redux-form';

import { TYPE_TIMESTAMP } from 'state/content-type/const';
import attributeShape from './attributeShape';
import AttributeField from './AttributeField';

const CompositeAttributeField = ({
  fields,
  attribute,
  label,
}) => {
  const { code, compositeAttributes } = attribute;

  if (fields.length < compositeAttributes.length) {
    // initialize fields with values from compositeAttributes prop through `.push()` method
    // as it cannot be set directly from props
    compositeAttributes.forEach((attr) => {
      const {
        value, elements, compositeelements, type,
      } = attr;
      fields.push(
        (type === TYPE_TIMESTAMP && {})
        || (elements && { elements })
        || (compositeelements && { compositeelements })
        || value,
      );
    });
  }

  return (
    <Row key={code}>
      <label className="control-label col-xs-2">
        {label}
      </label>
      <Col xs={10}>
        <Panel>
          <Panel.Body>
            <FormSection name={attribute.code}>
              {fields.map((name, idx) => (
                <AttributeField
                  key={compositeAttributes[idx].code}
                  name={name}
                  attribute={compositeAttributes[idx]}
                />
              ))}
            </FormSection>
          </Panel.Body>
        </Panel>
      </Col>
    </Row>
  );
};

CompositeAttributeField.propTypes = {
  fields: PropTypes.shape(fieldArrayFieldsPropTypes).isRequired,
  attribute: PropTypes.shape(attributeShape).isRequired,
  label: PropTypes.node.isRequired,
};

export default CompositeAttributeField;
