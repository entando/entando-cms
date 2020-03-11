import { addErrors } from '@entando/messages';
import { flattenDeep } from 'lodash';

import { getCategoryTree, getCategory } from 'api/categories';
import { toggleLoading } from 'state/loading/actions';
import { getStatusMap, getAllCategories } from 'state/categories/selectors';

import {
  SET_CATEGORIES,
  TOGGLE_CATEGORY_EXPANDED,
  SET_CATEGORY_LOADING,
  SET_CATEGORY_LOADED,
  SET_CATEGORY_TREE_FETCHED,
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

export const setCategoryTreeFetched = value => ({
  type: SET_CATEGORY_TREE_FETCHED,
  payload: value,
});

export const fetchCategoryNode = code => dispatch => new Promise((resolve) => {
  getCategory(code).then((response) => {
    response.json().then((json) => {
      if (!response.ok) {
        dispatch(addErrors(json.errors.map(e => e.message)));
      }
      resolve(json);
    });
  }).catch(() => {});
});

export const fetchCategoryChildren = code => dispatch => new Promise((resolve) => {
  getCategoryTree(code).then((response) => {
    response.json().then((json) => {
      if (!response.ok) {
        dispatch(addErrors(json.errors.map(e => e.message)));
      }
      resolve(json);
    });
  }).catch(() => {});
});

export const fetchCategoryTree = (
  categoryCode = ROOT_CODE,
) => (dispatch, getState) => new Promise((resolve) => {
  if (categoryCode === ROOT_CODE) {
    dispatch(toggleLoading('categories'));
    Promise.all([
      dispatch(fetchCategoryNode(categoryCode)),
      dispatch(fetchCategoryChildren(categoryCode)),
    ]).then((responses) => {
      dispatch(setCategoryLoaded(categoryCode));
      const categoryStatus = getStatusMap(getState())[categoryCode];
      const toExpand = !categoryStatus || !categoryStatus.expanded;
      if (toExpand) {
        dispatch(toggleCategoryExpanded(categoryCode, true));
      }
      dispatch(toggleLoading('categories'));
      dispatch(setCategories([responses[0].payload].concat(responses[1].payload)));
      resolve();
    }).catch(() => {});
  } else {
    dispatch(fetchCategoryChildren(categoryCode)).then((response) => {
      dispatch(setCategories(response.payload));
      resolve();
    }).catch(() => {});
  }
});

export const fetchCategoryTreeAll = () => dispatch => new Promise((resolve) => {
  const fetchBranch = categoryCode => (
    dispatch(fetchCategoryChildren(categoryCode)).then(response => response.payload)
  );

  const loadChildrenBranch = catArr => (
    Promise.all(catArr.map((cat) => {
      if (cat.children.length > 0) {
        return fetchBranch(cat.code).then(res => (
          loadChildrenBranch(res)
        )).then(loadedres => (
          [cat, ...loadedres]
        ));
      }
      return Promise.resolve(cat);
    }))
  );

  dispatch(fetchCategoryNode(ROOT_CODE)).then((rootCat) => {
    fetchBranch(ROOT_CODE).then((catResult) => {
      loadChildrenBranch(catResult).then((fullResult) => {
        const allCats = [rootCat.payload, ...flattenDeep(fullResult)];
        dispatch(setCategories(allCats));
        dispatch(setCategoryTreeFetched(true));
        resolve(allCats);
      });
    });
  }).catch(() => {});
});

export const handleExpandCategory = (categoryCode = ROOT_CODE) => (
  dispatch, getState,
) => new Promise(
  (resolve) => {
    const categoryStatus = getStatusMap(getState())[categoryCode];
    const toExpand = !categoryStatus || !categoryStatus.expanded;
    const toLoad = toExpand && (!categoryStatus || !categoryStatus.loaded);
    if (toLoad) {
      dispatch(setCategoryLoading(categoryCode));
      dispatch(fetchCategoryTree(categoryCode)).then(() => {
        dispatch(toggleCategoryExpanded(categoryCode, true));
        dispatch(setCategoryLoaded(categoryCode));
      });
    } else {
      dispatch(toggleCategoryExpanded(categoryCode, toExpand));
    }
    resolve();
  },
);

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
