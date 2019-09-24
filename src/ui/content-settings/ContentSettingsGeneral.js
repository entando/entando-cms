import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Row,
  Col,
  Button,
} from 'patternfly-react';

class ContentSettingsGeneral extends Component {
  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  render() {
    return (
      <div className="form-group">
        <Row>
          <Col xs={12} sm={2} className="text-right">
            <FormattedMessage id="cms.contentsettings.label.reloadreferences" default="Reload references" />
          </Col>
          <Col xs={12} sm={10}>
            <Button bsStyle="primary">
              <FormattedMessage id="cms.contentsettings.label.reloadreferences" default="Reload references" />
            </Button>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12} sm={2} className="text-right">
            <FormattedMessage id="cms.contentsettings.label.reloadindexes" default="Reload indexes" />
          </Col>
          <Col xs={12} sm={10}>
            <Button bsStyle="primary">
              <FormattedMessage id="cms.contentsettings.label.reloadindexes" default="Reload indexes" />
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

ContentSettingsGeneral.propTypes = {
  onDidMount: PropTypes.func.isRequired,
};

export default ContentSettingsGeneral;
