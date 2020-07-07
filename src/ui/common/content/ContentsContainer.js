import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';
import {
  setQuickFilter, setCurrentAuthorShow, setCurrentStatusShow,
  fetchContentsPaged, setContentType, setSort, resetAuthorStatus,
} from 'state/contents/actions';
import { setCurrentColumnsShow } from 'state/table-columns/actions';
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
import { getContentTypeList } from 'state/content-type/selectors';
import { getLoading } from 'state/loading/selectors';
import { getGroups } from 'state/edit-content/selectors';
import { getLocale } from 'state/locale/selectors';
import { getUsername } from '@entando/apimanager';
import Contents from 'ui/common/content/Contents';

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
  })}${published ? '&status=published' : ''}`;

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
    page,
    lastPage,
    totalItems,
    pageSize,
    sortingColumns: getSortingColumns(state),
    selectedRows: getSelectedRows(state),
    currentUsername: getUsername(state),
  });
};

export const mapDispatchToProps = (dispatch, { status: contentStatus, author: contentAuthor }) => ({
  onDidMount: () => {
    dispatch(fetchContentsPaged(paramsForStatusAndAuthor(contentStatus, contentAuthor),
      null, null, false));
    dispatch(fetchCategoryTree());
    dispatch(fetchGroups({ page: 1, pageSize: 0 }));
    dispatch(fetchContentTypeListPaged({ page: 1, pageSize: 0 }));
  },
  onSetQuickFilter: filter => dispatch(setQuickFilter(filter)),
  onFilteredSearch: (fetchParams, pagination, sortParams, tabSearch) => dispatch(
    fetchContentsPaged(fetchParams, pagination, sortParams, tabSearch),
  ),
  onSetCurrentAuthorShow: (author, status) => {
    dispatch(setCurrentAuthorShow(author));
    dispatch(fetchContentsPaged(paramsForStatusAndAuthor(status, author)), null, null, true);
  },
  onSetCurrentStatusShow: (status, author) => {
    dispatch(setCurrentStatusShow(status));
    dispatch(fetchContentsPaged(paramsForStatusAndAuthor(status, author)), null, null, true);
  },
  onAdvancedFilterSearch: () => {
    dispatch(fetchContentsPaged(null, null, null, false));
    dispatch(resetAuthorStatus());
  },
  onSetCurrentColumnsShow: columns => dispatch(setCurrentColumnsShow(columns)),
  onSetContentType: contentType => dispatch(setContentType(contentType)),
  onSetSort: sort => dispatch(setSort(sort)),
});

const ContentsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Contents);

export default withRouter(injectIntl(ContentsContainer));
