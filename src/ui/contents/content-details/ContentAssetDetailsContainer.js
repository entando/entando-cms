import { connect } from 'react-redux';
import { condenseAssetInfo } from 'state/assets/selectors';
import { getDomain } from '@entando/apimanager';
import ContentAssetDetails from 'ui/contents/content-details/ContentAssetDetails';

export const mapStateToProps = (state, { attributeValue, attributeType }) => {
  const domain = getDomain(state);

  return {
    assetInfo: condenseAssetInfo(attributeValue, domain),
    attributeType,
  };
};

const ContentAssetDetailsContainer = connect(
  mapStateToProps,
  null,
)(ContentAssetDetails);

export default ContentAssetDetailsContainer;
