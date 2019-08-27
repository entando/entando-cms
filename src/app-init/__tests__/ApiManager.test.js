import React from 'react';
import { shallow } from 'enzyme';

import {
  setApi,
  loginUser,
  useMocks,
  getUsername,
  getToken,
} from '@entando/apimanager';
import { addToast } from '@entando/messages';

import { createMockStore, configEnzymeAdapter } from 'testutils/helpers';
import { login } from 'api/login';

import ApiManager from 'app-init/ApiManager';

configEnzymeAdapter();

process.env.NODE_ENV = 'development';

jest.mock('@entando/messages', () => ({
  addToast: jest.fn(() => ({ type: 'addtoast' })),
  addErrors: jest.fn(() => ({ type: 'adderror' })),
}));

jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  setApi: jest.fn(() => ({ type: 'api/set-api', payload: { api: 'a' } })),
  config: require.requireActual('@entando/apimanager').config,
  METHODS: { POST: 'POST' },
  getUsername: jest.fn(() => ''),
  getToken: jest.fn(() => ''),
  useMocks: jest.fn(() => false),
  loginUser: jest.fn(),
}));

jest.mock('api/login', () => ({
  login: jest.fn(() => new Promise(resolve => (
    resolve({ json: () => ({ access_token: 'oioioi' }) })
  ))),
}));

jest.spyOn(ApiManager.prototype, 'isUserLogged');
jest.spyOn(ApiManager.prototype, 'announceMockMode');
jest.spyOn(ApiManager.prototype, 'performAutoLogin');

let store;
let component;

describe('ApiManager', () => {
  beforeEach(() => {
    store = createMockStore();
  });

  it('renders without crashing', () => {
    component = shallow(<ApiManager store={store}>Hello</ApiManager>);
    expect(component.exists()).toBe(true);
  });

  it('calls setApi, login, loginUser', () => {
    component = shallow(<ApiManager store={store}>Hello</ApiManager>);
    expect(setApi).toHaveBeenCalledWith({
      domain: process.env.REACT_APP_DOMAIN,
      useMocks: false,
    });
    expect(getUsername).toHaveBeenCalled();
    expect(getToken).toHaveBeenCalled();
    expect(ApiManager.prototype.isUserLogged).toHaveBeenCalled();
    expect(ApiManager.prototype.performAutoLogin).toHaveBeenCalled();
    expect(login).toHaveBeenCalledWith('admin', 'adminadmin');
    expect(loginUser).toHaveBeenCalledWith('admin', 'oioioi');
  });

  it('will call announceMockMode when useMocks=true', () => {
    useMocks.mockImplementation(() => true);
    component = shallow(<ApiManager store={store}>Hello</ApiManager>);
    expect(ApiManager.prototype.announceMockMode).toHaveBeenCalled();
    expect(addToast).toHaveBeenCalled();
    useMocks.mockRestore();
  });

  it('will still call performAutoLogin even there is username', () => {
    getUsername.mockImplementation(() => 'yoyo');
    component = shallow(<ApiManager store={store}>Hello</ApiManager>);
    expect(login).toHaveBeenCalledWith('admin', 'adminadmin');
  });
});
