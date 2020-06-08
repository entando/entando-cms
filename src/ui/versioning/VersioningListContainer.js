import { connect } from 'react-redux';
import { getLoading } from 'state/loading/selectors';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';

import VersioningList from 'ui/versioning/VersioningList';
import { getVersioningList } from 'state/versioning/selectors';
import { fetchVersionings, setSelectedVersioningType } from 'state/versioning/actions';

export const mapStateToProps = state => ({
  loading: getLoading(state).contentTemplateList,
  page: getCurrentPage(state),
  totalItems: getTotalItems(state),
  pageSize: getPageSize(state),
  versioningList: getVersioningList(state),
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: (page = { page: 1, pageSize: 10 }) => {
    dispatch(setSelectedVersioningType('contents'));
    dispatch(fetchVersionings(page));
  },
  fetchVersioningList: (page) => {
    dispatch(fetchVersionings(page));
  },
});

const VersioningListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(VersioningList);

export default VersioningListContainer;
