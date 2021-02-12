import {
  addToast, addErrors, TOAST_ERROR,
} from '@entando/messages';
import { getUsername } from '@entando/apimanager';

import {
  getUserAuthorities,
  getUsers,
} from 'api/users';
import { setPage } from 'state/pagination/actions';
import { NAMESPACE_USERS } from 'state/pagination/const';
import { toggleLoading } from 'state/loading/actions';
import { SET_USERS, SET_SELECTED_USER_AUTHORITIES } from 'state/users/types';

export const setUsers = users => ({
  type: SET_USERS,
  payload: {
    users,
  },
});

export const setSelectedUserAuthorities = authorities => ({
  type: SET_SELECTED_USER_AUTHORITIES,
  payload: {
    authorities,
  },
});

// thunk
export const fetchUsers = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading('users'));
    getUsers(page, params).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setUsers(json.payload));
          dispatch(setPage(json.metaData, NAMESPACE_USERS));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        dispatch(toggleLoading('users'));
        resolve();
      });
    }).catch(() => {});
  })
);

export const fetchCurrentUserAuthorities = () => async (dispatch, getState) => {
  const username = getUsername(getState());
  try {
    const response = await getUserAuthorities(username);
    const json = await response.json();
    if (response.ok) {
      dispatch(setSelectedUserAuthorities(json.payload));
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
      json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
    }
  } catch (e) {
    // do nothing
  }
};
