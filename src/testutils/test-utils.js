import React from 'react';
import { createStore } from 'redux';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import rootReducer from 'state/rootReducer';

const renderWithRedux = (
  component,
  { initialState, reducer = rootReducer } = {},
) => {
  const store = createStore(reducer, initialState);
  return ({
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  });
};

const renderWithReactIntl = component => render(<IntlProvider locale="en">{component}</IntlProvider>);

const createMockHistory = () => createMemoryHistory({ initialEntries: ['/'] });

const renderWithRouter = (ui, history = createMockHistory()) => (
  <Router history={history}>{ui}</Router>
);

export {
  renderWithRedux, renderWithReactIntl, renderWithRouter,
};
