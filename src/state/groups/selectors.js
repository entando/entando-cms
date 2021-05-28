import { createSelector } from 'reselect';

export const getGroups = state => state.groups;

export const getGroupsIdList = createSelector(
  getGroups,
  groups => (groups.list || []),
);

export const getGroupsMap = createSelector(
  getGroups,
  groups => (groups.map || {}),
);

export const getGroupsTotal = createSelector(
  getGroups,
  groups => (groups.total || 0),
);

export const getSelectedGroup = createSelector(
  getGroups,
  groups => (groups.selected || {}),
);

export const getGroupsList = createSelector(
  [getGroupsMap, getGroupsIdList],
  (groupsMap, idList) => idList.map(id => (groupsMap[id])),
);

export const getGroupEntries = createSelector(
  getGroups,
  groups => groups.groupEntries,
);
