import { createSelector } from 'reselect';

export const getContentsState = state => state.apps.cms.contents;

export const getContents = createSelector(
  getContentsState,
  contents => contents.contents,
);

export const getCurrentQuickFilter = createSelector(
  getContentsState,
  contents => contents.currentQuickFilter,
);

export const getFilteringCategories = createSelector(
  getContentsState,
  contents => contents.filteringCategories,
);

export const getStatusChecked = createSelector(
  getContentsState,
  contents => contents.statusChecked,
);

export const getAccessChecked = createSelector(
  getContentsState,
  contents => contents.accessChecked,
);

export const getAuthorChecked = createSelector(
  getContentsState,
  contents => contents.authorChecked,
);

export const getCurrentAuthorShow = createSelector(
  getContentsState,
  contents => contents.currentAuthorShow,
);

export const getCurrentStatusShow = createSelector(
  getContentsState,
  contents => contents.currentStatusShow,
);

export const getCurrentColumnsShow = createSelector(
  getContentsState,
  contents => contents.currentColumnsShow,
);

export const getSortingColumns = createSelector(
  getContentsState,
  contents => contents.sortingColumns,
);

export const getSelectedRows = createSelector(
  getContentsState,
  contents => contents.selectedRows,
);