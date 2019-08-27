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
  contentModel: { list: [] },
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

  it('has CMSShell', () => {
    expect(component.find('CMSShell').exists()).toBe(true);
  });

  it('contains ContentModelListContainer', () => {
    expect(component.find(ContentModelListContainer).exists()).toBe(true);
  });
});
