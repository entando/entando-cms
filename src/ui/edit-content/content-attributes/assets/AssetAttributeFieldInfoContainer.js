import { connect } from 'react-redux';
import { compact, get } from 'lodash';
import { condenseAssetInfo } from 'state/assets/selectors';
import { getMetadataMapping } from 'state/content-settings/selectors';
import { getDomain } from '@entando/apimanager';
import AssetAttributeFieldInfo from 'ui/edit-content/content-attributes/assets/AssetAttributeFieldInfo';

export const mapStateToProps = (state, { input }) => {
  const domain = getDomain(state);
  const mapping = getMetadataMapping(state);
  const assetInfo = condenseAssetInfo(input.value, domain);
  const { type } = assetInfo;

  const fields = {
    name: {
      name: 'name',
      label: 'Text',
      value: assetInfo.name || assetInfo.description,
    },
  };

  const mapnames = mapping ? Object.keys(mapping) : [];
  if (type === 'image' && mapnames.length > 0) {
    fields.metadata = mapnames.map((mapname) => {
      const returnValues = {
        name: mapname,
        label: mapname,
      };
      if (get(assetInfo, `metadata.${mapname}`, false)) {
        return {
          ...returnValues,
          value: assetInfo.metadata[mapname],
        };
      }

      const metadefaults = mapping[mapname] || [];
      const metavals = compact(
        metadefaults.map(meta => (
          get(assetInfo, `metadata.${meta}`, '')
        )),
      ).join(', ');

      return {
        ...returnValues,
        value: metavals,
      };
    });
  }

  return {
    assetInfo,
    fields,
    mapping,
  };
};

export const mapDispatchToProps = (dispatch, { input }) => ({
  onUpdateValue: (name, value) => {
    if (name === 'name') {
      const ch = { ...input.value, name: value };
      input.onChange(ch);
    } else {
      const ch = {
        ...input.value,
        metadata: {
          ...input.value.metadata,
          [name]: value,
        },
      };
      input.onChange(ch);
    }
  },
  onRemoveValue: () => input.onChange(null),
});

const AssetAttributeFieldInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetAttributeFieldInfo);

export default AssetAttributeFieldInfoContainer;
