import React from 'react';
import { mount } from 'enzyme';
import { Route } from 'react-router-dom';
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
  messages: [],
  contentModel: { list: [] },
  modal: { visibleModal: '', info: {} },
  editContent: {
    ownerGroupDisabled: {
      disabled: false,
    },
    language: 'EN',
    groups: [],
    content: {},
  },
  categories: {
    list: [],
    map: [],
    childrenMap: [],
    statusMap: [],
    titlesMap: [],
  },
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
    expect(component.find(Route).exists()).toBe(true);
  });
});
