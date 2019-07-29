import React from 'react';
import { shallow } from 'enzyme';

import { configEnzymeAdapter } from 'testutils/helpers';

import ContentModelList from 'ui/content-model/ContentModelList';

configEnzymeAdapter();

let component;

describe('content-model/ContentModelList', () => {
  beforeEach(() => {
    component = shallow(<ContentModelList />);
  });

  it('renders component without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('is a table', () => {
    expect(component.is('table')).toBe(true);
  });

  it('has class ContentModelList__table', () => {
    expect(component.hasClass('ContentModelList__table')).toBe(true);
  });
});
