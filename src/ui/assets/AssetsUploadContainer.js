import { connect } from 'react-redux';
import AssetsUpload from 'ui/assets/AssetsUpload';

import { setVisibleModal, setInfo } from 'state/modal/actions';
import { UPLOAD_ASSET_MODAL_ID } from 'ui/assets/modals/upload-assets/UploadAssetModal';

export const mapDispatchToProps = dispatch => ({
  onDrop: (assets) => {
    const assetInfo = {
      files: assets.map(asset => ({
        filename: asset.name,
        fileObject: asset,
        filePreview: URL.createObjectURL(asset),
        group: '',
        categories: [],
      })),
    };
    dispatch(setInfo(assetInfo));
    dispatch(setVisibleModal(UPLOAD_ASSET_MODAL_ID));
  },
});

export default connect(
  null,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(AssetsUpload);
