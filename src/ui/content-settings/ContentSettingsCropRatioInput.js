import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormGroup,
  FormControl,
  Button,
  Icon,
} from 'patternfly-react';

const propTypes = {
  value: PropTypes.string,
  isNew: PropTypes.bool,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
};

const defaultProps = {
  value: '',
  isNew: false,
  onAdd: () => {},
  onDelete: () => {},
};

class ContentSettingsCropRatioInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  getValidationState() {
    const { isNew } = this.props;
    const { value } = this.state;
    if (isNew && value.length > 0) {
      const isRatio = /^\d+[:]\d+$/.test(value);
      if (isRatio) return 'success';
      return 'error';
    }

    return null;
  }

  handleInputChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  handleAddClick() {
    const { onAdd } = this.props;
    const { value } = this.state;
    onAdd(value);
  }

  handleDeleteClick() {
    const { onDelete } = this.props;
    onDelete();
  }

  render() {
    const { isNew } = this.props;
    const { value } = this.state;

    const renderedBtn = isNew ? (
      <Button
        data-test-id="content-settings-crop-ratio-input-add"
        bsStyle="primary"
        onClick={this.handleAddClick}
      >
        Add
      </Button>
    ) : (
      <Button
        data-test-id="content-settings-crop-ratio-input-delete"
        bsStyle="danger"
        onClick={this.handleDeleteClick}
      >
        <Icon type="pf" name="delete" />
      </Button>
    );

    return (
      <Form inline>
        <FormGroup
          className="ContentSettingsCropRatioInput__form-group"
          validationState={this.getValidationState()}
        >
          <FormControl
            data-test-id="content-settings-crop-ratio-input-field"
            type="text"
            value={value}
            onChange={this.handleInputChange}
          />
        </FormGroup>
        {renderedBtn}
      </Form>
    );
  }
}

ContentSettingsCropRatioInput.propTypes = propTypes;
ContentSettingsCropRatioInput.defaultProps = defaultProps;

export default ContentSettingsCropRatioInput;
