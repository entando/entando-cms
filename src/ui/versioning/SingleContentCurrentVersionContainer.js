import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getLoading } from 'state/loading/selectors';

import { fetchContent, fetchGroups } from 'state/edit-content/actions';
import { getContent, getGroups } from 'state/edit-content/selectors';

import SingleContentCurrentVersion from 'ui/versioning/SingleContentCurrentVersion';

const noPage = { page: 1, pageSize: 0 };

export const mapStateToProps = state => ({
  loading: getLoading(state).editContent,
  content: getContent(state),
  groups: getGroups(state),
});

export const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  onDidMount: () => {
    dispatch(fetchContent(`/${params.contentId}`));
    dispatch(fetchGroups(noPage));
  },
});

const SingleContentCurrentVersionContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SingleContentCurrentVersion);

export default withRouter(SingleContentCurrentVersionContainer);
