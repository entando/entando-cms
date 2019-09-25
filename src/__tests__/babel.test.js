import React from 'react';
import { mount } from 'enzyme';
import { configEnzymeAdapter, createMockHistory, mockRenderWithRouter } from 'testutils/helpers';
import { Route } from 'react-router-dom';
import { state, routes } from 'babel';

configEnzymeAdapter();

describe('babel state as export', () => {
  it('contains the correct number of states', () => {
    expect(state).toBeInstanceOf(Object);
    expect(Object.keys(state)).toHaveLength(8);
  });

  it('contains the locale state', () => {
    expect(state).toHaveProperty('locale');
  });

  it('contains the contentModel state', () => {
    expect(state).toHaveProperty('contentModel');
  });

  it('contains the contentType state', () => {
    expect(state).toHaveProperty('contentType');
  });

  it('contains the editContent state', () => {
    expect(state).toHaveProperty('editContent');
  });

  it('contains the loading state', () => {
    expect(state).toHaveProperty('loading');
  });

  it('contains the modal state', () => {
    expect(state).toHaveProperty('modal');
  });

  it('contains the categories state', () => {
    expect(state).toHaveProperty('categories');
  });

  it('contains the contentSettings state', () => {
    expect(state).toHaveProperty('contentSettings');
  });
});

describe('babel routes as export', () => {
  const history = createMockHistory();
  const component = mount(
    mockRenderWithRouter(<>{routes}</>, history),
  );
  it('test if exports are <Route>', () => {
    expect(component.find(Route).exists()).toBe(true);
  });
});
