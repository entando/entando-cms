import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import {
  Table, customHeaderFormattersDefinition,
  PAGINATION_VIEW, PaginationRow,
  TABLE_SORT_DIRECTION, tableCellFormatter,
  sortableHeaderCellFormatter,
} from 'patternfly-react';
import * as resolve from 'table-resolver';

class ContentList extends Component {
  constructor(props) {
    super(props);
    // enables our custom header formatters extensions to reactabular
    this.customHeaderFormatters = customHeaderFormattersDefinition;
    this.onSort = this.onSort.bind(this);
    this.onPerPageSelect = this.onPerPageSelect.bind(this);
    this.markSelectedContents = this.markSelectedContents.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
  }

  onPerPageSelect(eventKey) {
    const { onFilteredSearch } = this.props;
    const newPagination = {
      page: 1,
      pageSize: eventKey,
    };
    onFilteredSearch(null, newPagination);
  }

  onPageChange(newPage) {
    const {
      lastPage, pageSize, onFilteredSearch,
    } = this.props;
    if (newPage < 1 || newPage > lastPage) return 0;
    const newPagination = {
      page: newPage,
      pageSize,
    };
    return onFilteredSearch(null, newPagination);
  }

  onSort(e, column, sortDirection) {
    const { onFilteredSearch, onSetSort, pageSize } = this.props;
    const newSortDirection = sortDirection === TABLE_SORT_DIRECTION.ASC ? TABLE_SORT_DIRECTION.DESC
      : TABLE_SORT_DIRECTION.ASC;
    const updatedSortingColumns = {
      [column.property]: {
        direction: newSortDirection,
        position: 0,
      },
    };
    const newPagination = {
      page: 1,
      pageSize,
    };
    onSetSort(updatedSortingColumns);
    onFilteredSearch(null, newPagination,
      { attribute: column.property, direction: newSortDirection.toUpperCase() });
  }

  handleRowSelect(event) {
    const { onContentSelect } = this.props;
    onContentSelect(event.target.value);
  }

  showingColumns() {
    const {
      activeColumns, availableColumns, intl,
    } = this.props;
    const currentActiveColumns = ['select', ...activeColumns];
    const allColumns = [{ code: 'select' }, ...availableColumns];
    return allColumns.filter(ac => currentActiveColumns.includes(ac.code))
      .map((ac, i) => {
        let rowCellFormatter = tableCellFormatter;
        const headerCellFormatter = sortableHeaderCellFormatter;
        const { code } = ac;
        switch (ac.code) {
          case 'description':
            rowCellFormatter = name => (<td className="Contents__name-td" style={{ textOverflow: 'ellipsis' }}>{name}</td>
            );
            break;
          case 'created':
          case 'lastModified':
            rowCellFormatter = date => <td>{new Date(date).toLocaleDateString()}</td>;
            break;
          case 'typeCode':
            rowCellFormatter = (typeCode, { rowData: { typeDescription } }) => (
              <td>
                {typeDescription}
              </td>
            );
            break;
          case 'select':
            rowCellFormatter = (value, { rowData: { id } }) => (
              <td className="text-center">
                <input type="radio" name="selected-content" value={id} onChange={this.handleRowSelect} />
              </td>
            );
            break;
          default:
            break;
        }
        return {
          property: code,
          header: {
            label: intl.formatMessage({ id: `cms.contents.${code}` }),
            props: {
              index: i,
              rowSpan: 1,
              colSpan: 1,
            },
            customFormatters: [headerCellFormatter],
          },
          cell: {
            props: {
              index: i,
            },
            formatters: [rowCellFormatter],
          },
        };
      });
  }

  markSelectedContents() {
    const { contents, selectedRows } = this.props;
    return contents.map(
      c => (selectedRows.includes(c.id) ? Object.assign({}, c, { selected: true }) : c),
    );
  }

  render() {
    const {
      totalItems, page, pageSize, perPageOptions, lastPage, sortingColumns,
    } = this.props;
    const columns = this.showingColumns();
    const itemsStart = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
    const itemsEnd = Math.min(page * pageSize, totalItems);
    const pagination = {
      page,
      perPage: pageSize,
      perPageOptions,
    };
    const contents = this.markSelectedContents();
    return (
      <div>
        <div className="Contents__table">
          <Table.PfProvider
            striped
            bordered
            hover
            dataTable
            columns={columns}
            components={{
              header: {
                cell: cellProps => this.customHeaderFormatters({
                  cellProps,
                  columns,
                  sortingColumns,
                  rows: contents,
                  onSort: this.onSort,
                }),
              },
            }}
          >
            <Table.Header headerRows={resolve.headerRows({ columns })} />
            <Table.Body rows={contents} rowKey="id" />
          </Table.PfProvider>
          <PaginationRow
            itemCount={totalItems}
            itemsStart={itemsStart}
            itemsEnd={itemsEnd}
            viewType={PAGINATION_VIEW.TABLE}
            pagination={pagination}
            amountOfPages={lastPage}
            pageInputValue={page}
            onPageSet={this.onPageSet}
            onPerPageSelect={this.onPerPageSelect}
            onFirstPage={() => this.onPageChange(1)}
            onPreviousPage={() => this.onPageChange(page - 1)}
            onPageInput={this.onPageInput}
            onNextPage={() => this.onPageChange(page + 1)}
            onLastPage={() => this.onPageChange(lastPage)}
          />
        </div>
      </div>
    );
  }
}

ContentList.propTypes = {
  intl: intlShape.isRequired,
  activeColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  availableColumns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  contents: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  page: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onFilteredSearch: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
  perPageOptions: PropTypes.arrayOf(PropTypes.number),
  sortingColumns: PropTypes.shape({}).isRequired,
  onSetSort: PropTypes.func.isRequired,
  selectedRows: PropTypes.arrayOf(PropTypes.string).isRequired,
  onContentSelect: PropTypes.func.isRequired,
};

ContentList.defaultProps = {
  perPageOptions: [5, 10, 15, 25, 50],
};

export default ContentList;
