import { METHODS, makeRequest } from '@entando/apimanager';

// eslint-disable-next-line import/prefer-default-export
export const getContents = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/api/plugins/cms/contents?${params}`,
      method: METHODS.GET,
      mockResponse: {},
      contentType: 'application/x-www-form-urlencoded',
      headers: {
        Authorization: `Basic ${btoa(`${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`)}`,
      },
    },
    page,
  )
);
