import { METHODS } from '@entando/apimanager';
import {
  addErrors, addToast, clearErrors, TOAST_ERROR, TOAST_SUCCESS,
} from '@entando/messages';
import moment from 'moment';
import { isUndefined } from 'lodash';
import { setPage } from 'state/pagination/actions';
import {
  SET_CONTENT_TYPES,
  SET_CONTENT_TYPE_REFERENCE_STATUS,
  REMOVE_CONTENT_TYPE,
  SET_SELECTED_CONTENT_TYPE,
  SET_ATTRIBUTES,
  REMOVE_ATTRIBUTE,
  SET_SELECTED_ATTRIBUTE,
  SET_SELECTED_ATTRIBUTE_FOR_CONTENTTYPE,
  MOVE_ATTRIBUTE_UP,
  MOVE_ATTRIBUTE_DOWN,
  SET_ACTION_MODE,
  SET_NEW_ATTRIBUTE_COMPOSITE,
  REMOVE_ATTRIBUTE_FROM_COMPOSITE,
  MOVE_ATTRIBUTE_FROM_COMPOSITE,
} from 'state/content-type/types';
import {
  ROUTE_CMS_CONTENTTYPE_LIST,
  ROUTE_CMS_CONTENTTYPE_EDIT,
  ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_MONOLIST_ADD,
  ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_EDIT,
} from 'app-init/routes';
import { routeConverter } from '@entando/utils';
import { toggleLoading } from 'state/loading/actions';
import {
  getActionModeContentTypeSelectedAttribute,
  getContentTypeAttributesIdList,
  getMonolistAttributeType,
  getFormTypeValue,
  getSelectedAttributeType,
  getContentTypeSelectedAttributeType,
  getIsMonolistCompositeAttributeType,
  getAttributeSelectFromContentType,
  getNewAttributeComposite,
  getSelectedContentType,
} from 'state/content-type/selectors';
import { initialize } from 'redux-form';

import {
  TYPE_MONOLIST,
  TYPE_COMPOSITE,
  TYPE_DATE,
  MODE_ADD,
  MODE_EDIT,
  MODE_ADD_COMPOSITE,
  MODE_EDIT_COMPOSITE,
  MODE_ADD_ATTRIBUTE_COMPOSITE,
  MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE,
  MODE_ADD_SUB_ATTRIBUTE_MONOLIST_COMPOSITE,
} from 'state/content-type/const';

import {
  getContentTypes,
  getContentType,
  getContentTypesStatus,
  postContentType,
  postContentTypesStatus,
  postRefreshContentType,
  putContentType,
  deleteContentType,
  getContentTypeAttributes,
  getContentTypeAttribute,
  getAttributeFromContentType,
  moveAttributeUp,
  moveAttributeDown,
  postAttributeFromContentType,
  putAttributeFromContentType,
  deleteAttributeFromContentType,
} from 'api/contentTypes';

export const setContentTypeList = list => ({
  type: SET_CONTENT_TYPES,
  payload: { list },
});

export const removeContentType = contentTypeCode => ({
  type: REMOVE_CONTENT_TYPE,
  payload: {
    contentTypeCode,
  },
});

export const setSelectedContentType = contentType => ({
  type: SET_SELECTED_CONTENT_TYPE,
  payload: {
    contentType,
  },
});

export const setContentTypeReferenceStatus = contentTypeStatus => ({
  type: SET_CONTENT_TYPE_REFERENCE_STATUS,
  payload: {
    contentTypeStatus,
  },
});

export const setSelectedAttributeContentType = attribute => ({
  type: SET_SELECTED_ATTRIBUTE_FOR_CONTENTTYPE,
  payload: {
    attribute,
  },
});

export const removeAttribute = (contentTypeCode, attributeCode) => ({
  type: REMOVE_ATTRIBUTE,
  payload: {
    contentTypeCode,
    attributeCode,
  },
});

export const setSelectedAttribute = attribute => ({
  type: SET_SELECTED_ATTRIBUTE,
  payload: {
    attribute,
  },
});

export const setContentTypeAttributes = attributes => ({
  type: SET_ATTRIBUTES,
  payload: {
    attributes,
  },
});

