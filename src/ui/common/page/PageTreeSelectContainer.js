import { connect } from 'react-redux';

import { PageTreeSelector } from '@entando/pagetreeselector';
import { handleExpandPage } from 'state/pages/actions';
import { getPageTreePages } from 'state/pages/selectors';

import '@entando/pagetreeselector/dist/css/index.css';

export const mapStateToProps = state => ({
  pages: getPageTreePages(state),
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: () => dispatch(handleExpandPage()),
  onExpandPage: pageCode => dispatch(handleExpandPage(pageCode)),
});


const PageTreeSelectContainer = connect(mapStateToProps, mapDispatchToProps)(PageTreeSelector);


export default PageTreeSelectContainer;
