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
  langCode,
}) => {
  const { code, compositeAttributes } = attribute;
  const mappedAttributeInfos = compositeAttributes.reduce(
    (acc, curr) => {
      const { code } = curr;
      return {
        ...acc,
        [code]: curr,
      };
    }, {},
  );
  return (
    <Row key={code}>
      <label className="control-label col-xs-2">
        {label}
      </label>
      <Col xs={10}>
        <Panel>
          <Panel.Body>
            {fields.map((name, idx) => {
              const field = fields.get(idx);
              const { code } = field;
              return (
                <AttributeField
                  key={code}
                  name={name}
                  attribute={mappedAttributeInfos[code]}
                  langCode={langCode}
                />
              );
            })}
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
  langCode: PropTypes.string.isRequired,
};

export default CompositeAttributeField;
