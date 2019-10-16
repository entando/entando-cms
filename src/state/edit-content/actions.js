import { addErrors, addToast, clearErrors, TOAST_ERROR } from '@entando/messages';
import { initialize } from 'redux-form';

import { getContent, getGroups, postAddContent } from 'api/editContent';
import {
  SET_CONTENT_ENTRY,
  SET_OWNER_GROUP_DISABLE,
  SET_GROUPS,
  SET_WORK_MODE,
  SET_JOINED_CATEGORIES,
} from './types';

export const setContentEntry = (content) => ({
  type: SET_CONTENT_ENTRY,
  payload: { content },
});

export const setJoinedCategories = (categories) => ({
  type: SET_JOINED_CATEGORIES,
  payload: { joinedCategories: categories },
});

export const fetchContent = (params) => (dispatch) =>
  new Promise((resolve) => {
    getContent(params)
      .then((response) => {
        response.json().then((json) => {
          if (response.ok) {
            const content = json.payload[11] || [];
            // @TODO unable to fetch single content due to bug EN6-103
            // change [0] when issue is resolved
            dispatch(setContentEntry(content));
            dispatch(setJoinedCategories(content.categories));
            const { mainGroup, groups, description } = content;
            dispatch(
              initialize('editcontentform', {
                ownerGroup: mainGroup,
                joinGroups: groups,
                contentDescription: description,
              }),
            );
          } else {
            dispatch(addErrors(json.errors.map((err) => err.message)));
          }
          resolve();
        });
      })
      .catch(() => {});
  });

export const setOwnerGroupDisable = (disabled) => ({
  type: SET_OWNER_GROUP_DISABLE,
  payload: { disabled },
});

export const setWorkMode = (mode) => ({
  type: SET_WORK_MODE,
  payload: mode,
});

export const setGroups = (groups) => ({
  type: SET_GROUPS,
  payload: { groups },
});

export const fetchGroups = (params) => (dispatch) =>
  new Promise((resolve) => {
    getGroups(params)
      .then((response) => {
        response.json().then((json) => {
          if (response.ok) {
            dispatch(setGroups(json.payload));
          } else {
            dispatch(addErrors(json.errors.map((err) => err.message)));
          }
          resolve();
        });
      })
      .catch(() => {});
  });

export const sendPostAddContent = (contModelObject) => (dispatch) =>
  new Promise((resolve) =>
    postAddContent(contModelObject)
      .then((response) => {
        response.json().then((json) => {
          if (response.ok) {
            resolve(json.payload);
          } else {
            dispatch(addErrors(json.errors.map((err) => err.message)));
            json.errors.forEach((err) => dispatch(addToast(err.message, TOAST_ERROR)));
            dispatch(clearErrors());
            resolve();
          }
        });
      })
      .catch(() => {}),
  );
