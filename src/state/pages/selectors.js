import { createSelector } from 'reselect';

export const getViewPages = state => state.apps.cms.pages.viewPages;
export const getChildrenMap = state => state.apps.cms.pages.childrenMap;
export const getSearchPagesRaw = state => state.apps.cms.pages.search;

export const getSearchPages = createSelector(
  [getSearchPagesRaw, getChildrenMap],
  (pages, pageChildren) => {
    if (!pages) return pages;
    return pages.map(page => ({
      ...page,
      isEmpty: pageChildren[page.code] && page.children.length === 0,
    }));
  },
);
