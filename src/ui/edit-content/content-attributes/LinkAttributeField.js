import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  fieldInputPropTypes,
  fieldMetaPropTypes,
} from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Col, Button } from 'patternfly-react';
import { Panel } from 'react-bootstrap';

import RenderButton from 'ui/common/form/RenderButton';
import attributeShape from 'ui/edit-content/content-attributes/attributeShape';
import LinkConfigModal from 'ui/common/modal/LinkConfigModal';
import RenderTextInput from 'ui/common/form/RenderTextInput';

class LinkAttributeField extends Component {
  constructor() {
    super();

    this.state = {
      modalVisible: false,
    };

    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
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

  handleSave(values) {
    const { url } = values;
    const destType = {
      U: 1,
      P: 2,
      C: 3,
    }[url[2]];
    const destKey = ['urlDest', 'pageDest', 'contentDest'][destType - 1];
    const dest = url.slice(4, -2);

    const { input } = this.props;
    input.onChange({
      ...input.value,
      value: {
        symbolicDestination: url,
        destType,
        [destKey]: dest,
      },
    });

    this.handleModalClose();
  }

  handleDeleteClick() {
    const { input } = this.props;
    input.onChange({
      value: {},
      values: {
        en: '',
      },
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

    const { value, values } = input.value;
    const { urlDest, pageDest, contentDest } = value;
    const dest = urlDest || pageDest || contentDest;

    const textInput = {
      name: `${input.name}.values.en`,
      value: values.en,
      onChange: (event) => {
        input.onChange({
          ...input.value,
          values: {
            en: event.target.value,
          },
        });
      },
    };

    const { modalVisible } = this.state;

    return (
      <>
        {dest ? (
          <div>
            <label className="control-label col-xs-2">
              {label}
            </label>
            <Col xs={10}>
              <Panel>
                <Panel.Body>
                  <div className="form-group">
                    <Col xs={2} className="text-right">
                      <span style={{ fontWeight: '600' }}>URL</span>
                    </Col>
                    <Col xs={10}>
                      <span>{dest}</span>
                    </Col>
                  </div>
                  <RenderTextInput
                    input={textInput}
                    label="Text"
                  />
                  <div className="text-right">
                    <Button
                      bsStyle="default"
                      style={{ marginRight: '10px' }}
                      onClick={this.handleAddClick}
                    >
                      <FormattedMessage id="cms.label.edit" />
                    </Button>
                    <Button
                      bsStyle="danger"
                      onClick={this.handleDeleteClick}
                    >
                      <FormattedMessage id="cms.label.delete" />
                    </Button>
                  </div>
                </Panel.Body>
              </Panel>
            </Col>
          </div>
        ) : (
          <RenderButton
            bsStyle="primary"
            buttonContent={<FormattedMessage id="cms.label.add" defaultMessage="Add" />}
            label={label}
            meta={meta}
            onClick={this.handleAddClick}
            {...rest}
          />
        )}
        <LinkConfigModal
          isVisible={modalVisible}
          onClose={this.handleModalClose}
          onSave={this.handleSave}
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
