import { connect } from 'react-redux';
import ImageAttributeField from 'ui/edit-content/content-attributes/ImageAttributeField';
import { setVisibleModal } from 'state/modal/actions';

import { MODAL_ID } from 'ui/edit-content/content-attributes/assets/AssetBrowserModal';

export const mapDispatchToProps = dispatch => ({
  onClickAdd: () => dispatch(dispatch(setVisibleModal(MODAL_ID))),
});

const ImageAttributeFieldContainer = connect(
  null,
  mapDispatchToProps,
)(ImageAttributeField);

export default ImageAttributeFieldContainer;
