import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Row, Col, FormGroup } from 'patternfly-react';
import { FieldArray } from 'redux-form';
import RoleSelectRenderer from 'ui/common/form/RoleSelectRenderer';

class AttributeRole extends Component {
  componentWillMount() {
    const { onWillMount, ...allprops } = this.props;
    onWillMount(allprops);
  }

  render() {
    const { joinAllowedOptions, allowedRoles } = this.props;

    const selectAllowedOptions = allowedRoles.map(item => (
      {
        value: item.code,
        text: item.descr,
      }
    ));

    const roleWrapper = () => {
      if (isEmpty(allowedRoles)) {
        return (
          <FormGroup>
            <Col xs={10}>
              <FormattedMessage id="cms.contenttype.labelrole.noroles" />
            </Col>
          </FormGroup>
        );
      }

      return (
        <FormGroup>
          <label htmlFor="attrRole" className="col-xs-2 control-label">
            <FormattedMessage id="cms.contenttype.form.role" />
          </label>
          <Col xs={10}>
            <FieldArray
              component={RoleSelectRenderer}
              name="joinRoles"
              options={selectAllowedOptions}
              selectedValues={joinAllowedOptions}
              labelKey="text"
              valueKey="value"
              emptyOptionTextId="cms.contenttype.labelrole.choose"
            />
          </Col>
        </FormGroup>
      );
    };

    return (
      <Row>
        <Col xs={12}>
          <fieldset className="no-padding">
            <legend>
              <FormattedMessage id="cms.contenttype.form.roles" />
            </legend>
            {roleWrapper()}
          </fieldset>
        </Col>
      </Row>
    );
  }
}

AttributeRole.propTypes = {
  onWillMount: PropTypes.func,
  allowedRoles: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    descr: PropTypes.string,
  })),
  joinAllowedOptions: PropTypes.arrayOf(PropTypes.string),
};

AttributeRole.defaultProps = {
  onWillMount: () => {},
  allowedRoles: [],
  joinAllowedOptions: [],
};


export default AttributeRole;
