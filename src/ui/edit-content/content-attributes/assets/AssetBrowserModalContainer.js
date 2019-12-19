import { connect } from 'react-redux';
import AssetBrowserModal from 'ui/edit-content/content-attributes/assets/AssetBrowserModal';

export const mapStateToProps = () => ({
  assetType: 'image',
});

export const mapDispatchToProps = () => ({
  onAssetSelected: () => {},
});

const AssetBrowserModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetBrowserModal);

export default AssetBrowserModalContainer;
