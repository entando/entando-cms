import {
  addErrors, addToast, clearErrors, TOAST_ERROR,
} from '@entando/messages';
import { initialize } from 'redux-form';
import moment from 'moment';

import {
  getContent, getGroups, postAddContent, putUpdateContent,
} from 'api/editContent';
import {
  TYPE_DATE, TYPE_CHECKBOX, TYPE_BOOLEAN, TYPE_THREESTATE, TYPE_TIMESTAMP, TYPE_NUMBER,
  TYPE_LIST, TYPE_MONOLIST,
} from 'state/content-type/const';
import { getSelectedContentTypeAttributes } from 'state/content-type/selectors';
import { toggleLoading } from 'state/loading/actions';
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
  getWorkMode, getContent as getStateContent, getJoinedCategories,
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

export const fetchContent = params => dispatch => new Promise((resolve, reject) => {
  dispatch(toggleLoading('editContent'));
  getContent(params)
    .then((response) => {
      response.json().then((json) => {
        dispatch(toggleLoading('editContent'));
        if (response.ok) {
          const content = json.payload;
          dispatch(setContentEntry(content));
          dispatch(setJoinedCategories(content.categories));
          const {
            mainGroup, groups, description, status,
          } = content;
          dispatch(
            initialize('editcontentform', {
              mainGroup,
              groups,
              description,
              ...(status !== 'PUBLIC' && { status }),
            }),
          );
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          reject();
        }
        resolve();
      });
    })
    .catch(() => { dispatch(toggleLoading('editContent')); });
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
          dispatch(clearErrors());
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
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
          dispatch(clearErrors());
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          resolve();
        }
      });
    })
    .catch(() => {}),
);

const convertBoolToString = (item, hasNull = false) => {
  const { value } = item;
  const newValue = ((val) => {
    switch (val) {
      case 'true':
        return true;
      case 'false':
        return false;
      default:
        return hasNull ? null : false;
    }
  })(value);
  return {
    ...item,
    value: newValue,
  };
};

const fromDateFormat = 'DD/MM/YYYY';
const toDateFormat = 'YYYY-MM-DD';

const convertDateValue = (item) => {
  const { value } = item;
  if (value.includes('-')) return item;

  return {
    ...item,
    value: `${moment(value, fromDateFormat).format(toDateFormat)} 00:00:00`,
  };
};

const convertTimestampValue = (item) => {
  const { value } = item;
  const {
    date, hours, minutes, seconds,
  } = value;
  const newDate = !date.includes('-') ? moment(date, fromDateFormat).format(toDateFormat) : date;
  return {
    ...item,
    value: `${newDate} ${hours || '00'}:${minutes || '00'}:${seconds || '00'}`,
  };
};

const convertNumberValue = (item) => {
  const { value } = item;
  return {
    ...item,
    value: value === '' ? null : value,
  };
};

const convertFieldValueByType = (item, type) => {
  switch (type) {
    case TYPE_BOOLEAN:
      return convertBoolToString(item);
    case TYPE_DATE:
      return convertDateValue(item);
    case TYPE_TIMESTAMP:
      return convertTimestampValue(item);
    case TYPE_NUMBER:
      return convertNumberValue(item);
    case TYPE_CHECKBOX:
    case TYPE_THREESTATE:
      return convertBoolToString(item, true);
    default:
      return item;
  }
};

export const saveContent = values => (dispatch, getState) => new Promise((resolve) => {
  const state = getState();
  const categories = getJoinedCategories(state);
  const workMode = getWorkMode(state);
  const {
    groups = [], mainGroup, description, status, attributes = [],
    contentType,
  } = values;

  const contentTypeAttributes = getSelectedContentTypeAttributes(state);
  const transformedAttributes = attributes.map((attribute, i) => {
    const { type } = contentTypeAttributes[i];
    const replaceBooleanDateStringsComposite = (arr = []) => arr.map((item, j) => {
      const types = contentTypeAttributes[i].compositeAttributes;
      return convertFieldValueByType(item, types[j].type);
    });
    const replaceBooleanDateStringsList = (arr = []) => arr.map((item) => {
      const { type: nestedType } = contentTypeAttributes[i].nestedAttribute;
      return convertFieldValueByType(item, nestedType);
    });
    if (type === TYPE_DATE) {
      return convertDateValue(attribute);
    }
    if (type === TYPE_TIMESTAMP) {
      return convertTimestampValue(attribute);
    }
    if (type === TYPE_CHECKBOX || type === TYPE_BOOLEAN || type === TYPE_THREESTATE) {
      return convertBoolToString(attribute, type !== TYPE_BOOLEAN);
    }
    if (type === TYPE_NUMBER) {
      return convertNumberValue(attribute);
    }
    if (type === TYPE_LIST) {
      const modifiedListElements = {};
      const keys = Object.keys(attribute.listelements || {});
      keys.map((el) => {
        modifiedListElements[el] = replaceBooleanDateStringsList(attribute.listelements[el]);
        return el;
      });
      return {
        ...attribute,
        listelements: modifiedListElements,
      };
    }
    if (type === TYPE_MONOLIST) {
      return {
        ...attribute,
        elements: replaceBooleanDateStringsList(attribute.elements),
      };
    }
    return {
      ...attribute,
      compositeelements: replaceBooleanDateStringsComposite(attribute.compositeelements),
    };
  });

  const enhancedValues = {
    groups,
    mainGroup,
    description,
    categories,
    attributes: transformedAttributes,
    ...(status != null && { status }),
  };
  if (workMode === WORK_MODE_ADD) {
    const requestObject = {
      ...enhancedValues,
      typeCode: contentType,
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
