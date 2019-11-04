import { connect } from 'react-redux';
import { addToast, TOAST_SUCCESS } from '@entando/messages';
import { injectIntl, defineMessages } from 'react-intl';
import { get } from 'lodash';
import { initialize } from 'redux-form';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { getSelectedGroup } from 'state/groups/selectors';
import { fetchCategoryTreeAll } from 'state/categories/actions';
import { getCategoryTree } from 'state/categories/selectors';
import { getLanguage } from 'state/assets/selectors';
import { sendPostAssetEdit } from 'state/assets/actions';

import EditAssetFormModal from 'ui/assets/EditAssetFormModal';

const editAssetMsgs = defineMessages({
  saved: {
    id: 'cms.assets.form.updated',
    defaultMessage: '{name} saved.',
  },
});

const mapStateToProps = (state) => {
  const assetInfo = getInfo(state);
  const imgSrc = get(assetInfo, 'versions[0].path', '');
  return {
    assetInfo,
    imgSrc,
    group: getSelectedGroup(state),
    language: getLanguage(state),
    categories: getCategoryTree(state),
  };
};

const mapDispatchToProps = (dispatch, { intl }) => ({
  onModalOpen: (info) => {
    dispatch(fetchCategoryTreeAll());
    dispatch(initialize('editassetformmodal', info));
  },
  onModalClose: () => {
    dispatch(setVisibleModal(''));
  },
  onSubmit: ({
    file,
    id,
    description,
    categories,
    metadata: { filename },
  }) => {
    dispatch(sendPostAssetEdit({
      id,
      description,
      categories,
      filename,
    }, file)).then((res) => {
      if (res) {
        dispatch(setVisibleModal(''));
        dispatch(
          addToast(
            intl.formatMessage(editAssetMsgs.saved, { name: res.description }),
            TOAST_SUCCESS,
          ),
        );
      }
    });
  },
});

const EditAssetFormModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(EditAssetFormModal);

export default injectIntl(EditAssetFormModalContainer);
