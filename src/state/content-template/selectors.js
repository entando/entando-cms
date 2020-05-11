import { createSelector } from 'reselect';

export const getContentTemplateState = state => state.apps.cms.contentTemplate;

export const getContentTemplateList = createSelector(
  getContentTemplateState,
  contentTemplate => contentTemplate.list,
);

export const getContentTemplateOpened = createSelector(
  getContentTemplateState,
  contentTemplate => contentTemplate.opened,
);

export const getContentTemplateFilters = createSelector(
  getContentTemplateState,
  contentTemplate => contentTemplate.filters,
);

export const getContentTemplateFilterProps = createSelector(
  getContentTemplateFilters,
  filters => filters.filterProps,
);

export const getContentTemplateSearchAttribute = createSelector(
  getContentTemplateFilters,
  filters => filters.attribute,
);

export const getContentTemplateSearchKeyword = createSelector(
  getContentTemplateFilters,
  filters => filters.keyword,
);

export const getContentTemplateDictionary = createSelector(
  getContentTemplateState,
  contentTemplate => contentTemplate.dictionary,
);

export const getContentTemplateDictionaryList = createSelector(
  getContentTemplateDictionary,
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
