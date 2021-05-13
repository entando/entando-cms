import { createSelector } from 'reselect';
import { get } from 'lodash';
import { getLocale } from 'state/locale/selectors';

export const getCategories = state => state.apps.cms.categories;
export const getCategoriesIdList = state => state.apps.cms.categories.list;
export const getCategoryTreeFetched = state => state.apps.cms.categories.treeFetched.status;
export const getCategoriesMap = state => state.apps.cms.categories.map;
export const getChildrenMap = state => state.apps.cms.categories.childrenMap;
export const getStatusMap = state => state.apps.cms.categories.statusMap;
export const getTitlesMap = state => state.apps.cms.categories.titlesMap;
export const getJoinedCategoriesCodes = state => state.apps.cms.editContent.joinedCategories;

const CATEGORY_STATUS_DEFAULTS = {
  expanded: false,
  loading: false,
  loaded: false,
};

const getCategoriesOrder = (categoriesChildren) => {
  const fifo = ['home'];
  const sorted = [];
  while (fifo.length) {
    const curCategoryCode = fifo.pop();
    sorted.push(curCategoryCode);
    if (categoriesChildren[curCategoryCode]) {
      categoriesChildren[curCategoryCode]
        .slice()
        .reverse()
        .forEach((code) => {
          fifo.push(code);
        });
    }
  }
  return sorted;
};

const doesCategoryExists = (categoryCode, categories) => categoryCode in categories;

const getDepth = (categories, categoryCode) => {
  let curCategoryCode = categoryCode;
  let depth = 0;
  if (categories[curCategoryCode]) {
    while (curCategoryCode !== 'home') {
      curCategoryCode = categories[curCategoryCode].parentCode;
      depth += 1;
    }
  }
  return depth;
};

export const getCategoryTree = createSelector(
  [getCategoriesMap, getChildrenMap, getStatusMap, getTitlesMap, getLocale],
  (categories, categoryChildren, categoriesStatus, categoriesTitles, locale) => getCategoriesOrder(
    categoryChildren,
  )
    .filter(categoryCode => doesCategoryExists(categoryCode, categories))
    .map(categoryCode => ({
      ...categories[categoryCode],
      ...CATEGORY_STATUS_DEFAULTS,
      ...categoriesStatus[categoryCode],
      depth: getDepth(categories, categoryCode),
      children: categoryChildren[categoryCode],
      isEmpty: !(categoryChildren[categoryCode] && categoryChildren[categoryCode].length),
      title: get(categoriesTitles, `${categoryCode}.${locale}`, ''),
    })),
);

export const getAllCategories = createSelector(
  [getCategoriesMap, getChildrenMap, getStatusMap, getTitlesMap, getLocale],
  (categories, categoryChildren, categoriesStatus) => getCategoriesOrder(
    categoryChildren,
  ).map(categoryCode => ({
    ...categories[categoryCode],
    ...CATEGORY_STATUS_DEFAULTS,
    ...categoriesStatus[categoryCode],
    depth: getDepth(categories, categoryCode),
    children: categoryChildren[categoryCode],
    isEmpty: !(categoryChildren[categoryCode] && categoryChildren[categoryCode].length),
  })),
);

export const getJoinedCategoriesByCodes = createSelector(
  [getAllCategories, getJoinedCategoriesCodes],
  (categories, codes) => categories.filter(c => codes.includes(c.code)),
);
