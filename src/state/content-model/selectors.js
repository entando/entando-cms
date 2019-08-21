import { createSelector } from 'reselect';

export const getContentModelState = state => state.contentModel;

export const getContentModelList = createSelector(
  getContentModelState,
  contentModel => contentModel.list,
);
