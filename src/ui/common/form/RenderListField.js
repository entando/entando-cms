import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button, Col, FormGroup } from 'patternfly-react';
import { FieldArray } from 'redux-form';

import ContentFormFieldCollapse from 'ui/common/content/ContentFormFieldCollapse';
import RenderListFieldItem from 'ui/common/form/RenderListFieldItem';
import AttributeField from 'ui/edit-content/content-attributes/AttributeField';
import { getAttrInitialValue } from 'helpers/attrUtils';
import { TYPE_COMPOSITE } from 'state/content-type/const';
import FormLabel from 'ui/common/form/FormLabel';
import CompositeAttributeField from 'ui/edit-content/content-attributes/CompositeAttributeField';

class RenderListField extends Component {
  constructor(props) {
    super(props);
    this.handleSwapItems = this.handleSwapItems.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
  }

  handleSwapItems(index, dir = 1) { // -1 for up, +1 for down
    const { fields } = this.props;
    fields.swap(index, index + dir);
  }

  handleRemoveItem(index) {
    const { fields } = this.props;
    fields.remove(index);
  }

  render() {
    const {
      fields, label, ...rest
    } = this.props;
    const { name: attName } = rest.attribute;
    const renderCompositeAttributeField = (name) => {
      const {
        code, mandatory, listFilter, indexable,
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
          isSub
          {...rest}
        />
      );
    };
    return (
      <div>
        <ContentFormFieldCollapse label={label}>
          <div className="RenderListField__body">
            <FormGroup className={fields.length > 0 && 'RenderListField__topcontrol--has-items'}>
              <label className="col-xs-2" htmlFor={`add${attName}`}>
                <FormattedMessage id="cms.contents.addlist" values={{ listname: label }} />
              </label>
              <Col xs={10} className="text-right">
                <Button
                  id={`add${attName}`}
                  bsStyle="primary"
                  title="Add"
                  onClick={() => fields.push(getAttrInitialValue(rest.attribute))}
                >
                  <FormattedMessage id="cms.label.add" />
                </Button>
              </Col>
            </FormGroup>
            {fields.map((name, index) => (
              <RenderListFieldItem
                key={name}
                order={index}
                arraySize={fields.length}
                onSwapItem={this.handleSwapItems}
                onRemoveItem={this.handleRemoveItem}
              >
                {(rest.attribute && rest.attribute.type === TYPE_COMPOSITE) ? (
                  renderCompositeAttributeField(name)
                ) : (
                  <AttributeField
                    name={name}
                    label={rest.attribute.type}
                    isSub
                    {...rest}
                    hasLabel={false}
                  />
                )}
              </RenderListFieldItem>
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
