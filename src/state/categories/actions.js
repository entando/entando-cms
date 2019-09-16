import { addErrors } from '@entando/messages';

import { getCategoryTree, getCategory } from 'api/categories';
import { toggleLoading } from 'state/loading/actions';
import { getStatusMap, getAllCategories } from 'state/categories/selectors';

import {
  SET_CATEGORIES,
  TOGGLE_CATEGORY_EXPANDED,
  SET_CATEGORY_LOADING,
  SET_CATEGORY_LOADED,
} from 'state/categories/types';

import { JOIN_CATEGORY, UNJOIN_CATEGORY } from 'state/edit-content/types';

const ROOT_CODE = 'home';

export const setCategories = categories => ({
  type: SET_CATEGORIES,
  payload: {
    categories,
  },
});

export const toggleCategoryExpanded = (categoryCode, expanded) => ({
  type: TOGGLE_CATEGORY_EXPANDED,
  payload: {
    categoryCode,
    expanded,
  },
});

export const setCategoryLoading = categoryCode => ({
  type: SET_CATEGORY_LOADING,
  payload: {
    categoryCode,
  },
});

export const setCategoryLoaded = categoryCode => ({
  type: SET_CATEGORY_LOADED,
  payload: {
    categoryCode,
  },
});

export const wrapApiCall = apiFunc => (...args) => async (dispatch) => {
  const response = await apiFunc(...args);
  const json = await response.json();
  if (response.ok) {
    return json;
  }
  dispatch(addErrors(json.errors.map(e => e.message)));
  throw json;
};

export const fetchCategoryNode = wrapApiCall(getCategory);
export const fetchCategoryChildren = wrapApiCall(getCategoryTree);

export const fetchCategoryTree = (categoryCode = ROOT_CODE, recursive) => async (
  dispatch,
  getState,
) => {
  let categoryTree;
  try {
    if (categoryCode === ROOT_CODE) {
      dispatch(toggleLoading('categories'));
      const responses = await Promise.all([
        fetchCategoryNode(categoryCode)(dispatch),
        fetchCategoryChildren(categoryCode)(dispatch),
      ]);
      dispatch(setCategoryLoaded(categoryCode));
      const categoryStatus = getStatusMap(getState())[categoryCode];
      const toExpand = !categoryStatus || !categoryStatus.expanded;
      if (toExpand) {
        dispatch(toggleCategoryExpanded(categoryCode, true));
      }
      dispatch(toggleLoading('categories'));
      categoryTree = [responses[0].payload].concat(responses[1].payload);
    } else {
      const response = await fetchCategoryChildren(categoryCode)(dispatch);
      categoryTree = response.payload;
      if (recursive) {
        categoryTree.map((cat) => {
          if (cat.children && cat.children.length > 0) {
            // eslint-disable-next-line no-use-before-define
            return dispatch(handleExpandCategory(cat.code, true));
          }
          return null;
        });
      }
    }
    dispatch(setCategories(categoryTree));
  } catch (e) {
    // do nothing
  }
};

export const handleExpandCategory = (categoryCode = ROOT_CODE, recursive, expansion) => (
  dispatch,
  getState,
) => new Promise((resolve) => {
  const categoryStatus = getStatusMap(getState())[categoryCode];
  const toExpand = expansion != null ? expansion : !categoryStatus || !categoryStatus.expanded;
  const toLoad = toExpand && (!categoryStatus || !categoryStatus.loaded);
  if (toLoad) {
    dispatch(setCategoryLoading(categoryCode));
    dispatch(fetchCategoryTree(categoryCode, recursive)).then(() => {
      dispatch(toggleCategoryExpanded(categoryCode, true));
      dispatch(setCategoryLoaded(categoryCode));
    });
  } else {
    dispatch(toggleCategoryExpanded(categoryCode, toExpand));
  }
  resolve();
});

function recursivelyExpandCategories(categories, dispatch, mode) {
  if (categories.length === 0 || typeof categories[0] === 'string') return;
  categories.map((cat) => {
    dispatch(toggleCategoryExpanded(cat.code, mode));
    if (!cat.isEmpty) {
      return recursivelyExpandCategories(cat.children);
    }
    return null;
  });
}

export const onExpandAll = () => (dispatch, getState) => {
  const categoryTree = getAllCategories(getState());
  recursivelyExpandCategories(categoryTree, dispatch, true);
  categoryTree.map(category => dispatch(handleExpandCategory(category.code, true, true)));
};

export const onCollapseAll = () => (dispatch, getState) => {
  const categoryTree = getAllCategories(getState());
  recursivelyExpandCategories(categoryTree, dispatch, false);
};

export const onJoinCategory = category => ({
  type: JOIN_CATEGORY,
  payload: {
    category,
  },
});

export const onUnjoinCategory = categoryCode => ({
  type: UNJOIN_CATEGORY,
  payload: {
    categoryCode,
  },
});

export const handleJoinCategory = categoryCode => (dispatch, getState) => {
  const categoryTree = getAllCategories(getState());
  const targetCategory = categoryTree.filter(category => category.code === categoryCode)[0];
  dispatch(onJoinCategory(targetCategory));
};
