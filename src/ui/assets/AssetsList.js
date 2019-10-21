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
  },
  {
    name: 'uploadedBy',
    width: '13%',
  },
  {
    name: 'uploadedAt',
    width: '13%',
    id: 'createdAt',
  },
  {
    name: 'group',
    width: '10%',
  },
  {
    name: 'categories',
    width: '12%',
  },
  {
    name: 'used',
    width: '9%',
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
    this.onPageInput = this.onPageInput.bind(this);
    this.onPerPageSelect = this.onPerPageSelect.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    const { onDidMount, fileType, paginationOptions } = this.props;
    const { page, perPage } = paginationOptions;
    const urlParams = `?type=${fileType}&page=${page}&pageSize=${perPage}`;
    onDidMount(urlParams);
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentDidUpdate(prevProps) {
    const {
      sort, refetchAssets, fileType, paginationOptions,
    } = this.props;
    if (prevProps.sort.name !== sort.name || prevProps.sort.direction !== sort.direction) {
      const { page, perPage } = paginationOptions;
      const fetchParams = `?type=${fileType}${
        sort
          ? `&sort=${sort.name}&direction=${sort.direction}&page=${page}&pageSize=${perPage}`
          : ''
      }`;
      refetchAssets(fetchParams);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  onFileTypeChange(fileType) {
    const { onChangeFileType, refetchAssets, paginationOptions } = this.props;
    const { page, perPage } = paginationOptions;
    const fetchParams = `?type=${fileType}${`&page=${page}&pageSize=${perPage}`}`;
    onChangeFileType(fileType);
    refetchAssets(fetchParams);
  }

  onPageChange(newPage) {
    const { fileType, paginationOptions, refetchAssets } = this.props;
    const { perPage, lastPage } = paginationOptions;
    if (newPage < 1 || newPage > lastPage) return 0;
    paginationOptions.page = newPage;
    const fetchParams = `?type=${fileType}${`&page=${newPage}&pageSize=${perPage}`}`;
    return refetchAssets(fetchParams);
  }

  onPerPageSelect(value) {
    const {
      onChangePaginationOptions, paginationOptions, fileType, refetchAssets,
    } = this.props;
    paginationOptions.perPage = value;
    onChangePaginationOptions(paginationOptions);
    const fetchParams = `?type=${fileType}${`&page=${1}&pageSize=${value}`}`;
    refetchAssets(fetchParams);
  }

  onPageInput(input) {
    const { onChangePaginationOptions, paginationOptions } = this.props;
    let { value } = input.target;
    // eslint-disable-next-line no-restricted-globals
    value = isNaN(value) || value === '' ? 1 : parseInt(value, 10);
    paginationOptions.page = value;
    onChangePaginationOptions(paginationOptions);
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
      onRemoveActiveFilter, fileType, paginationOptions, refetchAssets,
    } = this.props;
    const { perPage } = paginationOptions;
    onRemoveActiveFilter(item);
    const fetchParams = `?type=${fileType}${`&page=${1}&pageSize=${perPage}`}`;
    refetchAssets(fetchParams);
  }

  removeAllActiveFilters() {
    const {
      onRemoveAllActiveFilters, fileType, paginationOptions, refetchAssets,
    } = this.props;
    const { perPage } = paginationOptions;
    onRemoveAllActiveFilters();
    const fetchParams = `?type=${fileType}${`&page=${1}&pageSize=${perPage}`}`;
    refetchAssets(fetchParams);
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
      paginationOptions,
      activeFilters,
    } = this.props;
    const { mobile } = this.state;
    const {
      lastPage, totalItems, perPage, page,
    } = paginationOptions;
    const itemsStart = totalItems === 0 ? 0 : (page - 1) * perPage + 1;
    const itemsEnd = Math.min(page * perPage, totalItems);
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
    const assetsListItems = assets.map(asset => <AssetsListItem key={asset.id} asset={asset} />);
    const tableContent = (
      <table className="table table-bordered table-hover AssetsList__table">
        <thead>
          <tr>{renderHeader}</tr>
        </thead>
        <tbody>{assetsListItems}</tbody>
      </table>
    );
    const gridContent = <AssetsListGridView assets={assets} />;
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
                filterSubject="asset"
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
                pageInputValue={paginationOptions.page}
                pagination={paginationOptions}
                amountOfPages={lastPage}
                pageSizeDropUp
                itemCount={totalItems}
                itemsStart={itemsStart}
                itemsEnd={itemsEnd}
                onPerPageSelect={this.onPerPageSelect}
                onFirstPage={() => this.onPageChange(1)}
                onPreviousPage={() => this.onPageChange(paginationOptions.page - 1)}
                onPageInput={this.onPageInput}
                onNextPage={() => this.onPageChange(paginationOptions.page + 1)}
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
  paginationOptions: PropTypes.shape({}).isRequired,
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
  onChangePaginationOptions: PropTypes.func.isRequired,
};

AssetsListBody.defaultProps = {
  loading: false,
  assets: [],
  filteringCategories: [],
  activeFilters: [],
  sort: {},
};

export default injectIntl(AssetsListBody);
