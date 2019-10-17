import { createSelector } from 'reselect';

export const getContentModelState = state => state.apps.cms.contentModel;

export const getContentModelList = createSelector(
  getContentModelState,
  contentModel => contentModel.list,
);

export const getContentModelOpened = createSelector(
  getContentModelState,
  contentModel => contentModel.opened,
);

export const getContentModelFilters = createSelector(
  getContentModelState,
  contentModel => contentModel.filters,
);

export const getContentModelFilterProps = createSelector(
  getContentModelFilters,
  filters => filters.filterProps,
);

export const getContentModelSearchAttribute = createSelector(
  getContentModelFilters,
  filters => filters.attribute,
);

export const getContentModelSearchKeyword = createSelector(
  getContentModelFilters,
  filters => filters.keyword,
);

export const getContentModelDictionary = createSelector(
  getContentModelState,
  contentModel => contentModel.dictionary,
);

export const getContentModelDictionaryList = createSelector(
  getContentModelDictionary,
  dictionary => dictionary.list.map(object => ({
    ...object,
    methods: object.methods ? Object.entries(object.methods).map(([key, m]) => (
      [key.replace(/"/g, '\''), m]
    )).reduce((acc, [key, m]) => {
      acc[key] = m;
      return acc;
    }, {}) : null,
  })),
);
