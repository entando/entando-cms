import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'react-intl';
import {
  Table,
  customHeaderFormattersDefinition,
  PAGINATION_VIEW, PaginationRow, TABLE_SORT_DIRECTION,
  selectionHeaderCellFormatter, selectionCellFormatter, sortableHeaderCellFormatter,
  tableCellFormatter, actionHeaderCellFormatter, MenuItem,
} from 'patternfly-react';
import * as resolve from 'table-resolver';
import DeleteContentModalContainer from 'ui/contents/DeleteContentModalContainer';
import PublishContentModalContainer from 'ui/contents/PublishContentModalContainer';

class ContentsTable extends Component {
  constructor(props) {
    super(props);
    // enables our custom header formatters extensions to reactabular
    this.customHeaderFormatters = customHeaderFormattersDefinition;
    this.onSort = this.onSort.bind(this);
    this.onPerPageSelect = this.onPerPageSelect.bind(this);
    this.onTableRowSelect = this.onTableRowSelect.bind(this);
    this.onSelectAllRows = this.onSelectAllRows.bind(this);
    this.markSelectedContents = this.markSelectedContents.bind(this);
  }

  onPerPageSelect(eventKey) {
    const { sortingColumns, onFilteredSearch } = this.props;
    const columnKey = Object.keys(sortingColumns)[0];
    const sortDirection = sortingColumns[columnKey].direction;
    const newPagination = {
      page: 1,
      pageSize: eventKey,
    };
    const sortParams = `?sort=${columnKey}&direction=${sortDirection.toUpperCase()}`;
    onFilteredSearch(newPagination, sortParams);
  }

  onPageChange(newPage) {
    const {
      lastPage, pageSize, onFilteredSearch, sortingColumns,
    } = this.props;
    if (newPage < 1 || newPage > lastPage) return 0;
    const columnKey = Object.keys(sortingColumns)[0];
    const sortDirection = sortingColumns[columnKey].direction;
    const sortParams = `?sort=${columnKey}&direction=${sortDirection.toUpperCase()}`;
    const newPagination = {
      page: newPage,
      pageSize,
    };
    return onFilteredSearch(newPagination, sortParams);
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
    const sortParams = `?sort=${column.property}&direction=${newSortDirection.toUpperCase()}`;
    onSetSort(updatedSortingColumns);
    onFilteredSearch(newPagination, sortParams);
  }

  onTableRowSelect(e, row) {
    const {
      onSelectRow,
    } = this.props;
    onSelectRow(row);
  }

  onSelectAllRows(event) {
    const { onSelectAllRows } = this.props;
    const { checked } = event.target;
    onSelectAllRows(checked);
  }

  showingColumns() {
    const {
      activeColumns, availableColumns, intl, onEditContent, onClickDelete,
      onClickPublish,
    } = this.props;
    const currentActiveColumns = ['selectAll', ...activeColumns];
    const allColumns = [{ code: 'selectAll' }, ...availableColumns];
    return allColumns.filter(ac => currentActiveColumns.includes(ac.code))
      .map((ac, i) => {
        let rowCellFormatter = tableCellFormatter;
        let headerCellFormatter = sortableHeaderCellFormatter;
        switch (ac.code) {
          case 'description':
            rowCellFormatter = name => (<td className="Contents__name-td" style={{ textOverflow: 'ellipsis' }}>{name}</td>
            );
            break;
          case 'created':
          case 'lastModified':
            rowCellFormatter = date => <td>{new Date(date).toLocaleDateString()}</td>;
            break;
          case 'groups':
            rowCellFormatter = groups => <td style={{ textOverflow: 'nowrap', whiteSpace: 'nowrap' }}>{groups && groups.join(', ')}</td>;
            break;
          case 'status':
            rowCellFormatter = (restr, { rowData: { mainGroup } }) => <td className="text-center">{<span className={`fa fa-${mainGroup === 'free' ? 'unlock' : 'lock'}`} />}</td>;
            break;
          case 'onLine':
            rowCellFormatter = (onLine, { rowData }) => {
              // eslint-disable-next-line no-unused-vars
              const { status } = rowData;
              const statusColor = onLine ? 'published' : 'unpublished';
              return (
                <td className="text-center">
                  <span className={`ContentsFilter__status ContentsFilter__status--${statusColor}`} />
                </td>
              );
            };
            break;
          case 'selectAll':
            headerCellFormatter = selectionHeaderCellFormatter;
            rowCellFormatter = (value, { rowData, rowIndex }) => selectionCellFormatter(
              { rowData, rowIndex },
              this.onTableRowSelect,
            );
            break;
          case 'actions':
            headerCellFormatter = actionHeaderCellFormatter;
            rowCellFormatter = (value, { rowData }) => [
              <Table.Actions key="1" style={{ width: 'inherit' }}>
                <div>
                  <Table.DropdownKebab id="actionsKebab" pullRight>
                    <MenuItem onClick={() => onEditContent(rowData.id)}>
                      <FormattedMessage id="cms.label.edit" defaultMessage="Edit" />
                    </MenuItem>
                    <MenuItem onClick={() => onClickDelete(rowData)}>
                      <FormattedMessage id="cms.label.delete" defaultMessage="Delete" />
                    </MenuItem>
                    <MenuItem onClick={() => onClickPublish([rowData], true)}>
                      <FormattedMessage id="cms.label.publish" defaultMessage="Publish" />
                    </MenuItem>
                    <MenuItem onClick={() => onClickPublish([rowData], false)}>
                      <FormattedMessage id="cms.label.unpublish" defaultMessage="Unpublish" />
                    </MenuItem>
                  </Table.DropdownKebab>
                </div>
              </Table.Actions>];
            break;
          default:
            break;
        }
        return {
          property: ac.code,
          header: {
            label: intl.formatMessage({ id: `cms.contents.${ac.code}` }),
            props: {
              index: i,
              rowSpan: 1,
              colSpan: 1,
            },
            [ac.code === 'actions' ? 'formatters' : 'customFormatters']: [headerCellFormatter],
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
      totalItems, page, pageSize, perPageOptions, sortingColumns, lastPage,
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
        <div className="table-responsive Contents__table">
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
                  onSelectAllRows: this.onSelectAllRows,
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
          <DeleteContentModalContainer />
          <PublishContentModalContainer />
        </div>
      </div>
    );
  }
}

ContentsTable.propTypes = {
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
  onSelectRow: PropTypes.func.isRequired,
  onSelectAllRows: PropTypes.func.isRequired,
  onEditContent: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onClickPublish: PropTypes.func.isRequired,
};

ContentsTable.defaultProps = {
  perPageOptions: [5, 10, 15, 25, 50],
};

export default ContentsTable;
