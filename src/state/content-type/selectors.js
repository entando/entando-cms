import { createSelector } from 'reselect';

export const getContentTypeState = (state) => state.contentType;

export const getContentTypeList = createSelector(
  getContentTypeState,
  (contentType) => contentType.list,
);
