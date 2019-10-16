import {
  SET_ASSETS,
  SET_CATEGORY_FILTER,
  SET_ACTIVE_FILTERS,
  REMOVE_ACTIVE_FILTER,
  FILE_TYPE_CHANGE,
  ASSETS_VIEW_CHANGE,
  APPLY_SORT,
  CHANGE_PAGINATION,
} from 'state/assets/types';

const defaultState = {
  language: 'en',
  filteringCategories: [],
  activeFilters: [],
  assetsView: 'list',
  fileType: 'image',
  paginationOptions: {
    page: 1,
    perPage: 5,
    lastPage: 1,
    totalItems: 0,
    perPageOptions: [5, 10, 15, 25, 50],
  },
};

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_CATEGORY_FILTER: {
      const { filteringCategories } = state;
      let newFilters = filteringCategories.slice(0);
      const category = action.payload;
      const contains = newFilters.filter((cat) => cat.code === category.code).length !== 0;
      if (!contains) {
        newFilters.push(category);
      } else {
        newFilters = newFilters.filter((c) => c.code !== category.code);
      }
      return {
        ...state,
        filteringCategories: newFilters,
      };
    }
    case SET_ASSETS: {
      const assets = action.payload || [];
      return {
        ...state,
        assets,
      };
    }
    case SET_ACTIVE_FILTERS: {
      const filters = action.payload;
      return {
        ...state,
        activeFilters: filters,
      };
    }
    case REMOVE_ACTIVE_FILTER: {
      const filter = action.payload;
      const { activeFilters } = state;
      return {
        ...state,
        activeFilters: activeFilters.filter((f) => f.code !== filter.code),
      };
    }
    case FILE_TYPE_CHANGE: {
      const fileType = action.payload;
      return {
        ...state,
        fileType,
      };
    }
    case ASSETS_VIEW_CHANGE: {
      const assetsView = action.payload;
      return {
        ...state,
        assetsView,
      };
    }
    case APPLY_SORT: {
      const newSortName = action.payload;
      const currentSort = Object.assign({}, state.sort);
      if (currentSort.name === newSortName) {
        currentSort.direction = currentSort.direction === 'ASC' ? 'DESC' : 'ASC';
      } else {
        currentSort.name = newSortName;
        currentSort.direction = 'ASC';
      }
      return {
        ...state,
        sort: currentSort,
      };
    }
    case CHANGE_PAGINATION: {
      const newPaginationOptions = Object.assign({}, action.payload);
      return {
        ...state,
        paginationOptions: newPaginationOptions,
      };
    }
    default:
      return state;
  }
};

export default reducer;
