import { connect } from 'react-redux';
import { routeConverter } from '@entando/utils';
import { withRouter } from 'react-router-dom';
import { defineMessages, injectIntl } from 'react-intl';
import { addToast, TOAST_SUCCESS } from '@entando/messages';

import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { recoverVersion } from 'state/versioning/actions';
import { ROUTE_CMS_EDIT_CONTENT } from 'app-init/routes';

import RestoreContentVersionModal from 'ui/versioning/RestoreContentVersionModal';

const restoreMsgs = defineMessages({
  restored: {
    id: 'cms.versioning.restore.versionRestored',
    defaultMessage: '{version} restored.',
  },
});

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = (dispatch, { intl, history }) => ({
  onConfirmRestore: (contentVersion) => {
    const { versionId, version, contentId } = contentVersion;
    dispatch(recoverVersion(contentId, versionId)).then((res) => {
      if (res) {
        dispatch(
          addToast(
            intl.formatMessage(restoreMsgs.restored, { version }),
            TOAST_SUCCESS,
          ),
        );
        history.push(
          routeConverter(ROUTE_CMS_EDIT_CONTENT, { id: contentId }),
        );
      }
    });
    dispatch(setVisibleModal(''));
  },
});

const RestoreContentVersionModalContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestoreContentVersionModal));

export default injectIntl(RestoreContentVersionModalContainer);
