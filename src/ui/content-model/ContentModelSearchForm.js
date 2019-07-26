import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Grid,
  Button,
  DropdownButton,
  MenuItem,
  Label,
  Icon,
} from 'patternfly-react';
import { Field, reduxForm } from 'redux-form';
import {
  defineMessages,
  injectIntl,
  intlShape,
  FormattedMessage,
} from 'react-intl';
import RenderSearchFormInput from 'ui/common/form/RenderSearchFormInput';

class ContentModelSearchFormBody extends Component {
  constructor(props) {
    super(props);
    this.clearSearch = this.clearSearch.bind(this);
    this.messages = defineMessages({
      searchPlaceholder: {
        id: 'cms.contentmodel.searchPlaceholder',
        defaultMessage: 'Search Content Model',
      },
      valueName: {
        id: 'cms.contentmodel.searchFilter.valueName',
        defaultMessage: 'Name',
      }
    });
  }

  clearSearch() {
    const { reset, submit, searchTerm } = this.props;
    reset();
    if (searchTerm !== '') setTimeout(submit, 10);
  }

  render() {
    const { intl, handleSubmit } = this.props;
    return (
      <form className="ContentModelList__searchform" onSubmit={handleSubmit}>
        <Grid fluid>
          <Row>
            <Col xs={3} className="ContentModelList__filter-searchby">
              <Label className="ContentModelList__filter-searchby-label">
                <FormattedMessage id="cms.contentmodel.searchFilter.label" defaultMessage="Search By" />
              </Label>
              <DropdownButton title={intl.formatMessage(this.messages.valueName)} id="" className="ContentModelList__filter-searchby-dropdown">
                <MenuItem eventKey="1" active>
                  <FormattedMessage id="cms.contentmodel.searchFilter.valueName" />
                </MenuItem>
              </DropdownButton>
            </Col>
            <Col xs={8}>
              <Field
                name="keyword"
                component={RenderSearchFormInput}
                placeholder={intl.formatMessage(this.messages.searchPlaceholder)}
              />
            </Col>
            <Col xs={1}>
              <Button
                className="SearchForm__button"
                type="submit"
              >
                <Icon name="search" />
              </Button>
            </Col>
          </Row>
        </Grid>
      </form>
    );
  }
}

ContentModelSearchFormBody.propTypes = {
  intl: intlShape.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  searchTerm: PropTypes.string,
  submit: PropTypes.func.isRequired,
};

ContentModelSearchFormBody.defaultProps = {
  searchTerm: '',
};

const ContentModelSearchForm = reduxForm({
  form: 'contentModelSearchForm',
})(ContentModelSearchFormBody);

export default injectIntl(ContentModelSearchForm);
