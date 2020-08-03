import { connect } from 'react-redux';
import ContentsFilterBrowser from 'ui/widget-forms/contents-filter/ContentsFilterBrowser';
import {
  checkAccess,
  checkAuthor,
  checkStatus,
  fetchContentsPaged,
  resetAuthorStatus, selectSingleRow, setContentType,
  setCurrentAuthorShow,
  setCurrentStatusShow, setGroup,
  setQuickFilter, setSort,
  setTabSearch,
  leaveContentsPage,
} from 'state/contents/actions';
import { setCurrentColumnsShow } from 'state/table-columns/actions';
import { getPagination } from 'state/pagination/selectors';
import { getLoading } from 'state/loading/selectors';
import {
  getAccessChecked, getAuthorChecked,
  getContents, getCurrentAuthorShow,
  getCurrentQuickFilter, getCurrentStatusShow,
  getFilteringCategories, getSelectedRows, getSortingColumns, getStatusChecked,
} from 'state/contents/selectors';
import { getCurrentColumnsShow } from 'state/table-columns/selectors';
import { getLocale } from 'state/locale/selectors';
import { getGroups } from 'state/edit-content/selectors';
import { getContentTypeList } from 'state/content-type/selectors';
import { getUserList } from 'state/users/selectors';
import { getUsername } from '@entando/apimanager';
import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';

import { fetchCategoryTree } from 'state/categories/actions';
import { fetchGroups } from 'state/edit-content/actions';
import { fetchContentTypeListPaged } from 'state/content-type/actions';
import { fetchUsers } from 'state/users/actions';

const STATUS_PUBLISHED = '&status=published';

const noPage = { page: 1, pageSize: 0 };
const paramsForStatusAndAuthor = (status, author) => {
  const published = status === 'published';
  const all = author === 'all';
  const eq = FILTER_OPERATORS.EQUAL;

  const formValues = {
    ...(!published && { status }),
    ...(!all && { author }),
  };
  const operators = {
    ...(!published && { status: eq }),
    ...(!all && { author: eq }),
  };
  const query = `${convertToQueryString({
    formValues,
    operators,
  })}${published ? STATUS_PUBLISHED : ''}`;

  return query.slice(1);
};


export const mapStateToProps = (state) => {
  const {
    page, lastPage, totalItems, pageSize,
  } = getPagination(state, 'contents') || getPagination(state);
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
    currentColumnsShow: getCurrentColumnsShow(state),
    page,
    lastPage,
    totalItems,
    pageSize,
    sortingColumns: getSortingColumns(state),
    selectedRows: getSelectedRows(state),
    currentUsername: getUsername(state),
    users: getUserList(state),
  });
};

export const mapDispatchToProps = (dispatch, {
  compatibility: { ownerGroup, joinGroups } = {},
  fetchOnMount,
}) => ({
  onDidMount: () => {
    dispatch(setCurrentStatusShow('published'));
    if (fetchOnMount) {
      dispatch(fetchContentsPaged(
        { status: '&status=published', ownerGroup, joinGroups },
      ));
    }
    dispatch(fetchCategoryTree());
    dispatch(fetchGroups(noPage));
    dispatch(fetchContentTypeListPaged(noPage));
    dispatch(fetchUsers(noPage));
  },
  onSetQuickFilter: filter => dispatch(setQuickFilter(filter)),
  onFilteredSearch: (params, page, sort, tabSearch) => dispatch(
    fetchContentsPaged({
      params,
      page,
      sort,
      tabSearch,
      status: STATUS_PUBLISHED,
      ownerGroup,
      joinGroups,
    }),
  ),
  onSetTabSearch: tabSearch => dispatch(setTabSearch(tabSearch)),
  onCheckStatus: status => dispatch(checkStatus(status)),
  onCheckAccess: access => dispatch(checkAccess(access)),
  onCheckAuthor: author => dispatch(checkAuthor(author)),
  onSetCurrentAuthorShow: (author, status) => {
    dispatch(setCurrentStatusShow('published'));
    dispatch(setCurrentAuthorShow(author));
    dispatch(fetchContentsPaged({
      params: paramsForStatusAndAuthor(status, author),
      tabSearch: true,
      status: STATUS_PUBLISHED,
      ownerGroup,
      joinGroups,
    }));
  },
  onSetCurrentStatusShow: (status, author) => {
    dispatch(setCurrentStatusShow(status));
    dispatch(fetchContentsPaged({
      params: paramsForStatusAndAuthor(status, author),
      tabSearch: true,
      status: '&status=published',
      ownerGroup,
      joinGroups,
    }));
  },
  onAdvancedFilterSearch: () => {
    dispatch(fetchContentsPaged({ status: '&status=published', ownerGroup, joinGroups }));
    dispatch(resetAuthorStatus());
  },
  onSetCurrentColumnsShow: column => dispatch(setCurrentColumnsShow(column)),
  onSetContentType: contentType => dispatch(setContentType(contentType)),
  onSetGroup: group => dispatch(setGroup(group)),
  onSetSort: sort => dispatch(setSort(sort)),
  onSelectRow: content => dispatch(selectSingleRow(content)),
  onWillUnmount: () => dispatch(leaveContentsPage()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContentsFilterBrowser);
