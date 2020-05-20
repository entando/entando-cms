import { makeRequest, METHODS } from '@entando/apimanager';

import {
  getPage,
  getViewPages,
  getPageChildren,
  putPageWidget,
  getSearchPages,
} from 'api/pages';
import { VIEWPAGES_PAYLOAD, SEARCH_PAGES } from 'testutils/mocks/pages';
import { PAGE_STATUS_DRAFT, PAGE_STATUS_PUBLISHED } from 'state/pages/const';

jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
  },
}));

const PAGE_CODE = 'page_code';

describe('api/pages', () => {
  afterEach(() => {
    jest.runOnlyPendingTimers();
  });

  describe('getPage', () => {
    it('returns a promise', () => {
      expect(getPage(PAGE_CODE)).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getPage(PAGE_CODE);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: `/api/pages/${PAGE_CODE}?status=${PAGE_STATUS_DRAFT}`,
        method: METHODS.GET,
        useAuthentication: true,
      }));
    });

    it('makes the correct request with other page status', () => {
      getPage(PAGE_CODE, PAGE_STATUS_PUBLISHED);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: `/api/pages/${PAGE_CODE}?status=${PAGE_STATUS_PUBLISHED}`,
        method: METHODS.GET,
        useAuthentication: true,
      }));
    });

    it('error on request', () => {
      makeRequest.mockImplementationOnce(jest.fn(({ errors }) => errors()));
      getPage(PAGE_CODE);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: `/api/pages/${PAGE_CODE}?status=${PAGE_STATUS_DRAFT}`,
        method: METHODS.GET,
        useAuthentication: true,
      }));
    });
  });

  describe('getViewPages', () => {
    it('should return a Promise returned by makeRequest', () => {
      expect(getViewPages()).toBeInstanceOf(Promise);
      expect(makeRequest).toHaveBeenCalledWith(
        {
          uri: '/api/pages/viewpages',
          method: 'GET',
          mockResponse: VIEWPAGES_PAYLOAD,
          contentType: 'application/json',
          useAuthentication: true,
        },
      );
    });
  });

  describe('getPageChildren', () => {
    it('returns a promise', () => {
      expect(getPageChildren(PAGE_CODE)).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getPageChildren(PAGE_CODE);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: `/api/pages?parentCode=${PAGE_CODE}`,
        method: METHODS.GET,
        useAuthentication: true,
      }));
    });

    it('error on request', () => {
      makeRequest.mockImplementationOnce(jest.fn(({ errors }) => errors()));
      getPageChildren(PAGE_CODE);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: `/api/pages?parentCode=${PAGE_CODE}`,
        method: METHODS.GET,
        useAuthentication: true,
      }));
    });
  });

  describe('putPageWidget', () => {
    const PAGE_CONFIG_ITEM = { code: 'some_code' };
    const FRAME_POS = 1;
    it('returns a promise', () => {
      expect(putPageWidget(PAGE_CODE, FRAME_POS, PAGE_CONFIG_ITEM)).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      putPageWidget(PAGE_CODE, FRAME_POS, PAGE_CONFIG_ITEM);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: `/api/pages/${PAGE_CODE}/widgets/${FRAME_POS}`,
        method: METHODS.PUT,
        body: PAGE_CONFIG_ITEM,
        useAuthentication: true,
      }));
    });
  });

  describe('getSearchPages', () => {
    it('returns a promise', () => {
      expect(getSearchPages()).toBeInstanceOf(Promise);
    });
    it('verify success searchPages', () => {
      getSearchPages();
      expect(makeRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          uri: '/api/pages/search',
          method: METHODS.GET,
          mockResponse: SEARCH_PAGES,
          useAuthentication: true,
        }),
        {
          page: 1,
          pageSize: 10,
        },
      );
    });
  });
});
