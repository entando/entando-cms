import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'react-intl';
import { isNull } from 'lodash';
import {
  Table, Col,
  customHeaderFormattersDefinition,
  PAGINATION_VIEW, PaginationRow, TABLE_SORT_DIRECTION,
  selectionHeaderCellFormatter, selectionCellFormatter, sortableHeaderCellFormatter,
  tableCellFormatter, actionHeaderCellFormatter,
} from 'patternfly-react';
import * as resolve from 'table-resolver';
import { formatDate } from '@entando/utils';
import { getContentStatusDetails } from 'ui/contents/ContentsTable';
import paginatorMessages from 'ui/common/paginatorMessages';

class ContentsFilterTable extends Component {
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
      activeColumns, availableColumns, intl, groups, onContentPicked, pickedContents,
    } = this.props;
    const pickMode = !isNull(pickedContents) && !Number.isNaN(pickedContents.length);
    const currentActiveColumns = pickMode ? [...activeColumns, 'addToPool'] : ['selectAll', ...activeColumns];
    const allColumns = pickMode
      ? [...availableColumns, { code: 'addToPool' }]
      : [{ code: 'selectAll' }, ...availableColumns];
    return allColumns.filter(ac => currentActiveColumns.includes(ac.code))
      .map((ac, i) => {
        let rowCellFormatter = tableCellFormatter;
        let headerCellFormatter = sortableHeaderCellFormatter;
        const { code } = ac;
        let newCode = code;
        switch (code) {
          case 'description':
            rowCellFormatter = name => (<td className="Contents__name-td" style={{ textOverflow: 'ellipsis' }}>{name}</td>
            );
            break;
          case 'code':
            rowCellFormatter = (_, { rowData }) => <td>{rowData.id}</td>;
            break;
          case 'created':
          case 'lastModified':
            rowCellFormatter = date => <td>{formatDate(date)}</td>;
            break;
          case 'mainGroup':
            rowCellFormatter = (mainGroup) => {
              const groupName = (groups.filter(g => g.code === mainGroup)[0] || {}).name;
              return <td style={{ textOverflow: 'nowrap', whiteSpace: 'nowrap' }}>{groupName || ''}</td>;
            };
            break;
          case 'groups':
            headerCellFormatter = actionHeaderCellFormatter;
            rowCellFormatter = (currentGroups) => {
              const groupNames = currentGroups
              && currentGroups.map(cg => (groups.filter(g => g.code === cg)[0] || {}).name);
              return <td style={{ textOverflow: 'nowrap', whiteSpace: 'nowrap' }}>{groupNames && groupNames.join(', ')}</td>;
            };
            break;
          case 'restriction':
            rowCellFormatter = (restr, { rowData: { mainGroup } }) => <td className="text-center"><span className={`fa fa-${mainGroup === 'free' ? 'unlock' : 'lock'}`} /></td>;
            break;
          case 'typeCode':
            rowCellFormatter = (typeCode, { rowData: { typeDescription } }) => (
              <td>
                {typeDescription}
              </td>
            );
            break;
          case 'addToPool':
            newCode = 'actions';
            headerCellFormatter = actionHeaderCellFormatter;
            rowCellFormatter = (_, { rowData }) => (
              <Table.Actions>
                <Table.Button
                  onClick={() => onContentPicked(rowData)}
                >
                  <FormattedMessage id="cms.label.add" />
                </Table.Button>
              </Table.Actions>
            );
            break;
          case 'onLine':
            newCode = 'status';
            rowCellFormatter = (onLine, { rowData }) => {
              const { status, onLine: hasPublicVersion } = rowData;
              const { color, title } = getContentStatusDetails(status, hasPublicVersion, intl);
              return (
                <td className="text-center">
                  <span className={`ContentsFilter__status ContentsFilter__status--${color}`} title={title} />
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

          default:
            break;
        }
        return {
          property: newCode,
          header: {
            label: intl.formatMessage({ id: `cms.contents.${code}` }),
            props: {
              index: i,
              rowSpan: 1,
              colSpan: 1,
            },
            [[code, newCode].includes('actions') || code === 'groups' ? 'formatters' : 'customFormatters']: [headerCellFormatter],
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
      intl, totalItems, page, pageSize, perPageOptions, sortingColumns, lastPage,
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

    const messages = Object.keys(paginatorMessages).reduce((acc, curr) => (
      { ...acc, [curr]: intl.formatMessage(paginatorMessages[curr]) }
    ), {});

    return (
      <Col>
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
            <Table.Body rows={contents} rowKey="id" className="app-tour-step-19" />
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
            messages={messages}
          />
        </div>
      </Col>
    );
  }
}

ContentsFilterTable.propTypes = {
  intl: intlShape.isRequired,
  activeColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  availableColumns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  contents: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  page: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onFilteredSearch: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
  perPageOptions: PropTypes.arrayOf(PropTypes.number),
  sortingColumns: PropTypes.shape({}).isRequired,
  pickedContents: PropTypes.arrayOf(PropTypes.string),
  onSetSort: PropTypes.func.isRequired,
  selectedRows: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectRow: PropTypes.func.isRequired,
  onSelectAllRows: PropTypes.func,
  onContentPicked: PropTypes.func,
};

ContentsFilterTable.defaultProps = {
  perPageOptions: [5, 10, 15, 25, 50],
  onSelectAllRows: () => {},
  pickedContents: null,
  onContentPicked: () => {},
};

export default ContentsFilterTable;
