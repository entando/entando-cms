import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { sendDeleteAsset } from 'state/assets/actions';
import { addToast, TOAST_SUCCESS } from '@entando/messages';
import { defineMessages, injectIntl } from 'react-intl';

import DeleteAssetModal from 'ui/assets/DeleteAssetModal';

const contentModelMsgs = defineMessages({
  removed: {
    id: 'cms.contentmodel.list.infoDeleted',
    defaultMessage: '{name} deleted.',
  },
});

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = (dispatch, { intl }) => ({
  onConfirmDelete: (asset) => {
    dispatch(sendDeleteAsset(asset.id)).then((res) => {
      if (res) {
        dispatch(
          addToast(
            intl.formatMessage(contentModelMsgs.removed, { modelname: asset.description }),
            TOAST_SUCCESS,
          ),
        );
      }
    });
    dispatch(setVisibleModal(''));
  },
});

const DeleteAssetModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteAssetModal);

export default injectIntl(DeleteAssetModalContainer);