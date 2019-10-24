import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage, defineMessages, intlShape, injectIntl,
} from 'react-intl';
import {
  Spinner,
  Grid,
  Row,
  Col,
  Button,
  Icon,
  PaginationRow,
  PAGINATION_VIEW_TYPES,
  Filter,
  Toolbar,
} from 'patternfly-react';
import RenderSearchFormInput from 'ui/common/form/RenderSearchFormInput';
import CategoryTreeFilterContainer from 'ui/categories/filter/CategoryTreeFilterContainer';
import AssetsListItem from 'ui/assets/AssetsListItem';
import AssetsListGridView from 'ui/assets/AssetsListGridView';

const headers = [
  {
    name: 'preview',
    width: '10%',
  },
  {
    name: 'name',
    width: '18%',
    id: 'description',
  },
  {
    name: 'type',
    width: '8%',
    id: 'type',
  },
  {
    name: 'uploadedBy',
    width: '17%',
  },
  {
    name: 'uploadedAt',
    width: '18%',
    id: 'createdAt',
  },
  {
    name: 'group',
    width: '10%',
    id: 'group',
  },
  {
    name: 'categories',
    width: '12%',
  },
  {
    name: 'actions',
    width: '7%',
  },
];

const fileTypes = [
  {
    name: 'All',
    id: 'all',
  },
  {
    name: 'Images',
    id: 'image',
  },
  {
    name: 'Attachements',
    id: 'file',
  },
];

