import { configEnzymeAdapter } from 'testutils/helpers';

import { getContents, deleteContent, publishContent } from 'api/contents';
import { makeRequest } from '@entando/apimanager';
import { RESPONSE_CONTENTS_OK, RESPONSE_DELETE_OK, RESPONSE_PUBLISH_OK } from 'testutils/mocks/contents';

configEnzymeAdapter();

jest.unmock('api/contents');
jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: { GET: 'GET', PUT: 'PUT', DELETE: 'DELETE' },
}));

describe('api/contents', () => {
  describe('get contents', () => {
    it('returns a promise', () => {
      const response = getContents({ page: 1, pageSize: 10 });
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/plugins/cms/contents',
        method: 'GET',
        mockResponse: RESPONSE_CONTENTS_OK,
        contentType: 'application/json',
        useAuthentication: true,
      }, { page: 1, pageSize: 10 });
      expect(response).toBeInstanceOf(Promise);
    });
  });

  describe('delete content', () => {
    it('returns a promise', () => {
      const response = deleteContent('NEW1');
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/plugins/cms/contents/NEW1',
        method: 'DELETE',
        mockResponse: RESPONSE_DELETE_OK,
        contentType: 'application/json',
        useAuthentication: true,
      });
      expect(response).toBeInstanceOf(Promise);
    });
  });

  describe('publish/unpublish content', () => {
    it('returns a promise', () => {
      const response = publishContent('NEW1', 'published');
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/plugins/cms/contents/NEW1/status',
        method: 'PUT',
        mockResponse: RESPONSE_PUBLISH_OK,
        contentType: 'application/json',
        useAuthentication: true,
        body: { status: 'published' },
      });
      expect(response).toBeInstanceOf(Promise);
    });
  });
});