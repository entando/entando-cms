import { combineReducers } from 'redux';
import { SET_CONTENTS } from 'state/contents/types';

const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_CONTENTS: {
      return action.payload.contents;
    }
    default: return state;
  }
};

export default combineReducers({ list });
