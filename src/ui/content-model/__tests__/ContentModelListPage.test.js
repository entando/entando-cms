import React from 'react';
import { shallow } from 'enzyme';

import { configEnzymeAdapter } from 'testutils/helpers';

import ContentModelListPage from 'ui/content-model/ContentModelListPage';
import ContentModelList from 'ui/content-model/ContentModelList';

configEnzymeAdapter();

let component;

describe('content-model/ContentModelListPage', () => {
  beforeEach(() => {
    component = shallow(<ContentModelListPage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('is CMSShell', () => {
    expect(component.is('CMSShell')).toBe(true);
  });

  it('contains ContentModelList', () => {
    expect(component.find(ContentModelList).exists()).toBe(true);
  });
});
