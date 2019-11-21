import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'patternfly-react';
import { Panel } from 'react-bootstrap';
import { FormSection } from 'redux-form';

import attributeShape from './attributeShape';

import AttributeField from './AttributeField';

const CompositeAttributeField = ({
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
            <FormSection name={attribute.code}>
              {compositeAttributes.map(attr => (
                <AttributeField
                  key={attr.code}
                  name={attr.code}
                  attribute={attr}
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
  attribute: PropTypes.shape(attributeShape).isRequired,
  label: PropTypes.node.isRequired,
};

export default CompositeAttributeField;
