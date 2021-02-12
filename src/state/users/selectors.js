import { createSelector } from 'reselect';

export const getUsers = state => state.apps.cms.users;
export const getUsersIdList = state => state.apps.cms.users.list;
export const getUsersMap = state => state.apps.cms.users.map;
export const getSelectedUserAuthorities = state => state.apps.cms.users.authorities;

export const getUserList = createSelector(
  [getUsersMap, getUsersIdList],
  (UsersMap, idList) => idList.map(id => (UsersMap[id])),
);
