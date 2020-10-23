import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Button, ButtonGroup, Col, FormGroup,
} from 'patternfly-react';
import { FieldArray } from 'redux-form';
import Panel from 'react-bootstrap/lib/Panel';

import ContentFormFieldCollapse from 'ui/common/content/ContentFormFieldCollapse';
import AttributeField from 'ui/edit-content/content-attributes/AttributeField';
import { getAttrInitialValue } from 'helpers/attrUtils';
import { TYPE_COMPOSITE } from 'state/content-type/const';
import FormLabel from 'ui/common/form/FormLabel';
import CompositeAttributeField from 'ui/edit-content/content-attributes/CompositeAttributeField';

class RenderListField extends Component {
  buttonMoveUp(index) {
    const {
      fields,
    } = this.props;
    if ((index) > 0) {
      return (
        <Button
          className="pull-right"
          bsStyle="default"
          title={`Move up ${index + 1}`}
          onClick={() => fields.swap(index, index - 1)}
        >
          <i className="fa fa-sort-asc" />
        </Button>
      );
    }
    return null;
  }

  buttonMoveDown(index, arraySize) {
    const {
      fields,
    } = this.props;
    if ((index) < arraySize - 1) {
      return (
        <Button
          className="pull-right"
          bsStyle="default"
          title={`Move down ${index + 1}`}
          onClick={() => fields.swap(index, index + 1)}
        >
          <i className="fa fa-sort-desc" />
        </Button>
      );
    }
    return null;
  }

  render() {
    const {
      fields, label, ...rest
    } = this.props;
    const renderCompositeAttributeField = (name) => {
      const {
        code, mandatory, listFilter, indexable, name: attName,
      } = rest.attribute;
      const helpTextArr = [];
      if (listFilter) helpTextArr.push('Can be used as a filter in lists');
      if (indexable) helpTextArr.push('Searchable');
      const helpText = helpTextArr.join('<br>');
      const fieldLabel = (
        <FormLabel
          labelText={attName || code}
          required={mandatory}
          helpText={helpText}
        />
      );
      return (
        <FieldArray
          key={rest.attribute.code}
          name={`${name}.compositeelements`}
          attribute={rest.attribute}
          component={CompositeAttributeField}
          label={fieldLabel}
          {...rest}
        />
      );
    };
    return (
      <div>
        <ContentFormFieldCollapse label={label}>
          <div className="RenderListField__body">
            <FormGroup>
              <label className="col-xs-2 control-label">
                Add {label}
              </label>
              <Col xs={10} className="text-right">
                <Button
                  bsStyle="primary"
                  title="Add"
                  onClick={() => fields.push(getAttrInitialValue(rest.attribute))}
                >
                  <FormattedMessage id="cms.label.add" />
                </Button>
              </Col>
            </FormGroup>
            {fields.map((name, index) => (
              <Panel key={name}>
                <Panel.Heading>
                  <b>{index + 1}</b>
                  <div className="pull-right">
                    <ButtonGroup>
                      {this.buttonMoveUp(index)}
                      {this.buttonMoveDown(index, fields.length)}
                    </ButtonGroup>

                    <Button
                      bsStyle="danger"
                      title={`Delete ${index + 1}`}
                      onClick={() => fields.remove(index)}
                    >
                      <FormattedMessage id="cms.label.delete" />
                    </Button>
                  </div>
                </Panel.Heading>
                <Panel.Body>
                  {
                    (rest.attribute && rest.attribute.type === TYPE_COMPOSITE) ? (
                      renderCompositeAttributeField(name)
                    ) : (
                      <AttributeField
                        name={name}
                        label={index + 1}
                        isSub
                        {...rest}
                        hasLabel={false}
                      />
                    )
                  }
                </Panel.Body>
              </Panel>
            ))}
          </div>
        </ContentFormFieldCollapse>
      </div>
    );
  }
}

RenderListField.propTypes = {
  fields: PropTypes.shape({
    push: PropTypes.func,
    map: PropTypes.func,
    remove: PropTypes.func,
    length: PropTypes.number,
    swap: PropTypes.func,
  }).isRequired,
  label: PropTypes.node,
};

RenderListField.defaultProps = {
  label: null,
};

export default RenderListField;
