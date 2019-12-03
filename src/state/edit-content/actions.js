import {
  addErrors, addToast, clearErrors, TOAST_ERROR,
} from '@entando/messages';
import { initialize } from 'redux-form';
import moment from 'moment';

import {
  getContent, getGroups, postAddContent, putUpdateContent,
} from 'api/editContent';
import {
  TYPE_DATE, TYPE_CHECKBOX, TYPE_BOOLEAN, TYPE_THREESTATE, TYPE_TIMESTAMP,
} from 'state/content-type/const';
import { getSelectedContentTypeAttributes } from 'state/content-type/selectors';
import {
  SET_CONTENT_ENTRY,
  SET_OWNER_GROUP_DISABLE,
  SET_GROUPS,
  SET_WORK_MODE,
  SET_JOINED_CATEGORIES,
  SET_NEW_CONTENTS_TYPE,
  CLEAR_EDIT_CONTENT_FORM,
  WORK_MODE_ADD,
} from './types';
import {
  getWorkMode, getContent as getStateContent, getJoinedCategories, getNewContentsType,
} from './selectors';

export const setContentEntry = content => ({
  type: SET_CONTENT_ENTRY,
  payload: { content },
});

export const clearEditContentForm = () => ({
  type: CLEAR_EDIT_CONTENT_FORM,
});

export const setNewContentsType = contentType => ({
  type: SET_NEW_CONTENTS_TYPE,
  payload: contentType,
});

export const setJoinedCategories = categories => ({
  type: SET_JOINED_CATEGORIES,
  payload: { joinedCategories: categories },
});

export const fetchContent = params => dispatch => new Promise((resolve) => {
  getContent(params)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          const content = json.payload;
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
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    })
    .catch(() => {});
});

export const setOwnerGroupDisable = disabled => ({
  type: SET_OWNER_GROUP_DISABLE,
  payload: { disabled },
});

export const setWorkMode = mode => ({
  type: SET_WORK_MODE,
  payload: mode,
});

export const setGroups = groups => ({
  type: SET_GROUPS,
  payload: { groups },
});

export const fetchGroups = (page, params) => dispatch => new Promise((resolve) => {
  getGroups(params, page)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setGroups(json.payload));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    })
    .catch(() => {});
});

export const sendPostAddContent = newContentObject => dispatch => new Promise(
  resolve => postAddContent(newContentObject)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          resolve(json.payload);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          dispatch(clearErrors());
          resolve();
        }
      });
    })
    .catch(() => {}),
);

export const sendPutEditContent = (id, editContentObject) => dispatch => new Promise(
  resolve => putUpdateContent(id, editContentObject)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          resolve(json.payload);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          dispatch(clearErrors());
          resolve();
        }
      });
    })
    .catch(() => {}),
);

export const saveContent = values => (dispatch, getState) => new Promise((resolve) => {
  const state = getState();
  const categories = getJoinedCategories(state);
  const workMode = getWorkMode(state);
  const {
    joinGroups = [], ownerGroup, contentDescription, contentStatus, attributes = [],
  } = values;

  const contentTypeAttributes = getSelectedContentTypeAttributes(state);
  const transformedAttributes = attributes.map((attribute, i) => {
    const { value } = attribute;
    const { type } = contentTypeAttributes[i];
    if (type === TYPE_DATE) {
      if (value.includes('-')) return attribute;
      const fromFormat = 'DD/MM/YYYY';
      const toFormat = 'YYYY-MM-DD';
      return {
        ...attribute,
        value: `${moment(value, fromFormat).format(toFormat)} 00:00:00`,
      };
    }
    if (type === TYPE_TIMESTAMP) {
      if (value.includes('-')) return attribute;
      const fromFormat = 'DD/MM/YYYY';
      const toFormat = 'YYYY-MM-DD';
      const {
        date, hours, minutes, seconds,
      } = value;
      const newDate = moment(date, fromFormat).format(toFormat);
      return {
        ...attribute,
        value: `${newDate} ${hours}:${minutes}:${seconds}`,
      };
    }
    if (type === TYPE_CHECKBOX || type === TYPE_BOOLEAN || type === TYPE_THREESTATE) {
      let newValue = null;
      if (value === 'true') newValue = true;
      else if (value === 'false') newValue = false;
      return {
        ...attribute,
        value: newValue,
      };
    }
    return attribute;
  });

  const enhancedValues = {
    groups: joinGroups,
    mainGroup: ownerGroup,
    description: contentDescription,
    categories,
    attributes: transformedAttributes,
    ...(contentStatus != null && { status: contentStatus }),
  };
  if (workMode === WORK_MODE_ADD) {
    const requestObject = {
      ...enhancedValues,
      typeCode: getNewContentsType(state).typeCode,
    };
    dispatch(sendPostAddContent(requestObject)).then(res => resolve(res));
  } else {
    const { id, typeCode } = getStateContent(state);
    const requestObject = {
      ...enhancedValues,
      id,
      typeCode,
    };
    dispatch(sendPutEditContent(id, requestObject)).then(resolve);
  }
});