export const moveAttributeUpSync = ({ entityCode, attributeCode, attributeIndex }) => ({
  type: MOVE_ATTRIBUTE_UP,
  payload: {
    entityCode,
    attributeCode,
    attributeIndex,
  },
});

export const moveAttributeDownSync = ({ entityCode, attributeCode, attributeIndex }) => ({
  type: MOVE_ATTRIBUTE_DOWN,
  payload: {
    entityCode,
    attributeCode,
    attributeIndex,
  },
});

export const setActionMode = actionMode => ({
  type: SET_ACTION_MODE,
  payload: {
    actionMode,
  },
});

export const removeAttributeFromComposite = (attributeCode, isMonolistComposite = false) => ({
  type: REMOVE_ATTRIBUTE_FROM_COMPOSITE,
  payload: {
    attributeCode,
    isMonolistComposite,
  },
});

export const moveAttributeFromComposite = (fromIndex, toIndex, isMonolistComposite = false) => ({
  type: MOVE_ATTRIBUTE_FROM_COMPOSITE,
  payload: {
    fromIndex,
    toIndex,
    isMonolistComposite,
  },
});

export const setNewAttributeComposite = attributeData => ({
  type: SET_NEW_ATTRIBUTE_COMPOSITE,
  payload: {
    attributeData,
  },
});

// thunks
export const fetchContentTypeListPaged = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('contentTypeList'));
  getContentTypes(page, params)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setContentTypeList(json.payload));
          dispatch(setPage(json.metaData));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        dispatch(toggleLoading('contentTypeList'));
        resolve();
      });
    })
    .catch(() => {});
});

export const fetchContentType = contentTypeCode => dispatch => new Promise((resolve, reject) => {
  getContentType(contentTypeCode)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setSelectedContentType(json.payload));
          dispatch(initialize('ContentType', json.payload));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          reject();
        }
        resolve();
      });
    })
    .catch(() => {});
});

export const sendPostContentType = contentTypeObject => dispatch => new Promise((resolve) => {
  postContentType(contentTypeObject)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          resolve(json.payload);
        } else {
          dispatch(clearErrors());
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          resolve();
        }
      });
    })
    .catch(() => {});
});

export const fetchContentTypeReferenceStatus = () => dispatch => new Promise((resolve) => {
  getContentTypesStatus()
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setContentTypeReferenceStatus(json.payload));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    })
    .catch(() => {});
});

export const sendPostContentTypeReferenceStatus = contentTypeCodes => dispatch => new Promise(
  (resolve) => {
    postContentTypesStatus({ profileTypeCodes: contentTypeCodes })
      .then((response) => {
        response.json().then((json) => {
          if (response.ok) {
            resolve(json);
          } else {
            dispatch(addErrors(json.errors.map(err => err.message)));
            resolve();
          }
        });
      })
      .catch(() => {});
  },
);

export const sendPostRefreshContentType = contentTypeCode => dispatch => new Promise(
  (resolve) => {
    postRefreshContentType(contentTypeCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(addToast(json.payload.status, TOAST_SUCCESS));
        } else {
          dispatch(clearErrors());
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    });
  },
);

export const sendPutContentType = contentTypeObject => dispatch => new Promise(
  resolve => putContentType(contentTypeObject)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          resolve(json);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          resolve();
        }
      });
    })
    .catch(() => {}),
);

export const sendDeleteContentType = contentTypeCode => dispatch => new Promise(
  resolve => deleteContentType(contentTypeCode)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(removeContentType(contentTypeCode));
          resolve(json);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          dispatch(addToast(json.errors[0].message, TOAST_ERROR));
          resolve();
        }
      });
    })
    .catch(() => {}),
);

export const fetchContentTypeAttributes = (page = { page: 1, pageSize: 0 }, params = '') => (
  dispatch,
  getState,
) => new Promise((resolve) => {
  dispatch(toggleLoading('contentTypeAttr'));
  getContentTypeAttributes(page, params)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          const list = getContentTypeAttributesIdList(getState());
          if (!list || list.length === 0) {
            dispatch(setContentTypeAttributes(json.payload));
          }
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        dispatch(toggleLoading('contentTypeAttr'));
        resolve();
      });
    })
    .catch(() => {});
});

