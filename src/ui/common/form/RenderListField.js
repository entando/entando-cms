import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Button, ButtonGroup, Col, FormGroup,
} from 'patternfly-react';
import Panel from 'react-bootstrap/lib/Panel';

// TODO: implement a better solution to avoid dependency cycle
// eslint-disable-next-line import/no-cycle
import AttributeField from 'ui/edit-content/content-attributes/AttributeField';

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

    return (
      <div>
        <FormGroup>
          <label className="col-xs-2 text-right control-label">
            <div>{label}</div>
          </label>
          <Col xs={10}>
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
                  <AttributeField
                    name={name}
                    label={index + 1}
                    {...rest}
                  />
                </Panel.Body>
              </Panel>
            ))}
            <Button
              bsStyle="primary"
              title="Add"
              onClick={() => fields.push()}
            >
              <FormattedMessage id="cms.label.add" />
            </Button>
          </Col>
        </FormGroup>
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
  }).isRequired,
  label: PropTypes.node,
};

RenderListField.defaultProps = {
  label: null,
};

export default RenderListField;
