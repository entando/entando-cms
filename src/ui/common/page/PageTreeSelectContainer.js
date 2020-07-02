import { connect } from 'react-redux';

import { PageTreeSelector } from '@entando/pagetreeselector';
import {
  handleExpandPage, fetchPageTreeAll, collapseAll, clearTree,
  HOMEPAGE_CODE,
} from 'state/pages/actions';
import { getPageTreePages } from 'state/pages/selectors';
import { getLoading } from 'state/loading/selectors';


export const mapStateToProps = state => ({
  pages: getPageTreePages(state),
  loading: getLoading(state).pageTree,
});

export const mapDispatchToProps = (dispatch, { status, ownerGroup }) => ({
  onDidMount: () => {
    dispatch(clearTree());
    dispatch(handleExpandPage(HOMEPAGE_CODE, status, [ownerGroup, 'free']));
  },
  onExpandPage: pageCode => dispatch(handleExpandPage(pageCode, status, [ownerGroup, 'free'])),
  onExpandAll: () => dispatch(fetchPageTreeAll()),
  onCollapseAll: () => dispatch(collapseAll()),
});


const PageTreeSelectContainer = connect(mapStateToProps, mapDispatchToProps)(PageTreeSelector);


export default PageTreeSelectContainer;
