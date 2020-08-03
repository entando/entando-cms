import { connect } from 'react-redux';

import { fetchContents } from 'state/contents/actions';
import { getContents } from 'state/contents/selectors';

import { withPermissionValues } from 'ui/common/auth/withPermissions';

import ContentsStatusCard from 'ui/contents/status-card/ContentsStatusCard';
import { getLocale } from 'state/locale/selectors';

const mapStateToProps = state => ({
  contents: getContents(state),
  language: getLocale(state),
});

const mapDispatchToProps = dispatch => ({
  onDidMount: () => {
    dispatch(fetchContents({ page: 1, pageSize: 0 }));
  },
});

const ContentsStatusCardContainer = connect(mapStateToProps,
  mapDispatchToProps)(ContentsStatusCard);

export default withPermissionValues(ContentsStatusCardContainer);
