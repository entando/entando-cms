import {
  getActiveFilters,
  getAssetsView,
  getFileType,
  getSort,
  getAssetsList,
  getFilteringCategories,
  getLanguage,
  getPaginationOptions,
  condenseAssetInfo,
  removePixelWord,
} from 'state/assets/selectors';
import { ASSET_RESPONSE } from 'testutils/mocks/assets';

const a = { id: 'a', name: 'yo' };
const b = { id: 'b', name: 'mama' };

const TEST_STATE = {
  apps: {
    cms: {
      assets: {
        sort: {},
        assets: ['a', 'b'],
        assetsMap: { a, b },
        language: 'en',
        filteringCategories: [],
        activeFilters: [],
        assetsView: 'list',
        fileType: 'image',
        paginationOptions: {
          page: 1,
        },
      },
    },
  },
  api: {
    domain: 'https://localhost:8080/',
  },
};

it('verify condense function', () => {
  const { metadata } = ASSET_RESPONSE;
  const dimension = `${removePixelWord(metadata['Image Width'])}x${removePixelWord(metadata['Image Height'])} px`;
  const res = condenseAssetInfo(ASSET_RESPONSE);
  expect(res.versions[0].dimensions).toEqual(dimension);
  expect(res.metadata.dimension).toEqual(dimension);
  expect(res.versions[0].sizetype).toEqual('orig');
  expect(res.metadata.filename).toEqual('a-ping-d0.png');
});


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
  expect(assetsList).toEqual([a, b]);
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