class AssetsListBody extends Component {
  constructor(props) {
    super(props);
    this.state = { mobile: window.innerWidth < 992 };
    this.messages = defineMessages({
      filterPlaceholder: {
        id: 'cms.assets.list.filterBy',
        defaultMessage: 'Filter by',
      },
    });
    this.onPerPageSelect = this.onPerPageSelect.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    const {
      onDidMount, fileType, page, pageSize: perPage,
    } = this.props;
    const urlParams = `?type=${fileType}&page=${page}&pageSize=${perPage}`;
    onDidMount(urlParams);
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentDidUpdate(prevProps) {
    const {
      sort, refetchAssets, fileType, pageSize: perPage, filteringCategories,
    } = this.props;
    if (prevProps.sort.name !== sort.name || prevProps.sort.direction !== sort.direction) {
      const fetchParams = this.generateUrlParams(
        1, perPage, sort, filteringCategories, fileType,
      );
      refetchAssets(fetchParams);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  onFileTypeChange(fileType) {
    const {
      onChangeFileType, refetchAssets, pageSize: perPage, filteringCategories, sort,
    } = this.props;
    const fetchParams = this.generateUrlParams(
      1, perPage, sort, filteringCategories, fileType,
    );
    onChangeFileType(fileType);
    refetchAssets(fetchParams);
  }

  onPageChange(newPage) {
    const {
      fileType, pageSize: perPage, lastPage, refetchAssets, filteringCategories, sort,
    } = this.props;
    if (newPage < 1 || newPage > lastPage) return 0;
    const fetchParams = this.generateUrlParams(
      newPage, perPage, sort, filteringCategories, fileType,
    );
    return refetchAssets(fetchParams);
  }

  onPerPageSelect(value) {
    const {
      fileType, refetchAssets, filteringCategories, sort,
    } = this.props;
    const fetchParams = this.generateUrlParams(
      1, value, sort, filteringCategories, fileType,
    );
    refetchAssets(fetchParams);
  }

  updateWindowDimensions() {
    const { onChangeAssetsView, assetsView } = this.props;
    const currentInnerWidth = window.innerWidth;
    if (currentInnerWidth < 992 && assetsView !== 'grid') {
      onChangeAssetsView('grid');
    }
    this.setState({ mobile: window.innerWidth < 992 });
  }

  handleRemoveActiveFilter(item) {
    const {
      onRemoveActiveFilter, fileType, pageSize: perPage, refetchAssets, filteringCategories, sort,
    } = this.props;
    onRemoveActiveFilter(item);
    const leftCategories = filteringCategories.filter(c => c.code !== item.code);
    const fetchParams = this.generateUrlParams(1, perPage, sort, leftCategories, fileType);
    refetchAssets(fetchParams);
  }

  removeAllActiveFilters() {
    const {
      onRemoveAllActiveFilters, fileType, pageSize: perPage, refetchAssets, sort,
    } = this.props;
    onRemoveAllActiveFilters();
    const fetchParams = this.generateUrlParams(1, perPage, sort, [], fileType);
    refetchAssets(fetchParams);
  }

  // eslint-disable-next-line class-methods-use-this
  generateUrlParams(page, perPage, sort, filteringCategories, fileType) {
    const sortParams = sort && sort.name && sort.direction
      ? `&sort=${sort.name}&direction=${sort.direction}`
      : '';
    const filteringParams = filteringCategories.map(
      (filter, i) => `&filters[${i}].attribute=categories&filters[${i}].value=${filter.code}`,
    ).join('');
    const typeParams = fileType === 'all' ? '' : `&type=${fileType}`;
    const pageParams = `&page=${page}&pageSize=${perPage}`;
    return `?${sortParams}${filteringParams}${typeParams}${pageParams}`;
  }

  render() {
    const {
      loading,
      intl,
      assets,
      filteringCategories,
      language,
      fileType,
      assetsView,
      sort,
      onApplyFilteredSearch,
      onChangeAssetsView,
      onApplySort,
      activeFilters,
      lastPage,
      totalItems,
      pageSize: perPage,
      page,
      perPageOptions,
      apiUrl,
    } = this.props;
    const pagination = {
      page,
      perPage,
      perPageOptions,
    };
    const { mobile } = this.state;
    const itemsStart = totalItems === 0 ? 0 : (page - 1) * perPage + 1;
    const itemsEnd = Math.min(page * perPage, totalItems);
    const apiDomain = new URL(apiUrl);
    const apiOrigin = apiDomain.origin;
    const renderHeader = headers.map((item, i) => (
      <th width={item.width} key={item.name}>
        <FormattedMessage id={`cms.assets.list.${item.name}`} />{' '}
        {item.name !== 'actions' && item.name !== 'preview' ? (
          <i
            className={`fa ${
              sort && sort.name === item.id && sort.direction === 'ASC'
                ? 'fa-angle-up'
                : 'fa-angle-down'
            } AssetsList__sort`}
            role="button"
            onClick={() => onApplySort(item.id)}
            onKeyDown={() => onApplySort(item.id)}
            tabIndex={i}
          />
        ) : null}
      </th>
    ));
    const renderFileTypes = fileTypes.map((type, i) => (
      <div
        tabIndex={i}
        key={type.id}
        role="button"
        onKeyDown={() => this.onFileTypeChange(type.id)}
        onClick={() => this.onFileTypeChange(type.id)}
        className={`AssetsList__file-type text-center ${
          fileType === type.id ? 'AssetsList__file-type--selected' : ''
        }`}
      >
        {<FormattedMessage id={`cms.assets.list.${type.id}`} />}
      </div>
    ));
    const gridViewClass = `fa fa-th AssetsList__view-option ${
      assetsView === 'grid' ? 'AssetsList__view-option--selected' : ''
    }`;
    const listViewClass = `fa fa-list AssetsList__view-option ${
      assetsView === 'list' ? 'AssetsList__view-option--selected' : ''
    }`;
    const renderAppliedFilters = activeFilters && (
      <Toolbar.Results className="AssetsList__toolbar-results">
        <span className="AssetsList__items-count">
          {itemsEnd} <FormattedMessage id="cms.assets.list.of" /> {totalItems}{' '}
          <FormattedMessage id="cms.assets.list.items" />
        </span>
        <Filter.ActiveLabel className="AssetsList__filters-label">
          <FormattedMessage id="cms.assets.list.activeFilters" />:
        </Filter.ActiveLabel>
        <Filter.List>
          {activeFilters.map(item => (
            <Filter.Item
              key={item.code}
              onRemove={() => this.handleRemoveActiveFilter(item)}
              filterData={item}
            >
              {item.titles[language]}
            </Filter.Item>
          ))}
        </Filter.List>
        {activeFilters.length > 0 && (
          <span
            type="button"
            role="button"
            tabIndex={0}
            className="AssetsList__ca"
            onClick={() => this.removeAllActiveFilters()}
            onKeyDown={() => this.removeAllActiveFilters()}
          >
            <FormattedMessage id="cms.assets.list.clearAll" />
          </span>
        )}
      </Toolbar.Results>
    );
    const assetsListItems = assets.map(asset => (
      <AssetsListItem
        key={asset.id}
        asset={asset}
        domain={apiOrigin}
      />
    ));
    const tableContent = (
      <table className="table table-bordered table-hover AssetsList__table">
        <thead>
          <tr>{renderHeader}</tr>
        </thead>
        <tbody>{assetsListItems}</tbody>
      </table>
    );
    const gridContent = <AssetsListGridView assets={assets} domain={apiOrigin} />;
    const emptyContent = (
      <div className="AssetsList__nothing-found">
        <FormattedMessage id="cms.assets.list.nothingFound" />.
      </div>
    );
    let bodyContent = emptyContent;
    if (assets.length > 0) {
      bodyContent = assetsView === 'list' ? tableContent : gridContent;
    }
    const content = (
      <Grid fluid>
        <div className="AssetsList__files-header">
          {renderFileTypes}
          {mobile ? null : (
            <div className="AssetsList__view-options">
              <span
                className={gridViewClass}
                onClick={() => onChangeAssetsView('grid')}
                onKeyDown={() => onChangeAssetsView('grid')}
                role="button"
                tabIndex={-3}
              />
              <span
                className={listViewClass}
                onClick={() => onChangeAssetsView('list')}
                onKeyDown={() => onChangeAssetsView('list')}
                role="button"
                tabIndex={-4}
              />
            </div>
          )}
        </div>
        <Row className="AssetsList__body">
          <Col xs={mobile ? 12 : 2} className="no-padding">
            <div className="AssetsList__filter-container">
              <RenderSearchFormInput
                placeholder={intl.formatMessage(this.messages.filterPlaceholder)}
              />
              <Button className="SearchForm__button" type="submit">
                <Icon name="search" />
              </Button>
            </div>
            <div className="AssetsList__tree-container">
              <CategoryTreeFilterContainer
                language={language}
                onApplyFilteredSearch={onApplyFilteredSearch}
                filteringCategories={filteringCategories}
                assetType={fileType}
                mobile={mobile}
              />
            </div>
            {mobile ? <div className="AssetsList__filter-info">{renderAppliedFilters}</div> : null}
          </Col>
          {mobile ? null : (
            <Col xs={10} className="AssetsList__files-container no-padding">
              <div className="AssetsList__filter-info">{renderAppliedFilters}</div>
              {bodyContent}
            </Col>
          )}
        </Row>
        {mobile ? (
          <Row>
            <Col xs={12} className="AssetsList__files-container--mobile no-padding">
              {bodyContent}
            </Col>
          </Row>
        ) : null}
      </Grid>
    );
    return (
      <div className="AssetsList__wrap">
        <Spinner loading={!!loading}>
          {content}
          <div className="AssetsList__footer">
            <Grid>
              <PaginationRow
                viewType={PAGINATION_VIEW_TYPES[0]}
                pageInputValue={page}
                pagination={pagination}
                amountOfPages={lastPage}
                pageSizeDropUp
                itemCount={totalItems}
                itemsStart={itemsStart}
                itemsEnd={itemsEnd}
                onPerPageSelect={this.onPerPageSelect}
                onFirstPage={() => this.onPageChange(1)}
                onPreviousPage={() => this.onPageChange(page - 1)}
                onNextPage={() => this.onPageChange(page + 1)}
                onLastPage={() => this.onPageChange(lastPage)}
              />
            </Grid>
          </div>
        </Spinner>
      </div>
    );
  }
}

AssetsListBody.propTypes = {
  intl: intlShape.isRequired,
  loading: PropTypes.bool,
  assetsView: PropTypes.string.isRequired,
  fileType: PropTypes.string.isRequired,
  sort: PropTypes.shape({
    name: PropTypes.string,
    direction: PropTypes.string,
  }),
  assets: PropTypes.arrayOf(PropTypes.shape({})),
  language: PropTypes.string.isRequired,
  onDidMount: PropTypes.func.isRequired,
  filteringCategories: PropTypes.arrayOf(PropTypes.shape({})),
  activeFilters: PropTypes.arrayOf(PropTypes.shape({})),
  refetchAssets: PropTypes.func.isRequired,
  onApplySort: PropTypes.func.isRequired,
  onApplyFilteredSearch: PropTypes.func.isRequired,
  onRemoveActiveFilter: PropTypes.func.isRequired,
  onChangeAssetsView: PropTypes.func.isRequired,
  onRemoveAllActiveFilters: PropTypes.func.isRequired,
  onChangeFileType: PropTypes.func.isRequired,
  lastPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  perPageOptions: PropTypes.arrayOf(PropTypes.number),
  apiUrl: PropTypes.string.isRequired,
};

AssetsListBody.defaultProps = {
  loading: false,
  assets: [],
  filteringCategories: [],
  activeFilters: [],
  sort: {
    name: 'description',
    direction: 'ASC',
  },
  perPageOptions: [5, 10, 15, 25, 50],
};

export default injectIntl(AssetsListBody);
