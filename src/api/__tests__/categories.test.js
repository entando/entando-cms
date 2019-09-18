import {
  getCategoryTree,
  getCategory,
} from 'api/categories';
import { makeRequest, METHODS } from '@entando/apimanager';
import { MYCATEGORY1_PAYLOAD } from 'testutils/mocks/categories';

const CATEGORY_CODE = MYCATEGORY1_PAYLOAD.code;
jest.unmock('api/categories');
jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: require.requireActual('@entando/apimanager').METHODS,
}));

describe('api/categories', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCategoryTree', () => {
    it('returns a promise', () => {
      expect(getCategoryTree()).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      getCategoryTree();
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: '/api/categories',
        method: METHODS.GET,
        useAuthentication: true,
      }));
    });

    it('makes the request with additional params', () => {
      getCategoryTree(CATEGORY_CODE);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: `/api/categories?parentCode=${CATEGORY_CODE}`,
        method: METHODS.GET,
        useAuthentication: true,
      }));
    });
  });

  describe('getCategory()', () => {
    it('returns a promise', () => {
      expect(getCategory(CATEGORY_CODE)).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      getCategory(CATEGORY_CODE);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: `/api/categories/${CATEGORY_CODE}`,
        method: METHODS.GET,
        useAuthentication: true,
      }));
    });
  });
});
