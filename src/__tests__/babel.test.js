import React from 'react';
import { mount, shallow } from 'enzyme';
import { configEnzymeAdapter, createMockHistory, mockRenderWithRouter } from 'testutils/helpers';
import { Route } from 'react-router-dom';
import { LinkMenuItem } from '@entando/menu';
import cms from 'babel';

configEnzymeAdapter();

describe('exports cms', () => {
  it('is an object', () => {
    expect(cms).toBeInstanceOf(Object);
  });

  describe('the id key', () => {
    it('is cms', () => {
      expect(cms).toHaveProperty('id', 'cms');
    });
  });

  describe('the state key', () => {
    const { state } = cms;

    it('contains the correct number of states', () => {
      expect(state).toBeInstanceOf(Function);
    });
  });

  describe('the routes key', () => {
    const history = createMockHistory();
    const component = mount(mockRenderWithRouter(<>{cms.routes}</>, history));
    it('contains <Route> elements', () => {
      expect(component.find(Route).exists()).toBe(true);
    });
  });

  describe('the routesDir key', () => {
    it('is an array of routes definitions in object form', () => {
      const { routesDir } = cms;
      expect(Array.isArray(routesDir)).toBe(true);
      expect(routesDir).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: expect.any(String),
            component: expect.any(Function),
          }),
        ]),
      );
    });
  });

  describe('the menu key', () => {
    const Menu = cms.menu;
    const component = shallow(<Menu />);

    it('contains <LinkMenuItem> elements', () => {
      expect(component.find(LinkMenuItem).exists()).toBe(true);
    });
  });

  describe('the locales key', () => {
    it('contains the english locale', () => {
      expect(cms.locales).toHaveProperty('en');
    });

    it('contains the italian locale', () => {
      expect(cms.locales).toHaveProperty('it');
    });
  });
});
