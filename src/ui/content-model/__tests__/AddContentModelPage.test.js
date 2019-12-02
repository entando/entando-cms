import React from 'react';
import { shallow } from 'enzyme';

import { configEnzymeAdapter } from 'testutils/helpers';

import AddContentModelPage from 'ui/content-model/AddContentModelPage';
import AddContentModelFormContainer from 'ui/content-model/AddContentModelFormContainer';

configEnzymeAdapter();

let component;

describe('ui/content-model/AddContentModelPage', () => {
  beforeEach(() => {
    component = shallow(<AddContentModelPage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('is Grid', () => {
    expect(component.is('Grid')).toBe(true);
  });

  it('contains AddContentModelFormContainer', () => {
    expect(component.find(AddContentModelFormContainer).exists()).toBe(true);
  });
});
