import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputGroup, Button, Col } from 'patternfly-react';
import {
  FormattedMessage, injectIntl, intlShape, defineMessages,
} from 'react-intl';

class RoleSelectRenderer extends Component {
  constructor(props) {
    super(props);
    this.pushField = this.pushField.bind(this);
    this.select = null;
  }

  getLabel(role) {
    const { labelFn, labelKey } = this.props;
    return labelFn ? labelFn(role) : role[labelKey];
  }

  pushField() {
    if (!this.select || !this.select.value) {
      return;
    }
    const { selectedValues, fields } = this.props;

    if (this.select.value && !selectedValues.includes(this.select.value)) {
      fields.push(this.select.value);
    }
  }

  render() {
    const {
      options,
      allRoles,
      selectedValues,
      labelKey,
      valueKey,
      emptyOptionTextId,
      intl,
      fields,
    } = this.props;

    const filteredOptions = options
      .filter(opt => !selectedValues.includes(opt[valueKey]))
      .map(item => (
        <option key={`opt-${item[valueKey]}`} value={item[valueKey]}>
          {item[valueKey]} - {item[labelKey]}
        </option>
      ));

    if (emptyOptionTextId) {
      const msgs = defineMessages({
        emptyOptionText: {
          id: emptyOptionTextId,
          defaultMessage: 'Unknown',
        },
      });
      filteredOptions.unshift(
        <option key={emptyOptionTextId} value="">
          {intl.formatMessage(msgs.emptyOptionText)}
        </option>,
      );
    }

    const renderTags = allRoles && allRoles.length ? selectedValues.map((value, i) => (
      <div key={value} className="clearfix">
        { i === 0 && <h3><FormattedMessage id="cms.contenttype.labelrole.assigned" /></h3>}
        <hr />
        <Col xs={4}>
          <p>
            {this.getLabel(allRoles.find(opt => opt[valueKey] === value))}
          </p>
        </Col>
        <Col xs={8}>
          <Button
            bsStyle="danger"
            className="btn btn-danger RoleSelectRenderer__remove--btn"
            onClick={() => fields.remove(i)}
          >
            <FormattedMessage id="cms.label.delete" />
          </Button>
        </Col>
      </div>
    )) : [];

    return (
      <div className="RoleSelectRenderer">
        {filteredOptions.length && (
          <>
            <InputGroup>
              <select
                className="form-control"
                ref={(select) => {
                  this.select = select;
                }}
              >
                {filteredOptions}
              </select>
              <span className="input-group-btn">
                <Button
                  className="RoleSelectRenderer__add-btn"
                  bsStyle="primary"
                  onClick={this.pushField}
                >
                  <FormattedMessage id="cms.label.add" />
                </Button>
              </span>
            </InputGroup>
            <br />
          </>
        )}
        {renderTags}
      </div>
    );
  }
}

RoleSelectRenderer.propTypes = {
  intl: intlShape.isRequired,
  fields: PropTypes.shape({
    push: PropTypes.func,
    remove: PropTypes.func,
  }).isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  allRoles: PropTypes.arrayOf(PropTypes.shape({})),
  selectedValues: PropTypes.arrayOf(PropTypes.string),
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  emptyOptionTextId: PropTypes.string,
  labelFn: PropTypes.func,
};

RoleSelectRenderer.defaultProps = {
  selectedValues: [],
  allRoles: [],
  valueKey: 'value',
  labelKey: 'label',
  emptyOptionTextId: '',
  labelFn: null,
};

export default injectIntl(RoleSelectRenderer);
