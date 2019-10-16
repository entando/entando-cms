import {
  getActiveFilters,
  getAssetsView,
  getFileType,
  getSort,
  getAssetsList,
  getFilteringCategories,
  getLanguage,
  getPaginationOptions,
} from 'state/assets/selectors';

const TEST_STATE = {
  assets: {
    sort: {},
    assets: ['a', 'b'],
    language: 'en',
    filteringCategories: [],
    activeFilters: [],
    assetsView: 'list',
    fileType: 'image',
    paginationOptions: {
      page: 1,
    },
  },
};

it('verify getActiveFilters selector', () => {
  const activeFilters = getActiveFilters(TEST_STATE);
  expect(activeFilters).toEqual([]);
});

it('verify getAssetsView selector', () => {
  const assetsView = getAssetsView(TEST_STATE);
  expect(assetsView).toEqual('list');
});

it('verify getFileType selector', () => {
  const fileType = getFileType(TEST_STATE);
  expect(fileType).toEqual('image');
});

it('verify getSort selector', () => {
  const sort = getSort(TEST_STATE);
  expect(sort).toEqual({});
});
it('verify getAssetsList selector', () => {
  const assetsList = getAssetsList(TEST_STATE);
  expect(assetsList).toEqual(['a', 'b']);
});
it('verify getFilteringCategories selector', () => {
  const filteringCategories = getFilteringCategories(TEST_STATE);
  expect(filteringCategories).toEqual([]);
});
it('verify getLanguage selector', () => {
  const language = getLanguage(TEST_STATE);
  expect(language).toEqual('en');
});
it('verify getPaginationOptions selector', () => {
  const paginationOptions = getPaginationOptions(TEST_STATE);
  expect(paginationOptions).toEqual({ page: 1 });
});
