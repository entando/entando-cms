import { connect } from 'react-redux';
import { get } from 'lodash';
import { getInfo } from 'state/modal/selectors';

import AssetPhotoCropper from 'ui/assets/cropper/AssetPhotoCropper';

const mapStateToProps = (state) => {
  const assetInfo = getInfo(state);
  const imgSrc = get(assetInfo, 'versions[0].path', '');
  return {
    assetInfo,
    imgSrc,
  };
};

const mapDispatchToProps = dispatch => ({
  onConfirmSave: () => {},
});

const AssetPhotoCropperContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetPhotoCropper);

export default AssetPhotoCropperContainer;
