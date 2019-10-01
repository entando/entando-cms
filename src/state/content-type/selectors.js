import { createSelector } from 'reselect';

export const getContentTypeState = state => state.apps.cms.contentType;

export const getContentTypeList = createSelector(
  getContentTypeState,
  contentType => contentType.list,
);
