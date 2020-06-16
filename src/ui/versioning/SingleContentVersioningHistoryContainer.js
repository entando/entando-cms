import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getLoading } from 'state/loading/selectors';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';

import SingleContentVersioningHistory from 'ui/versioning/SingleContentVersioningHistory';
import { getVersioningList } from 'state/versioning/selectors';
import { fetchSingleVersioningHistory, setSelectedVersioningType } from 'state/versioning/actions';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { RESTORE_CONTENT_VERSION_MODAL_ID } from 'ui/versioning/RestoreContentVersionModal';

export const mapStateToProps = state => ({
  loading: getLoading(state).versionings,
  page: getCurrentPage(state),
  totalItems: getTotalItems(state),
  pageSize: getPageSize(state),
  versioningList: getVersioningList(state),
});

export const mapDispatchToProps = (dispatch, { id, match: { params } }) => ({
  onDidMount: (page = { page: 1, pageSize: 10 }) => {
    dispatch(setSelectedVersioningType('contents'));
    dispatch(fetchSingleVersioningHistory(params.contentId || id, page));
  },
  fetchVersioningList: (page) => {
    dispatch(fetchSingleVersioningHistory(params.contentId || id, page));
  },
  onClickRestore: (item) => {
    dispatch(setVisibleModal(RESTORE_CONTENT_VERSION_MODAL_ID));
    dispatch(setInfo(item));
  },
});

const SingleContentVersioningHistoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SingleContentVersioningHistory);

export default withRouter(SingleContentVersioningHistoryContainer);
