import { connect } from 'react-redux';
import AttachAttributeField from 'ui/edit-content/content-attributes/AttachAttributeField';
import { setVisibleModal } from 'state/modal/actions';
import {
  setListFilterParams,
  fetchAssetsPaged,
  pageDefault,
} from 'state/assets/actions';
import { fetchGroups } from 'state/groups/actions';
import { fetchCategoryTree } from 'state/categories/actions';

import { ATTACH_MODAL_ID } from 'ui/edit-content/content-attributes/assets/AssetBrowserModal';

export const mapDispatchToProps = dispatch => ({
  assetListBegin: () => {
    dispatch(setListFilterParams({}));
    dispatch(fetchGroups({ page: 1, pageSize: 0 }));
    dispatch(fetchAssetsPaged(pageDefault, 'file'));
    dispatch(fetchCategoryTree());
  },
  onClickAdd: name => dispatch(dispatch(setVisibleModal(`${ATTACH_MODAL_ID}${name}`))),
});

const AttachAttributeFieldContainer = connect(
  null,
  mapDispatchToProps,
)(AttachAttributeField);

export default AttachAttributeFieldContainer;
