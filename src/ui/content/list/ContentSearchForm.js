import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { formattedText } from '@entando/utils';
import { Row, Col, FormGroup, Button } from 'patternfly-react';
import RenderSearchFormInput from 'ui/common/form/RenderSearchFormInput';



export const ContentSearchFormBody = (props) => {
  const { handleSubmit } = props;
  const onSubmit = (ev) => {
    ev.preventDefault();
    handleSubmit();
  };
  return (

    <form onSubmit={onSubmit} className="ContentSearchForm well">

        <Row>
          <Col md={3}>
            <label className="control-label" htmlFor="pagecode">
                Name
            </label>
          </Col>
          <Col md={9}>
            <Field
                name="keyword"
                component={RenderSearchFormInput}
                placeholder={'Search'}
            />
          </Col>
        </Row>
      <FormGroup>
        <Row>
          <Col xs={11}>
            <Button
              type="submit"
              bsStyle="primary"
              className="pull-right ContentSearchForm__save"
            >
              <FormattedMessage id="app.search" />
            </Button>
          </Col>
        </Row>
      </FormGroup>
    </form>


  );
};

ContentSearchFormBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const ContentSearchForm = reduxForm({
  form: 'contentSearch',
})(ContentSearchFormBody);

export default ContentSearchForm;