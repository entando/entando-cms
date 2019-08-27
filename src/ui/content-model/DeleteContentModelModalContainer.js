import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { sendDeleteContentModel } from 'state/content-model/actions';
import { addToast, TOAST_SUCCESS } from '@entando/messages';
import { defineMessages, injectIntl } from 'react-intl';

import DeleteContentModelModal from 'ui/content-model/DeleteContentModelModal';

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
  onConfirmDelete: (contModel) => {
    dispatch(sendDeleteContentModel(contModel.id)).then((res) => {
      if (res) {
        dispatch(addToast(
          intl.formatMessage(
            contentModelMsgs.removed,
            { modelname: contModel.descr },
          ),
          TOAST_SUCCESS,
        ));
      }
    });
    dispatch(setVisibleModal(''));
  },
});

const DeleteContentModelModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteContentModelModal);

export default injectIntl(DeleteContentModelModalContainer);
