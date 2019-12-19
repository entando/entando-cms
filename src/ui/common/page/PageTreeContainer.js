import { connect } from 'react-redux';
import PageTree from 'ui/common/page/PageTree';
import { handleExpandPage } from 'state/pages/actions';
import { getPageTreePages } from 'state/pages/selectors';

export const mapStateToProps = state => ({
  pages: getPageTreePages(state),
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: () => dispatch(handleExpandPage()),
  onExpandPage: pageCode => dispatch(handleExpandPage(pageCode)),
});


const PageTreeContainer = connect(mapStateToProps, mapDispatchToProps)(PageTree);


export default PageTreeContainer;
