import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import {
  FormattedMessage, intlShape, injectIntl,
} from 'react-intl';
import {
  Col, Button, ControlLabel,
} from 'patternfly-react';
import FormLabel from 'ui/common/form/FormLabel';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import RenderDatePickerInput from 'ui/common/form/RenderDatePickerInput';
import AssetSearchFormContainer from 'ui/assets/search/AssetSearchFormContainer';

class AssetsAdvancedSearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdvancedFilters: false,
    };
  }

  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  onToggleAdvancedFilters() {
    const { showAdvancedFilters } = this.state;
    this.setState({
      showAdvancedFilters: !showAdvancedFilters,
    });
  }

  render() {
    const {
      intl, groups, handleSubmit,
    } = this.props;
    const { showAdvancedFilters } = this.state;
    const advancedFilterIcon = (
      <i
        className={`fa ${!showAdvancedFilters
          ? 'fa-angle-right'
          : 'fa-angle-down'
        } AssetsAdvancedFilter__advanced-icon`}
      />
    );
    const advancedFiltersVisibility = showAdvancedFilters ? 'block' : 'none';
    return (
      <div className="AssetsAdvancedFilter clearfix" onSubmit={handleSubmit}>
        <div className="clearfix form-group">
          <Col xs={2} sm={2} className="text-right mobile-left">
            <ControlLabel className="">
              <FormattedMessage defaultMessage="Name" id="1" />
            </ControlLabel>
          </Col>
          <Col xs={10} sm={9} className="AssetsAdvancedFilter__right-column">
            <AssetSearchFormContainer />
          </Col>
        </div>
        <Col xs={6} xsOffset={0} sm={5} smOffset={2} className="AssetsAdvancedFilter__right-column">
          <div
            className="AssetsAdvancedFilter__advanced-filters-text"
            role="button"
            onClick={() => this.onToggleAdvancedFilters()}
            onKeyDown={() => this.onToggleAdvancedFilters()}
            tabIndex={-1}
          >
            {advancedFilterIcon} <FormattedMessage id="cms.contents.advancedFilters" defaultMessage="Advanced Filters" />
          </div>
        </Col>
        <div className="AssetsAdvancedFilter__advanced-filters clearfix" style={{ display: advancedFiltersVisibility }}>
          <div className="AssetsAdvancedFilter__advanced-filter clearfix">
            <Field
              name="owner"
              component={RenderTextInput}
              inputSize={4}
              labelSize={2}
              placeholder={intl.formatMessage({ id: 'cms.assets.list.searchByUsername', defaultMessage: 'Search by Username' })}
              label={<FormLabel labelId="cms.assets.list.uploadedBy" defaultMessage="Uploaded By" />}
              alignClass="text-right"
            />
          </div>
          <div className="AssetsAdvancedFilter__advanced-filter clearfix">
            <Col sm={6} className="no-padding">
              <Field
                component={RenderDatePickerInput}
                name="fromDate"
                dateFormat="DD/MM/YYYY"
                label={<FormLabel labelId="cms.assets.list.uploadedFrom" defaultMessage="Uploaded From" />}
                alignClass="text-right"
                hasCalendarIcon
                labelSize={4}
              />
            </Col>
            <Col
              sm={6}
              className="no-padding"
            >
              <Field
                component={RenderDatePickerInput}
                name="toDate"
                dateFormat="DD/MM/YYYY"
                label={<FormLabel labelId="cms.label.to" />}
                alignClass="text-right"
                hasCalendarIcon
                inputSize={8}
                labelSize={1}
              />
            </Col>
          </div>
          <div className="AssetsAdvancedFilter__advanced-filter clearfix">
            <Field
              name="group"
              component={RenderSelectInput}
              onClear={this.clearSearch}
              inputSize={4}
              labelSize={2}
              label={(
                <FormLabel
                  labelId="cms.contents.group"
                  helpId="cms.contents.edit.groups.ownerGroup.tooltip"
                  defaultMessage="Group"
                />
)}
              alignClass="text-right"
              options={groups}
              optionValue="code"
              optionDisplayName="name"
              defaultOptionId="cms.contents.selectGroup"
            />
          </div>
        </div>
        <Col xs={12} sm={2} smOffset={9} className="text-right mobile-center">
          <Button
            className="AssetsAdvancedFilter__search-button"
            type="submit"
            onClick={() => handleSubmit()}
          >
            <FormattedMessage id="cms.contents.search" defaultMessage="Search" />
          </Button>
        </Col>
      </div>
    );
  }
}

AssetsAdvancedSearchForm.propTypes = {
  intl: intlShape.isRequired,
  onDidMount: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape({})),
  handleSubmit: PropTypes.func.isRequired,
};

AssetsAdvancedSearchForm.defaultProps = {
  groups: [],
};

const AssetsAdvancedSearch = reduxForm({
  form: 'assetsAdvancedSearch',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(AssetsAdvancedSearchForm);

export default injectIntl(AssetsAdvancedSearch);
