import { createSelector } from 'reselect';
import { get } from 'lodash';
import { getGroupsMap } from 'state/groups/selectors';
import { getCategoriesMap } from 'state/categories/selectors';
import { getDomain } from '@entando/apimanager';

export const removePixelWord = word => word.replace(' pixels', '');

const getURLAbsolute = (domain, url) => {
  const isAbs = /^(?:[a-z]+:)?\/\//i.test(domain);
  if (!isAbs) {
    return url;
  }
  const theURL = new URL(domain);
  return `${theURL.origin}${url}`;
};

export const condenseAssetInfo = (asset, domain) => {
  const { versions, metadata } = asset;
  if (!metadata) {
    const newAsset = Object.assign(asset, { path: getURLAbsolute(domain, get(asset, 'path', '')) });
    return newAsset;
  }
  const dimension = `${removePixelWord(metadata['Image Width'])}x${removePixelWord(metadata['Image Height'])} px`;
  const origpath = versions[0].path;
  const sizes = ['orig', 'sm', 'md', 'lg'];
  const newVersions = versions.map((img, i) => ({
    ...img,
    sizetype: sizes[i],
    path: getURLAbsolute(domain, get(img, 'path', '')),
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
  const isImg = asset.type === 'image';
  return {
    ...asset,
    versions: newVersions,
    metadata: newMetadata,
    downloadUrl: isImg ? newVersions[0].path : asset.path,
    previewUrl: isImg ? newVersions[1].path : null,
    previewLgUrl: isImg ? newVersions[3].path : null,
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
  [getAssetsMap, getAssetsIdList, getGroupsMap, getDomain, getCategoriesMap],
  (assetsMap, idList, groups, domain, categoriesMap) => idList.map((id) => {
    const asset = condenseAssetInfo(assetsMap[id], domain);
    const { categories = [] } = asset;
    const namedCategories = categories.map(c => categoriesMap[c] || c);
    return {
      ...asset,
      group: groups[asset.group] || asset.group,
      categories: namedCategories,
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

export const getAssetsCount = createSelector(
  getAssetsState,
  state => state.assetsCount,
);
