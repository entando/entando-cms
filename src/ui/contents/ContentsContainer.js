import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { routeConverter } from '@entando/utils';
import { addToast, TOAST_SUCCESS } from '@entando/messages';
import {
  setQuickFilter, checkStatus, checkAccess, checkAuthor, sendCloneContent,
  setCurrentAuthorShow, setCurrentStatusShow, setCurrentColumnsShow, fetchContentsPaged,
  setContentType, setGroup, setSort, selectRow, selectAllRows, resetJoinContentCategories,
  setTabSearch,
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
import { getPagination } from 'state/pagination/selectors';
import { getContentTypeList } from 'state/content-type/selectors';
import { getLoading } from 'state/loading/selectors';
import { getGroups } from 'state/edit-content/selectors';
import { getLocale } from 'state/locale/selectors';
import { getUsername } from '@entando/apimanager';
import { DELETE_CONTENT_MODAL_ID } from 'ui/contents/DeleteContentModal';
import { PUBLISH_CONTENT_MODAL_ID } from 'ui/contents/PublishContentModal';
import { JOIN_CATEGORIES_MODAL_ID } from 'ui/contents/JoinCategoriesModal';
import { WORK_MODE_EDIT, WORK_MODE_ADD } from 'state/edit-content/types';
import Contents from 'ui/contents/Contents';

const paramsForStatusAndAuthor = (status, author) => {
  const statusParams = status === 'published' ? '?status=published' : `?filters[0].attribute=status&filters[0].value=${status}`;
  const authorParams = `${author === 'all' ? '' : `&filters[1].attribute=firstEditor&filters[1].value=${author}`}`;
  return `${statusParams}${authorParams}`;
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
  });
};

export const mapDispatchToProps = (dispatch, { intl, history }) => ({
  onDidMount: () => {
    dispatch(fetchContentsPaged());
    dispatch(fetchCategoryTree());
    dispatch(fetchGroups({ page: 1, pageSize: 0 }));
    dispatch(fetchContentTypeListPaged({ page: 1, pageSize: 0 }));
  },
  onSetQuickFilter: filter => dispatch(setQuickFilter(filter)),
  onFilteredSearch: (fetchParams, pagination, sortParams, tabSearch) => dispatch(
    fetchContentsPaged(fetchParams, pagination, sortParams, tabSearch),
  ),
  onSetTabSearch: tabSearch => dispatch(setTabSearch(tabSearch)),
  onCheckStatus: status => dispatch(checkStatus(status)),
  onCheckAccess: access => dispatch(checkAccess(access)),
  onCheckAuthor: author => dispatch(checkAuthor(author)),
  onSetCurrentAuthorShow: (author, status) => {
    dispatch(setCurrentAuthorShow(author));
    dispatch(fetchContentsPaged(paramsForStatusAndAuthor(status, author)), null, null, true);
  },
  onSetCurrentStatusShow: (status, author) => {
    dispatch(setCurrentStatusShow(status));
    dispatch(fetchContentsPaged(paramsForStatusAndAuthor(status, author)), null, null, true);
  },
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
  onClickJoinCategories: (contents) => {
    dispatch(resetJoinContentCategories());
    dispatch(setVisibleModal(JOIN_CATEGORIES_MODAL_ID));
    dispatch(setInfo({ contents }));
  },
  onClickClone: (content) => {
    const cloneContent = content;
    delete cloneContent.id;
    dispatch(setWorkMode(WORK_MODE_EDIT));
    dispatch(sendCloneContent(cloneContent)).then((res) => {
      if (res) {
        dispatch(
          addToast(
            intl.formatMessage({ id: 'cms.contents.cloned', defaultMessage: 'Cloned' }),
            TOAST_SUCCESS,
          ),
        );
        history.push(
          routeConverter(ROUTE_CMS_EDIT_CONTENT, { id: res[0].id }),
        );
      }
    });
  },
});

const ContentsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Contents);

export default withRouter(injectIntl(ContentsContainer));
