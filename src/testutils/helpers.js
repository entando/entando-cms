import React from 'react';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { config } from '@entando/apimanager';
import { configure } from 'enzyme';
import { Provider as StateProvider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import IntlProviderContainer from 'ui/locale/IntlProviderContainer';

export const configEnzymeAdapter = () => {
  configure({ adapter: new Adapter() });
};

export const createMockHistory = () => createMemoryHistory({ initialEntries: ['/'] });

export const mockRenderWithRouter = (ui, history) => (
  <Router history={history}>{ui}</Router>
);

export const createMockStore = (state = {}) => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore(state);
  config(store);
  return store;
};

export const mockRenderWithStore = (ui, state = {}) => {
  const STORE = createMockStore(state);
  return <StateProvider store={STORE}>{ui}</StateProvider>;
};


export const mockRenderWithIntl = (ui, state = {}) => {
  const STATE = { ...state, locale: 'en' };
  return (
    mockRenderWithStore(
      <IntlProviderContainer>{ui}</IntlProviderContainer>,
      STATE,
    )
  );
};
