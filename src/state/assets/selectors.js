import { createSelector } from 'reselect';
import { get } from 'lodash';
import { getGroupsMap } from 'state/groups/selectors';

export const removePixelWord = word => word.replace(' pixels', '');

export const condenseAssetInfo = (asset) => {
  const domain = new URL(process.env.REACT_APP_DOMAIN);
  const { versions, metadata } = asset;
  const dimension = `${removePixelWord(metadata['Image Width'])}x${removePixelWord(metadata['Image Height'])} px`;
  const origpath = versions[0].path;
  const sizes = ['orig', 'sm', 'md', 'lg'];
  const newVersions = versions.map((img, i) => ({
    ...img,
    sizetype: sizes[i],
    path: `${domain.origin}${get(img, 'path', '')}`,
    dimensions: i === 0 ? dimension : img.dimensions,
  }));
  const filestrparts = origpath.split('/');
  const filename = filestrparts[filestrparts.length - 1];
  const newMetadata = {
    ...metadata,
    type: metadata['Detected File Type Name'],
    dimension,
    filename,
  };
  return {
    ...asset,
    versions: newVersions,
    metadata: newMetadata,
  };
};

export const getAssetsState = state => state.apps.cms.assets;

export const getAssetsIdList = createSelector(
  getAssetsState,
  state => state.assets,
);

export const getAssetsMap = createSelector(
  getAssetsState,
  state => state.assetsMap,
);

export const getAssetsList = createSelector(
  [getAssetsMap, getAssetsIdList, getGroupsMap],
  (assetsMap, idList, groups) => idList.map((id) => {
    const asset = assetsMap[id];
    return {
      ...asset,
      group: groups[asset.group] || asset.group,
    };
  }),
);

export const getListFilterParams = createSelector(
  getAssetsState,
  state => state.filterParams,
);

export const getFilteringCategories = createSelector(
  getAssetsState,
  assets => assets.filteringCategories,
);

export const getFileType = createSelector(
  getAssetsState,
  assets => assets.fileType,
);

export const getAssetsView = createSelector(
  getAssetsState,
  assets => assets.assetsView,
);

export const getPaginationOptions = createSelector(
  getAssetsState,
  assets => assets.paginationOptions,
);

export const getActiveFilters = createSelector(
  getAssetsState,
  assets => assets.activeFilters,
);

export const getAssetSearchKeyword = createSelector(
  getAssetsState,
  state => state.keyword,
);
