import { SET_CONTENT_SETTINGS, SET_EDITOR_SETTINGS } from 'state/content-settings/types';

const reducer = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_CONTENT_SETTINGS:
      return {
        ...state,
        ...action.payload,
      };
    case SET_EDITOR_SETTINGS:
      return {
        ...state,
        editor: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
