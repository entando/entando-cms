import { connect } from 'react-redux';
import { getContentTemplateList, getContentTemplateFilters } from 'state/content-template/selectors';
import {
  pageDefault,
  setListFilterProps,
  fetchContentTemplateListPaged,
} from 'state/content-template/actions';
import { getLoading } from 'state/loading/selectors';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';

import ContentTemplateList from 'ui/content-template/ContentTemplateList';
import { MODAL_ID } from 'ui/content-template/DeleteContentTemplateModal';

export const mapStateToProps = state => ({
  contentTemplates: getContentTemplateList(state),
  loading: getLoading(state).contentTemplateList,
  page: getCurrentPage(state),
  totalItems: getTotalItems(state),
  pageSize: getPageSize(state),
  filters: getContentTemplateFilters(state),
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: () => {
    dispatch(setListFilterProps({}));
    dispatch(fetchContentTemplateListPaged(pageDefault));
  },
  fetchList: (page = pageDefault) => (
    dispatch(fetchContentTemplateListPaged(page))
  ),
  onClickDelete: (item) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo(item));
  },
});

const ContentTemplateListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContentTemplateList);

export default ContentTemplateListContainer;
