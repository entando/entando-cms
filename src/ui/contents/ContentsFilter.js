import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage, intlShape, defineMessages,
} from 'react-intl';
import {
  Filter, FormControl, Col, ControlLabel, Button,
} from 'patternfly-react';
import { Checkbox } from 'react-bootstrap';
import FormLabel from 'ui/common/form/FormLabel';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import CategoryTreeFilterContainer from 'ui/categories/filter/CategoryTreeFilterContainer';

const QUICK_FILTERS = [
  {
    id: 'description',
    title: 'Name',
    filterType: 'text',
  },
  {
    id: 'code',
    title: 'Code',
    filterType: 'text',
  },
];

const messages = defineMessages({
  searchContent: {
    id: 'cms.contents.quickSearchPlaceHolder',
    defaultValue: 'Search Content',
  },
});

class ContentsFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdvancedFilters: false,
    };
  }

  onChangeQuickFilter(e) {
    const { currentQuickFilter, onSetQuickFilter } = this.props;
    currentQuickFilter.id = e.id;
    currentQuickFilter.title = e.title;
    onSetQuickFilter(currentQuickFilter);
  }

  onChangeQuickFilterSearchText(e) {
    e.preventDefault();
    const { currentQuickFilter, onSetQuickFilter } = this.props;
    currentQuickFilter.value = e.target.value;
    onSetQuickFilter(currentQuickFilter);
  }

  onValueKeyPress(keyEvent) {
    const { currentQuickFilter, onSetQuickFilter, onFilteredSearch } = this.props;
    const { value: currentValue } = currentQuickFilter;

    if (keyEvent.key === 'Enter' && currentValue && currentValue.length > 0) {
      currentQuickFilter.value = '';
      onSetQuickFilter(currentQuickFilter);
      keyEvent.stopPropagation();
      keyEvent.preventDefault();
      onFilteredSearch(`?filters[0].attribute=id&filters[0].value=${currentQuickFilter.value}`);
    }
  }

  onToggleAdvancedFilters() {
    const { showAdvancedFilters } = this.state;
    this.setState({
      showAdvancedFilters: !showAdvancedFilters,
    });
  }


  render() {
    const {
      currentQuickFilter, intl, contentTypes, groups, language, filteringCategories,
      statusChecked, onCheckStatus, accessChecked, onCheckAccess, authorChecked, onCheckAuthor,
      onFilteredSearch, onSetContentType, onSetGroup,
    } = this.props;
    const { showAdvancedFilters } = this.state;
    const advancedFilterIcon = (
      <i
        className={`fa ${!showAdvancedFilters
          ? 'fa-angle-right'
          : 'fa-angle-down'
        } ContentsFilter__advanced-icon`}
      />
    );
    const advancedFiltersVisibility = showAdvancedFilters ? 'block' : 'none';
    return (
      <div className="ContentsFilter">
        <Filter className="clearfix col-xs-12">
          <Col xs={6} sm={2} className="ContentsFilter__left-column">
            <Filter.TypeSelector
              className="ContentsFilter__quick-filter-type"
              filterTypes={QUICK_FILTERS}
              currentFilterType={currentQuickFilter}
              onFilterTypeSelected={e => this.onChangeQuickFilter(e)}
            />
          </Col>
          <Col xs={10} sm={9} className="no-padding ContentsFilter__right-column">
            <FormControl
              style={{ zIndex: '1' }}
              type={currentQuickFilter.filterType}
              value={currentQuickFilter.value}
              placeholder={intl.formatMessage(messages.searchContent)}
              onChange={e => this.onChangeQuickFilterSearchText(e)}
              onKeyPress={e => this.onValueKeyPress(e)}
            />
          </Col>
        </Filter>
        <Col xs={6} xsOffset={0} sm={6} smOffset={2} className="ContentsFilter__right-column">
          <div
            className="ContentsFilter__advanced-filters-text"
            role="button"
            onClick={() => this.onToggleAdvancedFilters()}
            onKeyDown={() => this.onToggleAdvancedFilters()}
            tabIndex={-1}
          >
            {advancedFilterIcon} <FormattedMessage id="cms.contents.advancedFilters" defaultMessage="Advanced Filters" />
          </div>
        </Col>
        <div className="ContentsFilter__advanced-filters" style={{ display: advancedFiltersVisibility }}>
          <div className="ContentsFilter__advanced-filter">
            <RenderSelectInput
              inputSize={9}
              labelSize={2}
              label={<FormLabel labelId="cms.contents.contentType" defaultMessage="Content Type" />}
              alignClass="text-right"
              options={contentTypes}
              optionValue="code"
              optionDisplayName="name"
              defaultOptionId="cms.contents.selectContentType"
              input={{ onChange: e => onSetContentType(e.target.value) }}
            />
          </div>
          <div className="ContentsFilter__advanced-filter">
            <RenderSelectInput
              inputSize={9}
              labelSize={2}
              label={<FormLabel labelId="cms.contents.group" defaultMessage="Content Type" />}
              alignClass="text-right"
              options={groups}
              optionValue="code"
              optionDisplayName="name"
              defaultOptionId="cms.contents.selectGroup"
              input={{ onChange: e => onSetGroup(e.target.value) }}
            />
          </div>
          <div className="ContentsFilter__advanced-filter">
            <Col xs={12} sm={2} className="text-right mobile-left">
              <ControlLabel>
                <FormLabel labelId="cms.contents.edit.categories" />
              </ControlLabel>
            </Col>
            <Col xs={12} sm={10}>
              <CategoryTreeFilterContainer
                language={language}
                filteringCategories={filteringCategories}
                assetType="image"
                mobile
                minimal
                filterSubject="content"
              />
            </Col>
          </div>
          <div className="ContentsFilter__advanced-filter ContentsFilter__advanced-filter--close">
            <Col xs={12} sm={2} className="text-right mobile-left">
              <ControlLabel>
                <FormLabel labelId="cms.contents.statusMain" />
              </ControlLabel>
            </Col>
            <Col xs={12} sm={10}>
              <Checkbox
                className="ContentsFilter__item-cb ContentsFilter__item-cb--responsive"
                role="button"
                tabIndex={-2}
                readOnly
                checked={statusChecked === 'published'}
                onClick={() => onCheckStatus('published')}
                onKeyDown={() => onCheckStatus('published')}
              >
                <div className="ContentsFilter__status ContentsFilter__status--published" />
                <FormattedMessage id="cms.contents.published" defaultMessage="Published" />
              </Checkbox>
              <Checkbox
                className="ContentsFilter__item-cb ContentsFilter__item-cb--responsive"
                role="button"
                tabIndex={-3}
                readOnly
                checked={statusChecked === 'review'}
                onClick={() => onCheckStatus('review')}
                onKeyDown={() => onCheckStatus('review')}
              >
                <div className="ContentsFilter__status ContentsFilter__status--review" />
                <FormattedMessage id="cms.contents.toReview" defaultMessage="To Review" />
                {' \\ '}
                <FormattedMessage id="cms.contents.toUpdate" defaultMessage="To Update" />
              </Checkbox>
              <Checkbox
                className="ContentsFilter__item-cb ContentsFilter__item-cb--responsive"
                role="button"
                tabIndex={-4}
                readOnly
                checked={statusChecked === 'unpublished'}
                onClick={() => onCheckStatus('unpublished')}
                onKeyDown={() => onCheckStatus('unpublished')}
              >
                <div className="ContentsFilter__status ContentsFilter__status--unpublished" />
                <FormattedMessage id="cms.contents.unpublished" defaultMessage="Unpublished" />
              </Checkbox>
            </Col>
          </div>
          <div className="ContentsFilter__advanced-filter">
            <Col xs={12} sm={2} className="text-right mobile-left">
              <ControlLabel>
                <FormLabel labelId="cms.contents.restrictions" defaultMessage="Restrictions" />
              </ControlLabel>
            </Col>
            <Col xs={12} sm={10}>
              <Checkbox
                className="ContentsFilter__item-cb ContentsFilter__item-cb--responsive"
                role="button"
                tabIndex={-5}
                readOnly
                checked={accessChecked === 'open'}
                onClick={() => onCheckAccess('open')}
                onKeyDown={() => onCheckAccess('open')}
              >
                <i className="fa fa-unlock ContentsFilter__access-icon" />
                <FormattedMessage id="cms.contents.open" defaultMessage="Open" />
              </Checkbox>
              <Checkbox
                className="ContentsFilter__item-cb ContentsFilter__item-cb--responsive"
                role="button"
                tabIndex={-5}
                readOnly
                checked={accessChecked === 'restricted'}
                onClick={() => onCheckAccess('restricted')}
                onKeyDown={() => onCheckAccess('restricted')}
              >
                <i className="fa fa-lock ContentsFilter__access-icon" />
                <FormattedMessage id="cms.contents.restricted" defaultMessage="Restricted" />
              </Checkbox>
            </Col>
          </div>
          <div className="ContentsFilter__advanced-filter">
            <Col xs={12} sm={2} className="text-right mobile-left">
              <ControlLabel>
                <FormLabel labelId="cms.contents.showMe" defaultMessage="Show me" />
              </ControlLabel>
            </Col>
            <Col xs={12} sm={10}>
              <Checkbox
                className="ContentsFilter__item-cb ContentsFilter__item-cb--responsive"
                role="button"
                tabIndex={-7}
                readOnly
                checked={authorChecked === 'all'}
                onClick={() => onCheckAuthor('all')}
                onKeyDown={() => onCheckAuthor('all')}
              >
                <FormattedMessage id="cms.contents.allContents" defaultMessage="All Contents" />
              </Checkbox>
              <Checkbox
                className="ContentsFilter__item-cb ContentsFilter__item-cb--responsive"
                role="button"
                tabIndex={-8}
                readOnly
                checked={authorChecked === 'me'}
                onClick={() => onCheckAuthor('me')}
                onKeyDown={() => onCheckAuthor('me')}
              >
                <FormattedMessage id="cms.contents.byMe" defaultMessage="By me" />
              </Checkbox>
            </Col>
          </div>
        </div>
        <Col xs={12} sm={2} smOffset={9} className="text-right mobile-center">
          <Button
            className="ContentsFilter__search-button"
            onClick={() => onFilteredSearch()}
          >
            <FormattedMessage id="cms.contents.search" defaultMessage="Search" />
          </Button>
        </Col>
      </div>
    );
  }
}

ContentsFilter.propTypes = {
  intl: intlShape.isRequired,
  language: PropTypes.string.isRequired,
  currentQuickFilter: PropTypes.shape({}).isRequired,
  onSetQuickFilter: PropTypes.func.isRequired,
  onFilteredSearch: PropTypes.func.isRequired,
  contentTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  filteringCategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  statusChecked: PropTypes.string.isRequired,
  onCheckStatus: PropTypes.func.isRequired,
  accessChecked: PropTypes.string.isRequired,
  onCheckAccess: PropTypes.func.isRequired,
  authorChecked: PropTypes.string.isRequired,
  onCheckAuthor: PropTypes.func.isRequired,
  onSetContentType: PropTypes.func.isRequired,
  onSetGroup: PropTypes.func.isRequired,
};

export default ContentsFilter;
