import { connect } from 'react-redux';
import { getContentTypeList } from 'state/content-type/selectors';
import {
  fetchContentTypeListPaged,
  sendPostRefreshContentType,
} from 'state/content-type/actions';
import { getLoading } from 'state/loading/selectors';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';

import ContentTypeList from 'ui/content-type/ContentTypeList';
import { MODAL_ID } from 'ui/content-type/DeleteContentTypeModal';

export const mapStateToProps = state => ({
  contentTypes: getContentTypeList(state),
  loading: getLoading(state).contentTypeList,
  page: getCurrentPage(state),
  totalItems: getTotalItems(state),
  pageSize: getPageSize(state),
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: (page = { page: 1, pageSize: 10 }) => dispatch(fetchContentTypeListPaged(page)),
  onClickDelete: (item) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo(item));
  },
  onClickReload: (code) => {
    dispatch(sendPostRefreshContentType(code));
  },
});

const ContentTypeListContainer = connect(mapStateToProps, mapDispatchToProps)(ContentTypeList);

export default ContentTypeListContainer;