export const fetchContentTypeAttribute = (
  contentTypeAttributeCode,
  routeFunc,
  selectedAttributeType = '',
  formName,
) => (dispatch, getState) => new Promise((resolve) => {
  let typeAttribute = contentTypeAttributeCode;

  const checkCompositeSubAttribute = selectedAttributeType === TYPE_COMPOSITE
      || (selectedAttributeType === TYPE_MONOLIST
        && getMonolistAttributeType(getState()) === TYPE_COMPOSITE);

  if (checkCompositeSubAttribute) {
    typeAttribute = getFormTypeValue(getState(), formName);
    dispatch(setActionMode(MODE_ADD_ATTRIBUTE_COMPOSITE));
  }
  const actionMode = getActionModeContentTypeSelectedAttribute(getState());
  if (typeAttribute === TYPE_COMPOSITE && actionMode === MODE_ADD_ATTRIBUTE_COMPOSITE) {
    resolve();
  } else {
    getContentTypeAttribute(typeAttribute)
      .then((response) => {
        response.json().then((json) => {
          if (response.ok) {
            dispatch(setSelectedAttribute(json.payload));
            switch (actionMode) {
              case MODE_ADD_ATTRIBUTE_COMPOSITE: {
                dispatch(initialize(formName, { type: json.payload.code, code: '', name: '' }));
                break;
              }
              case MODE_ADD_SUB_ATTRIBUTE_MONOLIST_COMPOSITE: {
                dispatch(initialize(formName, { type: json.payload.code }));
                break;
              }
              case MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE: {
                const nestedAttribute = {
                  ...json.payload,
                  type: json.payload.code,
                  compositeAttributeType: TYPE_COMPOSITE,
                };
                dispatch(initialize(formName, { nestedAttribute }));
                break;
              }
              default:
                break;
            }
            if (routeFunc && actionMode !== MODE_ADD_ATTRIBUTE_COMPOSITE) {
              routeFunc();
            }
          } else {
            dispatch(addErrors(json.errors.map(err => err.message)));
          }
          resolve();
        });
      })
      .catch(() => {});
  }
});

const fmtDateDDMMYYY = (date) => {
  let d = new Date(date);
  d = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  return moment(d, 'DD/MM/YYYY').format('DD/MM/YYYY');
};

export const fetchAttributeFromContentType = (formName, contentTypeCode, attributeCode) => (
  dispatch,
  getState,
) => new Promise((resolve) => {
  getAttributeFromContentType(contentTypeCode, attributeCode)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          const joinRoles = json.payload.roles ? json.payload.roles.map(role => role.code) : [];
          let payload = {
            ...json.payload,
            joinRoles,
            joinAllowedOptions: joinRoles,
            compositeAttributeType: TYPE_COMPOSITE,
          };
          if (json.payload.type === TYPE_DATE) {
            let {
              rangeStartDate,
              rangeEndDate,
              equalDate,
              rangeStartDateAttribute,
              rangeEndDateAttribute,
              equalDateAttribute,
            } = json.payload.validationRules;
            rangeStartDate = rangeStartDate && fmtDateDDMMYYY(rangeStartDate);
            rangeEndDate = rangeEndDate && fmtDateDDMMYYY(rangeEndDate);
            equalDate = equalDate && fmtDateDDMMYYY(equalDate);
            rangeStartDateAttribute = rangeStartDateAttribute
            && fmtDateDDMMYYY(rangeStartDateAttribute);
            rangeEndDateAttribute = rangeEndDateAttribute && fmtDateDDMMYYY(rangeEndDateAttribute);
            equalDateAttribute = equalDateAttribute && fmtDateDDMMYYY(equalDateAttribute);
            payload = {
              ...payload,
              validationRules: {
                rangeStartDate,
                rangeEndDate,
                equalDate,
                rangeStartDateAttribute,
                rangeEndDateAttribute,
                equalDateAttribute,
              },
            };
          }
          const actionMode = getActionModeContentTypeSelectedAttribute(getState());
          if (actionMode !== MODE_ADD_ATTRIBUTE_COMPOSITE) {
            dispatch(initialize(formName, payload));
            dispatch(setSelectedAttributeContentType(json.payload));
            dispatch(fetchContentTypeAttribute(getSelectedAttributeType(getState())));
          }
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    })
    .catch(() => {});
});

