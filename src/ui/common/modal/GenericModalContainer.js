import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getVisibleModal } from 'state/modal/selectors';
import GenericModal from 'ui/common/modal/GenericModal';

export const mapStateToProps = state => ({
  visibleModal: getVisibleModal(state),
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  onCloseModal: () => {
    dispatch(setVisibleModal(''));
    const { modalCloseCleanup } = ownProps || {};
    if (modalCloseCleanup) {
      modalCloseCleanup();
    }
  },
});

const GenericModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GenericModal);

export default GenericModalContainer;
