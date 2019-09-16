import React from 'react';
import { shallow } from 'enzyme';

import { configEnzymeAdapter } from 'testutils/helpers';

import EditContentModelPage from 'ui/content-model/EditContentModelPage';
import EditContentModelFormContainer from 'ui/content-model/EditContentModelFormContainer';

configEnzymeAdapter();

let component;

describe('ui/content-model/EditContentModelPage', () => {
  beforeEach(() => {
    component = shallow(<EditContentModelPage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('is CMSShell', () => {
    expect(component.is('CMSShell')).toBe(true);
  });

  it('contains AddContentModelFormContainer', () => {
    expect(component.find(EditContentModelFormContainer).exists()).toBe(true);
  });
});
