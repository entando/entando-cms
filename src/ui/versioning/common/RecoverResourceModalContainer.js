import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { sendRecoverResource } from 'state/versioning/actions';
import { addToast, TOAST_SUCCESS } from '@entando/messages';
import { defineMessages, injectIntl } from 'react-intl';

import RecoverResourceModal from 'ui/versioning/common/RecoverResourceModal';

const recoverResourceMsgs = defineMessages({
  removed: {
    id: 'cms.versioning.resource.infoRecovered',
    defaultMessage: '{name} recovered.',
  },
});

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = (dispatch, { intl }) => ({
  onConfirmRecover: (resource) => {
    dispatch(sendRecoverResource(resource.id)).then(() => {
      dispatch(
        addToast(
          intl.formatMessage(recoverResourceMsgs.removed, { name: resource.name }),
          TOAST_SUCCESS,
        ),
      );
    });
    dispatch(setVisibleModal(''));
  },
});

const RecoverResourceModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecoverResourceModal);

export default injectIntl(RecoverResourceModalContainer);
