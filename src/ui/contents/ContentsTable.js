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
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { formatDate, PermissionCheck } from '@entando/utils';
import * as resolve from 'table-resolver';
import DeleteContentModalContainer from 'ui/contents/DeleteContentModalContainer';
import PublishContentModalContainer from 'ui/contents/PublishContentModalContainer';
import JoinCategoriesModalContainer from 'ui/contents/JoinCategoriesModalContainer';
import { withPermissionValues } from 'ui/common/auth/withPermissions';
import { VALIDATE_CONTENTS_PERMISSION } from 'state/permissions/const';
import paginatorMessages from 'ui/common/paginatorMessages';

export const getContentStatusDetails = (status = '', hasPublicVersion, intl) => {
  const statusLowerCase = status.toLowerCase();
  let color = '';
  let titleId = '';
  if (statusLowerCase === 'public') {
    color = 'published';
    titleId = 'cms.content.status.published';
  } else if (statusLowerCase === 'ready') {
    color = 'review';
    if (hasPublicVersion) {
      titleId = 'cms.content.status.pendingChanges.publicNotEqualReady';
    } else {
      titleId = 'cms.content.status.unpublished.ready';
      color = 'unpublished';
    }
  } else {
    color = 'unpublished';
    if (hasPublicVersion) {
      titleId = 'cms.content.status.pendingChanges.publicNotEqualDraft';
      color = 'review';
    } else {
      titleId = 'cms.content.status.unpublished';
    }
  }
  const title = intl.formatMessage({ id: titleId });
  return { color, title };
};

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
      activeColumns, availableColumns, intl, onEditContent, onClickDelete,
      onClickPublish, onClickClone, groups, userPermissions,
    } = this.props;
    const currentActiveColumns = ['selectAll', ...activeColumns];
    const allColumns = [{ code: 'selectAll' }, ...availableColumns];
    return allColumns.filter(ac => currentActiveColumns.includes(ac.code))
      .map((ac, i) => {
        let rowCellFormatter = tableCellFormatter;
        let headerCellFormatter = sortableHeaderCellFormatter;
        const { code } = ac;
        let newCode = code;
        switch (ac.code) {
          case 'description':
            rowCellFormatter = (name, { rowData: { id, attributes } }) => {
              const getAttrValue = attr => (attr.value && attr.value.urlDest)
                || (typeof attr.value !== 'object' && attr.value)
                || (attr.values && typeof attr.values.en !== 'object' && attr.values.en);

              const tooltipDetails = (
                <table className="table" style={{ marginBottom: 0 }}>
                  <tbody>
                    {attributes.filter(attr => getAttrValue(attr)).map(attr => (
                      <tr key={attr.code}>
                        <th>{attr.code}</th>
                        <td>{getAttrValue(attr)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              );

              return (
                <OverlayTrigger
                  placement="top"
                  overlay={(
                    <Tooltip id={`tooltip-${id}`} className="Contents__tablerow-tooltip">
                      {tooltipDetails}
                    </Tooltip>
                  )}
                >
                  <td
                    className="Contents__name-td"
                    style={{ textOverflow: 'ellipsis' }}
                  >
                    {name}

                  </td>
                </OverlayTrigger>
              );
            };
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
          case 'actions':
            headerCellFormatter = actionHeaderCellFormatter;
            rowCellFormatter = (value, { rowData }) => {
              const unpublishDisabled = rowData.status !== 'PUBLIC' && !rowData.onLine;
              const publishDisabled = rowData.status === 'PUBLIC';
              return (
                [
                  <Table.Actions key="1" style={{ width: 'inherit' }}>
                    <div>
                      <Table.DropdownKebab id="actionsKebab" pullRight>
                        <MenuItem onClick={() => onEditContent(rowData.id)}>
                          <FormattedMessage id="cms.label.edit" defaultMessage="Edit" />
                        </MenuItem>
                        <MenuItem
                          onClick={() => !rowData.onLine && onClickDelete(rowData)}
                          disabled={rowData.onLine}
                        >
                          <FormattedMessage id="cms.label.delete" defaultMessage="Delete" />
                        </MenuItem>
                        <MenuItem onClick={() => onClickClone(rowData)}>
                          <FormattedMessage id="cms.contents.clone" defaultMessage="Clone" />
                        </MenuItem>
                        <PermissionCheck
                          requiredPermissions={VALIDATE_CONTENTS_PERMISSION}
                          userPermissions={userPermissions}
                        >
                          <MenuItem
                            onClick={() => !publishDisabled && onClickPublish([rowData], true)}
                            disabled={publishDisabled}
                          >
                            <FormattedMessage id="cms.label.publish" defaultMessage="Publish" />
                          </MenuItem>
                        </PermissionCheck>
                        <PermissionCheck
                          requiredPermissions={VALIDATE_CONTENTS_PERMISSION}
                          userPermissions={userPermissions}
                        >
                          <MenuItem
                            onClick={() => !unpublishDisabled && onClickPublish([rowData], false)}
                            disabled={unpublishDisabled}
                          >
                            <FormattedMessage id="cms.label.unpublish" defaultMessage="Unpublish" />
                          </MenuItem>
                        </PermissionCheck>
                      </Table.DropdownKebab>
                    </div>
                  </Table.Actions>]
              );
            };
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
            [code === 'actions' || code === 'groups' ? 'formatters' : 'customFormatters']: [headerCellFormatter],
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
            messages={messages}
          />
          <DeleteContentModalContainer />
          <PublishContentModalContainer />
          <JoinCategoriesModalContainer />
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
  groups: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  userPermissions: PropTypes.arrayOf(PropTypes.string),
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
  onClickClone: PropTypes.func.isRequired,
};

ContentsTable.defaultProps = {
  perPageOptions: [5, 10, 15, 25, 50],
  userPermissions: [],
};

export default withPermissionValues(ContentsTable);
