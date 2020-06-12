import { combineReducers } from 'redux';
import { SET_VERSIONINGS, SET_SELECTED_VERSIONING_TYPE } from 'state/versioning/types';

export const toMap = array => array.reduce((acc, versioning) => {
  acc[versioning.id] = versioning;
  return acc;
}, {});

export const toIdListVersioningList = array => array.map(versioning => versioning.id);

export const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_VERSIONINGS: {
      return toIdListVersioningList(action.payload.versionings);
    }
    default: return state;
  }
};

export const selected = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_VERSIONING_TYPE: {
      return action.payload;
    }
    default: return state;
  }
};

export const versioningMap = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_VERSIONINGS: {
      return toMap(action.payload.versionings);
    }
    default: return state;
  }
};

export default combineReducers({
  list,
  map: versioningMap,
  selected,
});
