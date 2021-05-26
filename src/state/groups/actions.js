import { addToast, addErrors, TOAST_ERROR } from '@entando/messages';

import {
  getGroups,
  getMyGroups,
  getGroup,
} from 'api/groups';
import { setPage } from 'state/pagination/actions';
import { toggleLoading } from 'state/loading/actions';
import {
  SET_GROUPS,
  SET_SELECTED_GROUP,
  SET_GROUPS_TOTAL,
  SET_GROUP_ENTRIES,
} from 'state/groups/types';

export const setGroups = groups => ({
  type: SET_GROUPS,
  payload: {
    groups,
  },
});

export const setGroupsTotal = groupsTotal => ({
  type: SET_GROUPS_TOTAL,
  payload: {
    groupsTotal,
  },
});

export const setSelectedGroup = group => ({
  type: SET_SELECTED_GROUP,
  payload: {
    group,
  },
});

export const setGroupEntries = groups => ({
  type: SET_GROUP_ENTRIES,
  payload: {
    groups,
  },
});

// thunk

export const fetchMyGroups = () => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('groups'));
  getMyGroups().then((response) => {
    response.json().then((data) => {
      if (response.ok) {
        dispatch(setGroups(data.payload));
        dispatch(toggleLoading('groups'));
        resolve();
      } else {
        dispatch(addErrors(data.errors.map(err => err.message)));
        dispatch(toggleLoading('groups'));
        resolve();
      }
    });
  }).catch(() => {});
});

export const fetchGroupsTotal = () => dispatch => (
  new Promise((resolve) => {
    getGroups({ page: 1, pageSize: 1 }).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setGroupsTotal(data.metaData.totalItems));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const fetchGroup = groupCode => dispatch => (
  new Promise((resolve) => {
    getGroup(groupCode).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setSelectedGroup(data.payload));
          resolve();
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          resolve();
        }
      });
    }).catch(() => {});
  })
);

export const fetchAllGroupEntries = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('groups'));
  getGroups(page, params).then((response) => {
    response.json().then((data) => {
      if (response.ok) {
        dispatch(setGroupEntries(data.payload));
        dispatch(toggleLoading('groups'));
        dispatch(setPage(data.metaData));
        resolve();
      } else {
        dispatch(addErrors(data.errors.map(err => err.message)));
        data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        dispatch(toggleLoading('groups'));
        resolve();
      }
    });
  }).catch(() => {});
});
