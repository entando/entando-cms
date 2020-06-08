import { createSelector } from 'reselect';

export const getVersionings = state => state.apps.cms.versioning;
export const getVersioningsIdList = state => state.apps.cms.versioning.list;
export const getVersioningsMap = state => state.apps.cms.versioning.map;
export const getSelectedVersioningType = state => state.apps.cms.versioning.selected;

export const getVersioningList = createSelector(
  [getVersioningsMap, getVersioningsIdList],
  (VersioningsMap, idList) => idList.map(id => (VersioningsMap[id])),
);
