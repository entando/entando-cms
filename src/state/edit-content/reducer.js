import {
  SET_OWNER_GROUP_DISABLE,
  WORK_MODE_ADD,
  SET_WORK_MODE,
  SET_CONTENT_ENTRY,
  SET_GROUPS,
  JOIN_CATEGORY,
  UNJOIN_CATEGORY,
  SET_JOINED_CATEGORIES,
} from 'state/edit-content/types';

const defaultState = {
  ownerGroupDisabled: {
    disabled: false,
  },
  language: 'en',
  workMode: WORK_MODE_ADD,
  contentType: '',
  groups: [],
  joinedCategories: [],
};

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_OWNER_GROUP_DISABLE:
      return {
        ...state,
        ownerGroupDisabled: action.payload,
      };
    case SET_WORK_MODE:
      return {
        ...state,
        workMode: action.payload,
      };
    case SET_GROUPS:
      return {
        ...state,
        groups: action.payload.groups || [],
      };
    case SET_JOINED_CATEGORIES: {
      return {
        ...state,
        joinedCategories: action.payload.joinedCategories || [],
      };
    }
    case JOIN_CATEGORY: {
      const { category: newCategory } = action.payload;
      const currentJoinedCategories = state.joinedCategories;
      const alreadyAdded = currentJoinedCategories.filter(
        category => category === newCategory,
      ).length > 0;
      if (!alreadyAdded) {
        return {
          ...state,
          joinedCategories: [...state.joinedCategories, action.payload.category],
        };
      }
      return state;
    }
    case UNJOIN_CATEGORY: {
      const { categoryCode } = action.payload;
      return {
        ...state,
        joinedCategories: state.joinedCategories.filter(category => category !== categoryCode),
      };
    }
    case SET_CONTENT_ENTRY: {
      const { content } = action.payload;
      return {
        ...state,
        content,
      };
    }
    default:
      return state;
  }
};

export default reducer;
