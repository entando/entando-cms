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

    return (
      <Form inline>
        <FormGroup>
          <FormControl
            data-test-id="content-settings-crop-ratio-input-field"
            type="text"
            value={value}
            onChange={this.handleInputChange}
          />
        </FormGroup>
        {isNew ? (
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
        )}
      </Form>
    );
  }
}

ContentSettingsCropRatioInput.propTypes = propTypes;
ContentSettingsCropRatioInput.defaultProps = defaultProps;

export default ContentSettingsCropRatioInput;
