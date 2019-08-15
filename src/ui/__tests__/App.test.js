import React from 'react';
import { mount } from 'enzyme';
import Routes from 'app-init/Routes';
import {
  configEnzymeAdapter,
  mockRenderWithStore,
  createMockHistory,
  mockRenderWithRouter,
} from 'testutils/helpers';
import IntlProviderContainer from 'ui/locale/IntlProviderContainer';

import App from 'ui/App';

const props = {
  setupLanguage: jest.fn(),
};

const STATE = {
  loading: {},
  locale: 'en',
  contentModel: { list: [] },
};

configEnzymeAdapter();

describe('App', () => {
  const history = createMockHistory();
  const component = mount(
    mockRenderWithStore(
      mockRenderWithRouter(<App {...props} />, history),
      STATE,
    ),
  );

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('calls setupLanguage on mount', () => {
    expect(props.setupLanguage).toHaveBeenCalledWith('en');
  });

  it('has <IntlProviderContainer> and <Routes> component instances', () => {
    expect(component.find(IntlProviderContainer).exists()).toBe(true);
    expect(component.find(Routes).exists()).toBe(true);
  });
});
