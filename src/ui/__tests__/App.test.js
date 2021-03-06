import React from 'react';
import { mount } from 'enzyme';
import { Route } from 'react-router-dom';
import {
  configEnzymeAdapter,
  mockRenderWithStore,
  createMockHistory,
  mockRenderWithRouter,
} from 'testutils/helpers';
import {
  SUPERUSER_PERMISSION,
  CRUD_CONTENTS_PERMISSION,
  VALIDATE_CONTENTS_PERMISSION,
  MANAGE_RESOURCES_PERMISSION,
} from 'state/permissions/const';
import IntlProviderContainer from 'ui/locale/IntlProviderContainer';

import App from 'ui/App';

const props = {
  setupLanguage: jest.fn(),
};

const STATE = {
  loading: {},
  locale: 'en',
  messages: [],
  modal: { visibleModal: '', info: {} },
  permissions: {
    list: [
      SUPERUSER_PERMISSION,
      CRUD_CONTENTS_PERMISSION,
      VALIDATE_CONTENTS_PERMISSION,
      MANAGE_RESOURCES_PERMISSION,
    ],
    loggedUser: [SUPERUSER_PERMISSION],
  },
  apps: {
    cms: {
      contentTemplate: { list: [] },
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
    },
  },
};

configEnzymeAdapter();

describe('App', () => {
  const history = createMockHistory();
  const component = mount(
    mockRenderWithStore(mockRenderWithRouter(<App {...props} />, history), STATE),
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
