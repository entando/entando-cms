import { createSelector } from 'reselect';

export const getContents = state => state.contents;

export const getContentList = createSelector(
  getContents,
  contents => contents.list,
);
