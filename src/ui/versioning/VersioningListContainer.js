import { connect } from 'react-redux';
import { getLoading } from 'state/loading/selectors';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';

import VersioningList from 'ui/versioning/VersioningList';

export const mapStateToProps = state => ({
  loading: getLoading(state).contentTemplateList,
  page: getCurrentPage(state),
  totalItems: getTotalItems(state),
  pageSize: getPageSize(state),
});

export const mapDispatchToProps = () => ({
  onDidMount: () => {
  },
});

const VersioningListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(VersioningList);

export default VersioningListContainer;
