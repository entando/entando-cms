import React from 'react';
import { mount } from 'enzyme';

import {
  configEnzymeAdapter,
  mockRenderWithIntl,
  mockRenderWithRouter,
  createMockHistory,
} from 'testutils/helpers';

import ContentSettingsPage from 'ui/content-settings/ContentSettingsPage';
import ContentSettingsGeneralContainer from 'ui/content-settings/ContentSettingsGeneralContainer';

configEnzymeAdapter();

const initState = {
  loading: {},
  contentSettings: {},
};

let component;

describe('content-settings/ContentSettingsPage', () => {
  beforeEach(() => {
    component = mount(
      mockRenderWithRouter(
        mockRenderWithIntl(
          <ContentSettingsPage />,
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

  it('contains ContentSettingsGeneralContainer', () => {
    expect(component.find(ContentSettingsGeneralContainer).exists()).toBe(true);
  });
});
