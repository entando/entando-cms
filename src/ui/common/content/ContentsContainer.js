import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import {
  setQuickFilter, fetchContentsPaged, setContentType, setSort, resetAuthorStatus,
  checkStatus,
} from 'state/contents/actions';
import { fetchCategoryTree } from 'state/categories/actions';
import { fetchGroups } from 'state/edit-content/actions';
import { fetchContentTypeListPaged } from 'state/content-type/actions';
import {
  getContents, getCurrentQuickFilter, getFilteringCategories,
  getStatusChecked, getAccessChecked, getAuthorChecked, getCurrentAuthorShow,
  getCurrentStatusShow, getSortingColumns,
  getSelectedRows,
} from 'state/contents/selectors';
import { getPagination } from 'state/pagination/selectors';
import { setColumnOrder } from 'state/table-column-order/actions';
import { getColumnOrder } from 'state/table-column-order/selectors';
import { NAMESPACE_CONTENTS } from 'state/pagination/const';
import { getContentTypeList } from 'state/content-type/selectors';
import { getLoading } from 'state/loading/selectors';
import { getGroups } from 'state/edit-content/selectors';
import { getLocale } from 'state/locale/selectors';
import { getUsername } from '@entando/apimanager';
import Contents from 'ui/common/content/Contents';

export const mapStateToProps = (state, ownProps) => {
  const {
    page, lastPage, totalItems, pageSize,
  } = getPagination(state, NAMESPACE_CONTENTS);
  const { ownerGroup } = ownProps;
  return ({
    loading: getLoading(state).contents,
    language: getLocale(state),
    contents: getContents(state),
    currentQuickFilter: getCurrentQuickFilter(state),
    groups: getGroups(state),
    contentTypes: getContentTypeList(state),
    filteringCategories: getFilteringCategories(state),
    statusChecked: getStatusChecked(state),
    accessChecked: getAccessChecked(state),
    authorChecked: getAuthorChecked(state),
    currentAuthorShow: getCurrentAuthorShow(state),
    currentStatusShow: getCurrentStatusShow(state),
    currentColumnsShow: getColumnOrder(state, 'contentListTable'),
    page,
    lastPage,
    totalItems,
    pageSize,
    sortingColumns: getSortingColumns(state),
    selectedRows: getSelectedRows(state),
    currentUsername: getUsername(state),
    ownerGroup,
  });
};

export const mapDispatchToProps = (dispatch, { ownerGroup, joinGroups }) => ({
  onDidMount: () => {
    dispatch(checkStatus('published'));
    dispatch(fetchContentsPaged({ status: '&status=published', ownerGroup, joinGroups }));
    dispatch(fetchCategoryTree());
    dispatch(fetchGroups({ page: 1, pageSize: 0 }));
    dispatch(fetchContentTypeListPaged({ page: 1, pageSize: 0 }));
  },
  onSetQuickFilter: filter => dispatch(setQuickFilter(filter)),
  onFilteredSearch: (params, page, sort) => dispatch(
    fetchContentsPaged({
      page, sort, status: '&status=published', ownerGroup, joinGroups,
    }),
  ),
  onAdvancedFilterSearch: () => {
    dispatch(fetchContentsPaged({ status: '&status=published', ownerGroup, joinGroups }));
    dispatch(resetAuthorStatus());
  },
  onSetCurrentColumnsShow: columnOrder => dispatch(setColumnOrder(columnOrder, 'contentListTable')),
  onSetContentType: contentType => dispatch(setContentType(contentType)),
  onSetSort: sort => dispatch(setSort(sort)),
});

const ContentsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Contents);

export default withRouter(injectIntl(ContentsContainer));
