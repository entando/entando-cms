import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputGroup, Button, Col } from 'patternfly-react';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
  defineMessages,
} from 'react-intl';

class RoleSelectRenderer extends Component {
  constructor(props) {
    super(props);
    this.pushField = this.pushField.bind(this);
    this.select = null;
  }

  pushField() {
    if (!this.select || !this.select.value) {
      return;
    }
    const {
      selectedValues, fields,
    } = this.props;

    if (this.select.value && !selectedValues.includes(this.select.value)) {
      fields.push(this.select.value);
    }
  }

  render() {
    const {
      options, selectedValues, labelKey, valueKey, emptyOptionTextId, intl, fields,
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
      filteredOptions.unshift((
        <option key={emptyOptionTextId} value="">
          {intl.formatMessage(msgs.emptyOptionText)}
        </option>
      ));
    }

    const renderTags = (
      selectedValues.map((value, i) => (
        <div key={value}>
          <h3><FormattedMessage id="cms.contenttype.labelrole.assigned" /></h3>
          <hr />
          <Col xs={4}>
            <p>
              {options.find(opt => opt[valueKey] === value)[labelKey]}
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
      ))
    );

    return (
      <div className="RoleSelectRenderer">
        <InputGroup>
          <select className="form-control" ref={(select) => { this.select = select; }}>
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
        {renderTags}
      </div>
    );
  }
}


RoleSelectRenderer.propTypes = {
  intl: intlShape.isRequired,
  fields: PropTypes.shape({}).isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedValues: PropTypes.arrayOf(PropTypes.string),
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  emptyOptionTextId: PropTypes.string,
};

RoleSelectRenderer.defaultProps = {
  selectedValues: [],
  valueKey: 'value',
  labelKey: 'label',
  emptyOptionTextId: '',
};

export default injectIntl(RoleSelectRenderer);
