import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage, defineMessages,
} from 'react-intl';
import {
  Spinner,
  CardGrid,
  Grid,
  Row,
  Col,
  PaginationRow,
  PAGINATION_VIEW_TYPES,
  Filter,
  Toolbar,
} from 'patternfly-react';
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
    id: 'owner',
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
    id: 'categories',
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
    name: 'Attachments',
    id: 'file',
  },
];

class AssetsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: window.innerWidth < 992,
      selectedAsset: null,
    };
    this.messages = defineMessages({
      filterPlaceholder: {
        id: 'cms.assets.list.filterBy',
        defaultMessage: 'Filter by',
      },
    });
    this.onPerPageSelect = this.onPerPageSelect.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleAssetSelect = this.handleAssetSelect.bind(this);
  }

  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  onFileTypeChange(fileType) {
    const { onChangeFileType } = this.props;
    onChangeFileType(fileType);
  }

  onPageChange(page) {
    const { fetchList, pageSize } = this.props;
    fetchList({ page, pageSize });
  }

  onPerPageSelect(pageSize) {
    const { fetchList } = this.props;
    fetchList({ page: 1, pageSize });
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
    const { onRemoveActiveFilter, activeFilters } = this.props;
    onRemoveActiveFilter(item, activeFilters);
  }

  handleAssetSelect(code) {
    this.setState({
      selectedAsset: code,
    });
    const { onSelect } = this.props;
    onSelect(code);
  }

  removeAllActiveFilters() {
    const { onRemoveAllActiveFilters, onResetFilteringCategories } = this.props;
    onRemoveAllActiveFilters();
    onResetFilteringCategories();
  }

  render() {
    const {
      loading,
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
      onAssetSelected,
      onClickDelete,
      showColumns,
      hideFooter,
      singleView,
      onDuplicateClicked,
    } = this.props;
    const pagination = {
      page,
      perPage,
      perPageOptions,
    };
    const { mobile, selectedAsset } = this.state;
    const itemsStart = totalItems === 0 ? 0 : (page - 1) * perPage + 1;
    const itemsEnd = Math.min(page * perPage, totalItems);

    const notSortable = ['actions', 'preview', 'categories'];
    const headerSorter = item => (notSortable.indexOf(item.name) === -1
      ? onApplySort(item.id) : null);
    const renderHeader = headers.filter(({ name }) => showColumns.includes(name)).map((item, i) => (
      <th
        width={item.width}
        key={item.name}
        role="button"
        onClick={() => headerSorter(item)}
      >
        <FormattedMessage id={`cms.assets.list.${item.name}`} />{' '}
        {item.name !== 'actions' && item.name !== 'preview' ? (
          <i
            className={`fa ${
              (sort && sort.attribute === item.id) && (sort.direction === 'ASC'
                ? 'fa-angle-up'
                : 'fa-angle-down')
            } AssetsList__sort`}
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
    const optClassSel = 'AssetsList__view-option--selected';
    const gridViewClass = `fa fa-th AssetsList__view-option ${
      assetsView === 'grid' ? optClassSel : ''
    }`;
    const listViewClass = `fa fa-list AssetsList__view-option ${
      assetsView === 'list' ? optClassSel : ''
    }`;
    const renderAppliedFilters = activeFilters && !loading && (
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
        language={language}
        asset={asset}
        onEditClicked={onAssetSelected}
        onClickDelete={onClickDelete}
        showColumns={showColumns}
        onSelect={this.handleAssetSelect}
        selected={selectedAsset === asset.id}
        onDuplicateClicked={onDuplicateClicked}
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
    const gridContent = (
      <AssetsListGridView
        assets={assets}
        onEditClicked={onAssetSelected}
        onClickDelete={onClickDelete}
        onDuplicateClicked={onDuplicateClicked}
      />
    );
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
      <CardGrid>
        <div className="AssetsList__files-header">
          {renderFileTypes}
          {mobile || singleView ? null : (
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
            <div className="AssetsList__tree-container">
              <CategoryTreeFilterContainer
                language={language}
                onApplyFilteredSearch={onApplyFilteredSearch}
                filteringCategories={filteringCategories}
                assetType={fileType}
                mobile={mobile}
                hideIfEmpty
                filterSubject="asset"
              />
            </div>
            {mobile && !loading ? <div className="AssetsList__filter-info">{renderAppliedFilters}</div> : null}
          </Col>
          {mobile ? null : (
            <Col xs={10} className="AssetsList__files-container no-padding">
              <div className="AssetsList__filter-info">{renderAppliedFilters}</div>
              <Spinner loading={!!loading}>
                {bodyContent}
              </Spinner>
            </Col>
          )}
        </Row>
        {mobile ? (
          <Row>
            <Col xs={12} className="AssetsList__files-container--mobile no-padding">
              <Spinner loading={!!loading}>
                {bodyContent}
              </Spinner>
            </Col>
          </Row>
        ) : null}
      </CardGrid>
    );
    return (
      <div className="AssetsList__wrap">
        {content}
        {!loading && !hideFooter && (
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
        )}
      </div>
    );
  }
}

AssetsList.propTypes = {
  loading: PropTypes.bool,
  assetsView: PropTypes.string.isRequired,
  fileType: PropTypes.string.isRequired,
  sort: PropTypes.shape({
    attribute: PropTypes.string,
    direction: PropTypes.string,
  }),
  assets: PropTypes.arrayOf(PropTypes.shape({})),
  language: PropTypes.string.isRequired,
  onDidMount: PropTypes.func.isRequired,
  filteringCategories: PropTypes.arrayOf(PropTypes.shape({})),
  activeFilters: PropTypes.arrayOf(PropTypes.shape({})),
  onApplySort: PropTypes.func.isRequired,
  onApplyFilteredSearch: PropTypes.func.isRequired,
  onRemoveActiveFilter: PropTypes.func.isRequired,
  onChangeAssetsView: PropTypes.func.isRequired,
  onRemoveAllActiveFilters: PropTypes.func.isRequired,
  onChangeFileType: PropTypes.func.isRequired,
  fetchList: PropTypes.func.isRequired,
  lastPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  perPageOptions: PropTypes.arrayOf(PropTypes.number),
  onAssetSelected: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onDuplicateClicked: PropTypes.func.isRequired,
  onResetFilteringCategories: PropTypes.func.isRequired,
  showColumns: PropTypes.arrayOf(PropTypes.string),
  hideFooter: PropTypes.bool,
  singleView: PropTypes.bool,
  onSelect: PropTypes.func,
};

AssetsList.defaultProps = {
  loading: false,
  assets: [],
  filteringCategories: [],
  activeFilters: [],
  sort: {
    attribute: 'description',
    direction: 'ASC',
  },
  perPageOptions: [5, 10, 15, 25, 50],
  showColumns: headers.map(({ name }) => name),
  hideFooter: false,
  singleView: false,
  onSelect: () => {},
};

export default AssetsList;
