import { makeRequest, METHODS } from '@entando/apimanager';

// eslint-disable-next-line import/prefer-default-export
export const login = (username, password) => makeRequest({
  uri: '/api/oauth/token',
  method: METHODS.POST,
  mockResponse: {},
  contentType: 'application/x-www-form-urlencoded',
  headers: {
    Authorization: `Basic ${btoa(`${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`)}`,
  },
  body: {
    username,
    password,
    grant_type: 'password',
    client_id: process.env.REACT_APP_CLIENT_ID,
    client_secret: process.env.REACT_APP_CLIENT_SECRET,
  },
});
