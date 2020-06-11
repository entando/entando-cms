import { connect } from 'react-redux';
import { getLoading } from 'state/loading/selectors';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';

import SingleContentVersioningHistory from 'ui/versioning/SingleContentVersioningHistory';
import { getVersioningList } from 'state/versioning/selectors';
import { fetchSingleVersioningHistory, setSelectedVersioningType } from 'state/versioning/actions';

export const mapStateToProps = state => ({
  loading: getLoading(state).versionings,
  page: getCurrentPage(state),
  totalItems: getTotalItems(state),
  pageSize: getPageSize(state),
  versioningList: getVersioningList(state),
});

export const mapDispatchToProps = (dispatch, { id }) => ({
  onDidMount: (page = { page: 1, pageSize: 10 }) => {
    dispatch(setSelectedVersioningType('contents'));
    dispatch(fetchSingleVersioningHistory(id, page));
  },
  fetchVersioningList: (page) => {
    dispatch(fetchSingleVersioningHistory(id, page));
  },
});

const SingleContentVersioningHistoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SingleContentVersioningHistory);

export default SingleContentVersioningHistoryContainer;
