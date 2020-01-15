import { connect } from 'react-redux';

import PageTreeSelect from 'ui/common/page/PageTreeSelect';
import { handleExpandPage } from 'state/pages/actions';
import { getPageTreePages } from 'state/pages/selectors';

export const mapStateToProps = state => ({
  pages: getPageTreePages(state),
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: () => dispatch(handleExpandPage()),
  onExpandPage: pageCode => dispatch(handleExpandPage(pageCode)),
});


const PageTreeSelectContainer = connect(mapStateToProps, mapDispatchToProps)(PageTreeSelect);


export default PageTreeSelectContainer;