export const sendPostAttributeFromContentType = (attributeObject, entityCode, history) => (
  dispatch,
  getState,
) => new Promise((resolve) => {
  const list = getContentTypeSelectedAttributeType(getState());
  postAttributeFromContentType(entityCode, attributeObject)
    .then((response) => {
      response.json().then((json) => {
        if (!response.ok) {
          dispatch(addErrors(json.errors.map(err => err.message)));
        } else if (list) {
          history.push(
            routeConverter(ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_MONOLIST_ADD, {
              entityCode,
              attributeCode: attributeObject.code,
            }),
          );
        } else {
          history.push(routeConverter(ROUTE_CMS_CONTENTTYPE_EDIT, { code: entityCode }));
        }
        resolve();
      });
    })
    .catch(() => {});
});

export const sendPutAttributeFromContentType = (attributeObject, entityCode, history) => (
  dispatch,
  getState,
) => new Promise((resolve) => {
  putAttributeFromContentType(entityCode, attributeObject)
    .then((response) => {
      response.json().then((json) => {
        if (!response.ok) {
          dispatch(addErrors(json.errors.map(err => err.message)));
        } else if (
          json.payload.type === TYPE_MONOLIST
            && !getIsMonolistCompositeAttributeType(getState())
        ) {
          history.push(
            routeConverter(ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_MONOLIST_ADD, {
              entityCode,
              attributeCode: attributeObject.code,
            }),
          );
        } else {
          dispatch(setSelectedAttributeContentType(json.payload));
          const { type, code } = attributeObject;
          if (type === TYPE_COMPOSITE) {
            dispatch(
              initialize('attribute', {
                ...json.payload,
                compositeAttributeType: TYPE_COMPOSITE,
              }),
            );
            history.push(
              routeConverter(ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_EDIT, {
                entityCode,
                attributeCode: code,
              }),
            );
          } else {
            history.push(routeConverter(ROUTE_CMS_CONTENTTYPE_EDIT, { code: entityCode }));
          }
        }
        resolve();
      });
    })
    .catch(() => {});
});

export const sendPutAttributeFromContentTypeMonolist = (
  attributeObject, entityCode, history,
) => dispatch => new Promise((resolve) => {
  putAttributeFromContentType(entityCode, attributeObject)
    .then((response) => {
      response.json().then((json) => {
        if (!response.ok) {
          dispatch(addErrors(json.errors.map(err => err.message)));
        } else {
          history.push(routeConverter(ROUTE_CMS_CONTENTTYPE_EDIT, { code: entityCode }));
        }
        resolve();
      });
    })
    .catch(() => {});
});

const converDate = date => `${date
  .split('/')
  .reverse()
  .join('-')} 00:00:00`;

const getPayloadFromTypeAttribute = (values, allowedRoles) => {
  let payload = {
    ...values,
    code: values.code,
    type: values.type,
    roles: values.joinRoles
      ? values.joinRoles.map(roleId => ({ code: roleId, descr: allowedRoles[roleId] }))
      : [],
    nestedAttribute: {
      ...values.nestedAttribute,
      type: values.listNestedType || (values.nestedAttribute && values.nestedAttribute.type),
      code: values.code,
      enumeratorStaticItems: 'default',
      enumeratorStaticItemsSeparator: ',',
    },
  };
  if (payload.type === TYPE_DATE) {
    const validationRules = {};
    if (payload.validationRules) {
      const {
        rangeStartDate,
        rangeEndDate,
        equalDate,
        rangeStartDateAttribute,
        rangeEndDateAttribute,
        equalDateAttribute,
      } = payload.validationRules;

      validationRules.rangeStartDate = rangeStartDate && converDate(rangeStartDate);
      validationRules.rangeEndDate = rangeEndDate && converDate(rangeEndDate);
      validationRules.equalDate = equalDate && converDate(equalDate);
      validationRules.rangeStartDateAttribute = rangeStartDateAttribute
      && converDate(rangeStartDateAttribute);
      validationRules.rangeEndDateAttribute = rangeEndDateAttribute
      && converDate(rangeEndDateAttribute);
      validationRules.equalDateAttribute = equalDateAttribute
      && converDate(equalDateAttribute);
    }
    payload = {
      ...payload,
      validationRules,
    };
  }
  return payload;
};

const getPayloadFromTypeAttributeComposite = (composite, childAttribute) => ({
  ...composite,
  compositeAttributes: [childAttribute],
});

