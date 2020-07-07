import { connect } from 'react-redux';

import { fetchContents } from 'state/contents/actions';
import { getContents } from 'state/contents/selectors';

import ContentsStatusCard from 'ui/contents/status-card/ContentsStatusCard';

const mapStateToProps = state => ({
  contents: getContents(state),
});

const mapDispatchToProps = dispatch => ({
  onDidMount: () => {
    dispatch(fetchContents({ page: 1, pageSize: 0 }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentsStatusCard);
