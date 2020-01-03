import { connect } from 'react-redux';
import { condenseAssetInfo } from 'state/assets/selectors';
import { getDomain } from '@entando/apimanager';
import AssetAttributeFieldInfo from 'ui/edit-content/content-attributes/assets/AssetAttributeFieldInfo';

export const mapStateToProps = (state, { inputValue }) => {
  const domain = getDomain(state);
  const assetInfo = condenseAssetInfo(inputValue, domain);
  const { type: assetType } = assetInfo;
  let tfs = [
    {
      name: 'text',
      label: 'Text',
      value: assetInfo.description,
    },
  ];

  if (assetType === 'image') {
    tfs = [...tfs, ...[{
      name: 'alt',
      label: 'alt',
    },
    {
      name: 'description',
      label: 'description',
    },
    {
      name: 'legend',
      label: 'legend',
    },
    {
      name: 'title',
      label: 'title',
    }]];
  }

  const metaValues = tfs.reduce((prev, curr) => ({
    ...prev,
    [curr.name]: curr.value || '',
  }), {});

  return {
    assetInfo,
    metaProps: tfs,
    metaValues,
  };
};

const AssetAttributeFieldInfoContainer = connect(mapStateToProps, null)(AssetAttributeFieldInfo);

export default AssetAttributeFieldInfoContainer;