const getPayloadFromTypeMonolistAttributeComposite = (composite, childAttribute) => ({
  ...composite,
  nestedAttribute: {
    ...composite.nestedAttribute,
    compositeAttributes: [childAttribute],
  },
});

export const handlerAttributeFromContentType = (
  action,
  values,
  allowedRoles,
  mode,
  entityCode,
  history,
) => (dispatch, getState) => {
  let payload = getPayloadFromTypeAttribute(values, allowedRoles);
  const isMonolistComposite = payload.type === TYPE_MONOLIST
  && payload.nestedAttribute.type === TYPE_COMPOSITE;

  if (action === METHODS.POST) {
    dispatch(setActionMode(MODE_ADD));
    const attributeSelected = getAttributeSelectFromContentType(getState()) || '';
    if (attributeSelected.type === TYPE_COMPOSITE) {
      attributeSelected.compositeAttributes.push(payload);
      dispatch(setActionMode(MODE_ADD_COMPOSITE));
      dispatch(sendPutAttributeFromContentType(attributeSelected, entityCode, history));
    } else if (payload.type === TYPE_COMPOSITE || isMonolistComposite) {
      dispatch(setActionMode(MODE_ADD_COMPOSITE));
      dispatch(setNewAttributeComposite(payload));
      if (isMonolistComposite) {
        dispatch(setActionMode(MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE));
        history.push(
          routeConverter(ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_MONOLIST_ADD, {
            entityCode,
            attributeCode: payload.code,
          }),
        );
      }
    } else {
      const newAttributeComposite = getNewAttributeComposite(getState());
      if (!isUndefined(newAttributeComposite)) {
        payload = getPayloadFromTypeAttributeComposite(newAttributeComposite, payload);
      }
      if (mode === MODE_ADD_SUB_ATTRIBUTE_MONOLIST_COMPOSITE) {
        payload = getPayloadFromTypeMonolistAttributeComposite(
          newAttributeComposite,
          getPayloadFromTypeAttribute(values, allowedRoles),
        );
      }
      dispatch(sendPostAttributeFromContentType(payload, entityCode, history));
    }
  } else {
    dispatch(setActionMode(MODE_EDIT));
    const isComposite = values.type === TYPE_COMPOSITE
    || payload.type === TYPE_COMPOSITE || isMonolistComposite;
    if (isComposite) {
      if (mode === MODE_EDIT_COMPOSITE) {
        dispatch(sendPutAttributeFromContentType(payload, entityCode, history)).then(() => {
          history.push(ROUTE_CMS_CONTENTTYPE_LIST);
        });
      }
      dispatch(setActionMode(MODE_EDIT_COMPOSITE));
    } else {
      if (mode === MODE_ADD_ATTRIBUTE_COMPOSITE) {
        const compositeData = getAttributeSelectFromContentType(getState());
        if (getIsMonolistCompositeAttributeType(getState())) {
          compositeData.nestedAttribute.compositeAttributes.push(payload);
        } else {
          compositeData.compositeAttributes.push(payload);
        }
        payload = compositeData;
        dispatch(setActionMode(MODE_EDIT_COMPOSITE));
      }
      dispatch(sendPutAttributeFromContentType(payload, entityCode, history));
    }
  }
};

export const sendDeleteAttributeFromContentType = attributeCode => (
  dispatch, getState,
) => new Promise((resolve) => {
  const contentTypeCode = getSelectedContentType(getState()).code;
  deleteAttributeFromContentType(contentTypeCode, attributeCode)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(removeAttribute(contentTypeCode, attributeCode));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    })
    .catch(() => {});
});

export const sendMoveAttributeUp = (
  { entityCode, attributeCode, attributeIndex },
) => dispatch => new Promise((resolve) => {
  moveAttributeUp(entityCode, attributeCode)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(
            moveAttributeUpSync({
              ...json.payload,
              entityCode,
              attributeIndex,
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

export const sendMoveAttributeDown = (
  { entityCode, attributeCode, attributeIndex },
) => dispatch => new Promise((resolve) => {
  moveAttributeDown(entityCode, attributeCode)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(
            moveAttributeDownSync({
              ...json.payload,
              entityCode,
              attributeIndex,
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
