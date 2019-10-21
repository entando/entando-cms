import React from 'react';
import { mount } from 'enzyme';

import {
  configEnzymeAdapter,
  mockRenderWithIntl,
  mockRenderWithRouter,
  createMockHistory,
} from 'testutils/helpers';

import ContentModelListPage from 'ui/content-model/ContentModelListPage';
import ContentModelListContainer from 'ui/content-model/ContentModelListContainer';

configEnzymeAdapter();

const initState = {
  loading: {},
  apps: {
    cms: {
      contentModel: {
        list: [],
        opened: {},
        filters: {
          filterProps: {},
          attribute: 'descr',
        },
      },
    },
  },
  modal: { visibleModal: '', info: {} },
  pagination: {
    global: {
      page: 1,
      pageSize: 10,
      lastPage: 1,
      totalItems: 0,
    },
  },
};

let component;

describe('content-model/ContentModelListPage', () => {
  beforeEach(() => {
    component = mount(
      mockRenderWithRouter(
        mockRenderWithIntl(
          <ContentModelListPage />,
          initState,
        ),
        createMockHistory(),
      ),
    );
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('has CardGrid', () => {
    expect(component.find('CardGrid').exists()).toBe(true);
  });

  it('contains ContentModelListContainer', () => {
    expect(component.find(ContentModelListContainer).exists()).toBe(true);
  });
});
