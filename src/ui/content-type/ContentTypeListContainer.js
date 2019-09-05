import { connect } from 'react-redux';
import { getContentTypeList } from 'state/content-type/selectors';
import { fetchContentTypeListPaged } from 'state/content-type/actions';
import { getLoading } from 'state/loading/selectors';
import { setVisibleModal, setInfo } from 'state/modal/actions';

import ContentTypeList from 'ui/content-type/ContentTypeList';
import { MODAL_ID } from 'ui/content-type/DeleteContentTypeModal';

export const mapStateToProps = state => ({
  contentTypes: getContentTypeList(state),
  loading: getLoading(state).contentTypeList,
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: () => dispatch(fetchContentTypeListPaged()),
  onClickDelete: (item) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo(item));
  },
  onConfirmDelete: () => {},
});

const ContentTypeListContainer = connect(mapStateToProps, mapDispatchToProps)(ContentTypeList);

export default ContentTypeListContainer;
