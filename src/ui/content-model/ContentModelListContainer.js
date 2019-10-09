import { connect } from 'react-redux';
import { getContentModelList, getContentModelFilters } from 'state/content-model/selectors';
import { fetchContentModelListPaged } from 'state/content-model/actions';
import { getLoading } from 'state/loading/selectors';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';

import ContentModelList from 'ui/content-model/ContentModelList';
import { MODAL_ID } from 'ui/content-model/DeleteContentModelModal';

export const mapStateToProps = state => ({
  contentModels: getContentModelList(state),
  loading: getLoading(state).contentModelList,
  page: getCurrentPage(state),
  totalItems: getTotalItems(state),
  pageSize: getPageSize(state),
  filters: getContentModelFilters(state),
});

export const mapDispatchToProps = dispatch => ({
  fetchList: (page = { page: 1, pageSize: 10 }) => (
    dispatch(fetchContentModelListPaged(page))
  ),
  onClickDelete: (item) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo(item));
  },
});

const ContentModelListContainer = connect(mapStateToProps, mapDispatchToProps)(ContentModelList);

export default ContentModelListContainer;
