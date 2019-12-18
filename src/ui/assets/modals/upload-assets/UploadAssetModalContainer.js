import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import { injectIntl, defineMessages } from 'react-intl';
import { addToast, TOAST_SUCCESS } from '@entando/messages';

import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { getGroupsList } from 'state/groups/selectors';
import { fetchCategoryTreeAll } from 'state/categories/actions';
import { getCategoryTree } from 'state/categories/selectors';
import { getLocale } from 'state/locale/selectors';
import { sendUploadAsset } from 'state/assets/actions';

import UploadAssetModal, { FORM_NAME } from 'ui/assets/modals/upload-assets/UploadAssetModal';

const uploadAssetMsgs = defineMessages({
  uploaded: {
    id: 'cms.assets.form.uploaded',
    defaultMessage: '{name} uploaded.',
  },
  failedUpload: {
    id: 'cms.assets.form.failedUpload',
    defaultMessage: 'Failed to upload {name}.',
  },
});

export const mapStateToProps = state => ({
  files: getInfo(state).files || [],
  group: getGroupsList(state),
  language: getLocale(state),
  categories: getCategoryTree(state),
});

export const mapDispatchToProps = (dispatch, { intl }) => ({
  onModalOpen: (payload) => {
    dispatch(fetchCategoryTreeAll());
    dispatch(initialize(FORM_NAME, payload));
  },
  onSubmit: ({ files }) => {
    const uploadPromises = files.map((file, index) => dispatch(sendUploadAsset(file, index))
      .then((res) => {
        if (res) {
          dispatch(
            addToast(
              intl.formatMessage(uploadAssetMsgs.uploaded, { name: res.name }),
              TOAST_SUCCESS,
            ),
          );
        }
        return res;
      })
      .catch(res => res)); // Passing through to manage it on Promise.all() catch

    Promise.all(uploadPromises)
      .then(() => {
        dispatch(setVisibleModal(''));
      })
      .catch(() => {
        dispatch(setVisibleModal(''));
      });
  },
});

const UploadAssetModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(UploadAssetModal);

export default injectIntl(UploadAssetModalContainer);
