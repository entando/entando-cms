import {
  addToast, addErrors, TOAST_ERROR,
} from '@entando/messages';

import {
  getUsers,
} from 'api/users';
import { setPage } from 'state/pagination/actions';
import { NAMESPACE_USERS } from 'state/pagination/const';
import { toggleLoading } from 'state/loading/actions';
import { SET_USERS } from 'state/users/types';


export const setUsers = users => ({
  type: SET_USERS,
  payload: {
    users,
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
