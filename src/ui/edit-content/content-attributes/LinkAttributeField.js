import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  fieldInputPropTypes,
  fieldMetaPropTypes,
} from 'redux-form';
import { FormattedMessage } from 'react-intl';

import RenderButton from 'ui/common/form/RenderButton';
import attributeShape from 'ui/edit-content/content-attributes/attributeShape';
import LinkConfigModal from 'ui/common/modal/LinkConfigModal';

class LinkAttributeField extends Component {
  constructor() {
    super();

    this.state = {
      modalVisible: false,
    };

    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleAddClick() {
    this.setState({
      modalVisible: true,
    });
  }

  handleModalClose() {
    this.setState({
      modalVisible: false,
    });
  }

  render() {
    const {
      input,
      label,
      meta,
      attribute,
      ...rest
    } = this.props;

    const { modalVisible } = this.state;

    return (
      <>
        <RenderButton
          bsStyle="primary"
          buttonContent={<FormattedMessage id="cms.label.add" defaultMessage="Add" />}
          label={label}
          meta={meta}
          onClick={this.handleAddClick}
          {...rest}
        />
        <LinkConfigModal
          isVisible={modalVisible}
          onClose={this.handleModalClose}
        />
      </>
    );
  }
}

LinkAttributeField.propTypes = {
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  label: PropTypes.node.isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
  attribute: PropTypes.shape(attributeShape).isRequired,
};

export default LinkAttributeField;
