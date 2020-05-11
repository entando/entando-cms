import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'patternfly-react';
import { Panel } from 'react-bootstrap';
import {
  fieldArrayFieldsPropTypes,
} from 'redux-form';

import attributeShape from './attributeShape';
import AttributeField from './AttributeField';

const CompositeAttributeField = ({
  fields,
  attribute,
  label,
}) => {
  const { code, compositeAttributes } = attribute;
  return (
    <Row key={code}>
      <label className="control-label col-xs-2">
        {label}
      </label>
      <Col xs={10}>
        <Panel>
          <Panel.Body>
            {fields.map((name, idx) => (
              <AttributeField
                key={compositeAttributes[idx].code}
                name={name}
                attribute={compositeAttributes[idx]}
              />
            ))}
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
