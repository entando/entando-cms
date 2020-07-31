import { connect } from 'react-redux';
import ImageAttributeField from 'ui/edit-content/content-attributes/ImageAttributeField';
import { setVisibleModal } from 'state/modal/actions';
import {
  fetchAssetsPaged,
  changeFileType,
} from 'state/assets/actions';
import { fetchGroups } from 'state/groups/actions';
import { fetchCategoryTree } from 'state/categories/actions';

import { IMAGE_MODAL_ID } from 'ui/edit-content/content-attributes/assets/AssetBrowserModal';

export const mapDispatchToProps = (dispatch, ownProps) => ({
  assetListBegin: () => {
    const { mainGroup } = ownProps;
    dispatch(fetchGroups({ page: 1, pageSize: 0 }));
    dispatch(changeFileType('image'));
    dispatch(fetchAssetsPaged(undefined, undefined, mainGroup));
    dispatch(fetchCategoryTree());
  },
  onClickAdd: name => dispatch(dispatch(setVisibleModal(`${IMAGE_MODAL_ID}${name}`))),
});

const ImageAttributeFieldContainer = connect(
  null,
  mapDispatchToProps,
)(ImageAttributeField);

export default ImageAttributeFieldContainer;
