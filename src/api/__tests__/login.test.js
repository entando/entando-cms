import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { login } from 'api/login';
import { makeRequest } from '@entando/apimanager';

configure({ adapter: new Adapter() });

jest.unmock('api/login');
jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: { POST: 'POST' },
}));

describe('api/login', () => {
  it('returns a promise', () => {
    const response = login('gianni', 'moi');
    expect(makeRequest).toHaveBeenCalledWith({
      uri: '/api/oauth/token',
      method: 'POST',
      mockResponse: {},
      contentType: 'application/x-www-form-urlencoded',
      headers: {
        Authorization: 'Basic YXBwYnVpbGRlcjphcHBidWlsZGVyX3NlY3JldA==',
      },
      body: {
        username: 'gianni',
        password: 'moi',
        grant_type: 'password',
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
      },
    });
    expect(response).toBeInstanceOf(Promise);
  });
});
