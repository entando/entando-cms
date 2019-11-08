import { TABLE_SORT_DIRECTION } from 'patternfly-react';
import {
  SET_QUICK_FILTER, SET_CONTENTS, SET_CONTENT_CATEGORY_FILTER,
  CHECK_STATUS, CHECK_ACCESS, CHECK_AUTHOR, SET_CURRENT_AUTHOR_SHOW,
  SET_CURRENT_STATUS_SHOW,
  SET_CURRENT_COLUMNS_SHOW,
  SET_SORT,
  SET_CONTENT_TYPE,
  SET_GROUP,
  SELECT_ROW,
  SELECT_ALL_ROWS,
} from 'state/contents/types';

const defaultState = {
  currentQuickFilter: {
    id: 'description',
    title: 'Name',
    placeholder: 'Filter by Name',
    filterType: 'text',
    value: '',
  },
  filteringCategories: [],
  sortingColumns: {
    created: {
      direction: TABLE_SORT_DIRECTION.ASC,
      position: 0,
    },
  },
  contents: [],
  statusChecked: '',
  accessChecked: '',
  authorChecked: '',
  selectedRows: [],
  currentAuthorShow: 'allContents',
  currentStatusShow: 'toApprove',
  currentColumnsShow: ['description', 'firstEditor', 'lastModified', 'typeDescription', 'created', 'onLine', 'status', 'actions'],
};

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_CONTENTS: {
      return {
        ...state,
        contents: action.payload || [],
      };
    }
    case SET_QUICK_FILTER: {
      return {
        ...state,
        currentQuickFilter: Object.assign({}, action.payload),
      };
    }
    case SET_CONTENT_TYPE: {
      return {
        ...state,
        contentType: action.payload,
      };
    }
    case SET_GROUP: {
      return {
        ...state,
        group: action.payload,
      };
    }
    case CHECK_STATUS: {
      const newStatus = state.statusChecked !== action.payload ? action.payload : '';
      return {
        ...state,
        statusChecked: newStatus,
      };
    }
    case CHECK_ACCESS: {
      const newAccess = state.accessChecked !== action.payload ? action.payload : '';
      return {
        ...state,
        accessChecked: newAccess,
      };
    }
    case CHECK_AUTHOR: {
      const newAuthor = state.authorChecked !== action.payload ? action.payload : '';
      return {
        ...state,
        authorChecked: newAuthor,
      };
    }
    case SET_CURRENT_AUTHOR_SHOW: {
      return {
        ...state,
        currentAuthorShow: action.payload,
      };
    }
    case SET_CURRENT_STATUS_SHOW: {
      return {
        ...state,
        currentStatusShow: action.payload,
      };
    }
    case SET_SORT: {
      return {
        ...state,
        sortingColumns: action.payload,
      };
    }
    case SELECT_ROW: {
      const row = action.payload;
      let { selectedRows } = state;
      const includes = selectedRows.filter(sr => sr === row.id).length > 0;
      if (includes) {
        selectedRows = selectedRows.filter(sr => sr !== row.id);
      } else {
        selectedRows.push(row.id);
      }
      return {
        ...state,
        selectedRows: selectedRows.slice(0),
      };
    }
    case SELECT_ALL_ROWS: {
      const checked = action.payload;
      let newSelectedRows = [];
      if (checked) {
        const { contents } = state;
        newSelectedRows = contents.map(content => content.id);
      }
      return {
        ...state,
        selectedRows: newSelectedRows,
      };
    }
    case SET_CURRENT_COLUMNS_SHOW: {
      const code = action.payload;
      if (code === 'name') {
        return {
          ...state,
        };
      }
      let { currentColumnsShow } = state;
      currentColumnsShow = currentColumnsShow.slice(0);
      if (currentColumnsShow.includes(code)) {
        currentColumnsShow = currentColumnsShow.filter(c => c !== code);
      } else {
        currentColumnsShow.push(code);
      }
      return {
        ...state,
        currentColumnsShow,
      };
    }
    case SET_CONTENT_CATEGORY_FILTER: {
      const { filteringCategories } = state;
      let newFilters = filteringCategories.slice(0);
      const category = action.payload;
      const contains = newFilters.filter(cat => cat.code === category.code).length !== 0;
      if (!contains) {
        newFilters.push(category);
      } else {
        newFilters = newFilters.filter(c => c.code !== category.code);
      }
      return {
        ...state,
        filteringCategories: newFilters,
      };
    }
    default:
      return state;
  }
};

export default reducer;