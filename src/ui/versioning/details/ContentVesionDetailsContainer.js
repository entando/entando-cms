import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getLoading } from 'state/loading/selectors';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';

import ContentVersionDetails from 'ui/versioning/details/ContentVersionDetails';
import { getVersioningList } from 'state/versioning/selectors';
import { fetchSingleVersioningHistory, setSelectedVersioningType } from 'state/versioning/actions';

export const mapStateToProps = state => ({
  loading: getLoading(state).versionings,
  page: getCurrentPage(state),
  totalItems: getTotalItems(state),
  pageSize: getPageSize(state),
  versioningList: getVersioningList(state),
});

export const mapDispatchToProps = (dispatch, { id, match: { params } }) => ({
  onDidMount: (page = { page: 1, pageSize: 10 }) => {
    // fetch content version
  },
});

const ContentVersionDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContentVersionDetails);

export default withRouter(ContentVersionDetailsContainer);
