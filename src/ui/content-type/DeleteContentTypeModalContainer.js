import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
// import { sendDeleteDataType } from 'state/data-types/actions';
import DeleteContentTypeModal from 'ui/content-type/DeleteContentTypeModal';

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = dispatch => ({
  onConfirmDelete: () => {
    // dispatch(sendDeleteContentType(contentTypeCode));
    dispatch(setVisibleModal(''));
  },
});

const DeleteContentTypeModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteContentTypeModal);

export default DeleteContentTypeModalContainer;
