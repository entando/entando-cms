import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { routeConverter } from '@entando/utils';
import {
  fetchContents, setQuickFilter, checkStatus, checkAccess, checkAuthor,
  setCurrentAuthorShow, setCurrentStatusShow, setCurrentColumnsShow,
  setContentType, setGroup, setSort, selectRow, selectAllRows,
} from 'state/contents/actions';
import { fetchCategoryTree } from 'state/categories/actions';
import { fetchGroups, setNewContentsType, setWorkMode } from 'state/edit-content/actions';
import { fetchContentTypeListPaged } from 'state/content-type/actions';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import {
  getContents, getCurrentQuickFilter, getFilteringCategories,
  getStatusChecked, getAccessChecked, getAuthorChecked, getCurrentAuthorShow,
  getCurrentStatusShow, getCurrentColumnsShow, getSortingColumns,
  getSelectedRows,
} from 'state/contents/selectors';
import { ROUTE_CMS_EDIT_CONTENT, ROUTE_CMS_ADD_CONTENT } from 'app-init/routes';
import {
  getCurrentPage, getTotalItems, getPageSize, getLastPage,
} from 'state/pagination/selectors';
import { getContentTypeList } from 'state/content-type/selectors';
import { getLoading } from 'state/loading/selectors';
import { getGroups } from 'state/edit-content/selectors';
import { getLocale } from 'state/locale/selectors';
import { DELETE_CONTENT_MODAL_ID } from 'ui/contents/DeleteContentModal';
import { PUBLISH_CONTENT_MODAL_ID } from 'ui/contents/PublishContentModal';
import { WORK_MODE_EDIT, WORK_MODE_ADD } from 'state/edit-content/types';
import Contents from 'ui/contents/Contents';

export const mapStateToProps = state => ({
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
  page: getCurrentPage(state, 'contents'),
  lastPage: getLastPage(state, 'contents'),
  totalItems: getTotalItems(state, 'contents'),
  pageSize: getPageSize(state, 'contents'),
  sortingColumns: getSortingColumns(state),
  selectedRows: getSelectedRows(state),
});

export const mapDispatchToProps = (dispatch, { history }) => ({
  onDidMount: (page = { page: 1, pageSize: 10 }, params) => {
    dispatch(fetchContents(page, params));
    dispatch(fetchCategoryTree());
    dispatch(fetchGroups());
    dispatch(fetchContentTypeListPaged({ page: 1, pageSize: 100 }));
  },
  onSetQuickFilter: filter => dispatch(setQuickFilter(filter)),
  onFilteredSearch: (page, params) => dispatch(fetchContents(page, params)),
  onCheckStatus: status => dispatch(checkStatus(status)),
  onCheckAccess: access => dispatch(checkAccess(access)),
  onCheckAuthor: author => dispatch(checkAuthor(author)),
  onSetCurrentAuthorShow: author => dispatch(setCurrentAuthorShow(author)),
  onSetCurrentStatusShow: status => dispatch(setCurrentStatusShow(status)),
  onSetCurrentColumnsShow: column => dispatch(setCurrentColumnsShow(column)),
  onSetContentType: contentType => dispatch(setContentType(contentType)),
  onSetGroup: group => dispatch(setGroup(group)),
  onSetSort: sort => dispatch(setSort(sort)),
  onSelectRow: contentId => dispatch(selectRow(contentId)),
  onSelectAllRows: checked => dispatch(selectAllRows(checked)),
  onEditContent: (contentId) => {
    dispatch(setWorkMode(WORK_MODE_EDIT));
    history.push(
      routeConverter(ROUTE_CMS_EDIT_CONTENT, { id: contentId }),
    );
  },
  onClickDelete: (item) => {
    dispatch(setVisibleModal(DELETE_CONTENT_MODAL_ID));
    dispatch(setInfo(item));
  },
  onClickPublish: (contents, onLine) => {
    dispatch(setVisibleModal(PUBLISH_CONTENT_MODAL_ID));
    dispatch(setInfo({ contents, onLine }));
  },
  onClickAddContent: (contentType) => {
    dispatch(setWorkMode(WORK_MODE_ADD));
    dispatch(setNewContentsType(contentType));
    history.push(
      routeConverter(ROUTE_CMS_ADD_CONTENT),
    );
  },
});

const ContentsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Contents);

export default withRouter(injectIntl(ContentsContainer));
