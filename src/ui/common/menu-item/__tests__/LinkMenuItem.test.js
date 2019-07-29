import React from 'react';
import { configEnzymeAdapter } from 'testutils/helpers';
import { shallow } from 'enzyme';

import LinkMenuItem from 'ui/common/menu-item/LinkMenuItem';

configEnzymeAdapter();

const ID = 'item-id';
const LABEL = 'Link label';
const ROUTE = 'mockRoute';

let component;

describe('ui/menu/menu-item/LinkMenuItem', () => {
  describe('basic usage', () => {
    beforeEach(() => {
      component = shallow((
        <LinkMenuItem
          id={ID}
          label={LABEL}
          route={ROUTE}
          to="toto"
        />
      ));
    });
    it('should render a patternfly compliant menu item (<li>)', () => {
      expect(component.is('li')).toBe(true);
    });

    it('should have LinkMenuItem class', () => {
      expect(component.hasClass('LinkMenuItem')).toBe(true);
    });
  });

  describe('with prop active', () => {
    it('should have "active" class if prop active === true', () => {
      component = shallow((
        <LinkMenuItem
          id={ID}
          label={LABEL}
          route={ROUTE}
          active
          to="toto"
        />
      ));
      expect(component.hasClass('active')).toBe(true);
    });
    it('should have "active" class if prop active === false', () => {
      component = shallow((
        <LinkMenuItem
          id={ID}
          label={LABEL}
          route={ROUTE}
          to="toto"
        />
      ));
      expect(component.hasClass('active')).toBe(false);
    });
  });

  describe('with prop pullRight', () => {
    it('should have "pull-right" class if prop pullRight === true', () => {
      component = shallow((
        <LinkMenuItem
          id={ID}
          label={LABEL}
          route={ROUTE}
          pullRight
          to="toto"
        />
      ));
      expect(component.hasClass('pull-right')).toBe(true);
    });
    it('should have "pull-right" class if prop pullRight === false', () => {
      component = shallow((
        <LinkMenuItem
          id={ID}
          label={LABEL}
          route={ROUTE}
          to="toto"
        />
      ));
      expect(component.hasClass('pull-right')).toBe(false);
    });
  });

  describe('with prop pullRight', () => {
    it('should pass "className" to the root <li> element', () => {
      const testClass = 'test-class';
      component = shallow((
        <LinkMenuItem
          id={ID}
          label={LABEL}
          route={ROUTE}
          className={testClass}
          to="toto"
        />
      ));
      expect(component.hasClass(testClass)).toBe(true);
    });
  });
});
