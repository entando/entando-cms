import { makeRequest, METHODS } from '@entando/apimanager';
import { RESPONSE_CONTENTS_OK } from 'testutils/mocks/contents';

const getAssetsPath = '/api/plugins/cms/contents';

// eslint-disable-next-line import/prefer-default-export
export const getContents = (page, params = '') => makeRequest({
  uri: `${getAssetsPath}${params}`,
  method: METHODS.GET,
  contentType: 'application/json',
  mockResponse: RESPONSE_CONTENTS_OK,
  useAuthentication: true,
}, page);
