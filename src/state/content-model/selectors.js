import { createSelector } from 'reselect';

export const getContentModelState = state => state.apps.cms.contentModel;

export const getContentModelList = createSelector(
  getContentModelState,
  contentModel => contentModel.list,
);

export const getContentModelOpened = createSelector(
  getContentModelState,
  contentModel => contentModel.opened,
);

export const getContentModelFilters = createSelector(
  getContentModelState,
  contentModel => contentModel.filters,
);

export const getContentModelSearchAttribute = createSelector(
  getContentModelState,
  contentModel => contentModel.search,
);
