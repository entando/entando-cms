import { connect } from 'react-redux';
import { getContentModelList } from 'state/content-model/selectors';
import { fetchContentModelListPaged } from 'state/content-model/actions';
import { getLoading } from 'state/loading/selectors';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import ContentModelList from 'ui/content-model/ContentModelList';
import { MODAL_ID } from 'ui/content-model/DeleteContentModelModal';

export const mapStateToProps = (state) => ({
  contentModels: getContentModelList(state),
  loading: getLoading(state).contentModelList,
});

export const mapDispatchToProps = (dispatch) => ({
  onDidMount: () => dispatch(fetchContentModelListPaged()),
  onClickDelete: (item) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo(item));
  },
});

const ContentModelListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContentModelList);

export default ContentModelListContainer;
