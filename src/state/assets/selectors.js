import { createSelector } from 'reselect';

export const getAssetsState = state => state.apps.cms.assets;

export const getAssetsList = createSelector(
  getAssetsState,
  assets => assets.assets,
);

export const getFilteringCategories = createSelector(
  getAssetsState,
  assets => assets.filteringCategories,
);

export const getLanguage = createSelector(
  getAssetsState,
  assets => assets.language,
);

export const getFileType = createSelector(
  getAssetsState,
  assets => assets.fileType,
);

export const getAssetsView = createSelector(
  getAssetsState,
  assets => assets.assetsView,
);

export const getSort = createSelector(
  getAssetsState,
  assets => assets.sort,
);

export const getPaginationOptions = createSelector(
  getAssetsState,
  assets => assets.paginationOptions,
);

export const getActiveFilters = createSelector(
  getAssetsState,
  assets => assets.activeFilters,
);
