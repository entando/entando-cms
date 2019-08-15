import { connect } from 'react-redux';
import { getContentModelList } from 'state/content-model/selectors';
import { fetchContentModelListPaged } from 'state/content-model/actions';
import { getLoading } from 'state/loading/selectors';

import ContentModelList from 'ui/content-model/ContentModelList';

export const mapStateToProps = state => ({
  contentModels: getContentModelList(state),
  loading: getLoading(state).contentModelList,
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: () => dispatch(fetchContentModelListPaged()),
});

const ContentModelListContainer = connect(mapStateToProps, mapDispatchToProps)(ContentModelList);

export default ContentModelListContainer;
