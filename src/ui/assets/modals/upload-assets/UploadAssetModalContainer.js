import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import { injectIntl, defineMessages } from 'react-intl';
import { addToast, TOAST_SUCCESS, TOAST_ERROR } from '@entando/messages';

import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { getGroupsList } from 'state/groups/selectors';
import { fetchCategoryTreeAll } from 'state/categories/actions';
import { getCategoryTree } from 'state/categories/selectors';
import { getLocale } from 'state/locale/selectors';
import { getLoading } from 'state/loading/selectors';
import { toggleGroupItemLoading } from 'state/loading/actions';
import { sendUploadAsset, fetchAssetsCount } from 'state/assets/actions';

import UploadAssetModal from 'ui/assets/modals/upload-assets/UploadAssetModal';
import { FORM_NAME, LOADING_GROUP } from 'ui/assets/modals/upload-assets/constants';

const uploadAssetMsgs = defineMessages({
  uploaded: {
    id: 'cms.assets.form.uploaded',
    defaultMessage: '{name} uploaded.',
  },
  uploadFailed: {
    id: 'cms.assets.errors.failedToUpload',
    defaultMessage: 'Failed to upload an asset, server error has occurred.',
  },
});

export const mapStateToProps = state => ({
  loading: getLoading(state),
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
    const uploadPromises = files.map(({ fileId, ...file }, index) => {
      dispatch(toggleGroupItemLoading(fileId, LOADING_GROUP));
      return dispatch(sendUploadAsset(file, index))
        .then((res) => {
          dispatch(toggleGroupItemLoading(fileId, LOADING_GROUP));

          if (res && !res.hasError) {
            dispatch(
              addToast(
                intl.formatMessage(uploadAssetMsgs.uploaded, { name: res.name }),
                TOAST_SUCCESS,
              ),
            );
          }
          if (res && res.hasError) {
            dispatch(
              addToast(
                intl.formatMessage(uploadAssetMsgs.uploadFailed),
                TOAST_ERROR,
              ),
            );
          }
          return res;
        });
    });

    Promise.all(uploadPromises)
      .then(() => {
        dispatch(setVisibleModal(''));
        dispatch(fetchAssetsCount('image'));
        dispatch(fetchAssetsCount('file'));
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
