import { combineReducers } from 'redux';
import {
  SET_CONTENT_TYPES,
  REMOVE_CONTENT_TYPE,
  SET_ATTRIBUTES,
  SET_SELECTED_ATTRIBUTE,
  REMOVE_ATTRIBUTE,
  SET_SELECTED_CONTENT_TYPE,
  SET_SELECTED_ATTRIBUTE_FOR_CONTENTTYPE,
  MOVE_ATTRIBUTE_UP,
  MOVE_ATTRIBUTE_DOWN,
} from 'state/content-type/types';

import { swapItems } from 'helpers/arrayUtils';

const toMap = array => array.reduce((acc, contentType) => {
  acc[contentType.code] = contentType;
  return acc;
}, {});

const toIdList = array => array.map(contentType => contentType.code);


export const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_CONTENT_TYPES: {
      return toIdList(action.payload.list);
    }
    case REMOVE_CONTENT_TYPE: {
      const { contentTypeCode } = action.payload;
      return state.filter(item => item !== contentTypeCode);
    }
    default: return state;
  }
};

const contentTypeMap = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_CONTENT_TYPES: {
      return toMap(action.payload.list);
    }
    case REMOVE_CONTENT_TYPE: {
      const { contentTypeCode } = action.payload;
      const newState = { ...state };
      delete newState[contentTypeCode];
      return newState;
    }
    default: return state;
  }
};

export const selectedContentType = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_CONTENT_TYPE: {
      return action.payload.contentType;
    }
    case SET_SELECTED_ATTRIBUTE_FOR_CONTENTTYPE: {
      return { ...state, attributeSelected: action.payload.attribute };
    }
    case MOVE_ATTRIBUTE_UP: {
      const { attributeIndex } = action.payload;
      const { attributes } = state;
      const newState = { ...state };
      return {
        ...newState,
        attributes: swapItems(attributes, attributeIndex, true),
      };
    }
    case MOVE_ATTRIBUTE_DOWN: {
      const { attributeIndex } = action.payload;
      const { attributes } = state;
      const newState = { ...state };
      return {
        ...newState,
        attributes: swapItems(attributes, attributeIndex, false),
      };
    }
    case REMOVE_ATTRIBUTE: {
      const { attributeCode } = action.payload;
      const attributes = state.attributes.filter(f => f.code !== attributeCode);
      return { ...state, attributes };
    }
    default: return state;
  }
};

export const attributeList = (state = [], action = {}) => {
  switch (action.type) {
    case SET_ATTRIBUTES: {
      return action.payload.attributes;
    }
    default: return state;
  }
};

export const selectedAttribute = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_ATTRIBUTE: {
      return action.payload.attribute;
    }
    default: return state;
  }
};

export default combineReducers({
  list,
  map: contentTypeMap,
  selected: selectedContentType,
  attributes: combineReducers({
    list: attributeList,
    selected: selectedAttribute,
  }),
});
