import React from 'react';
import { shallow, mount } from 'enzyme';

import { configEnzymeAdapter } from 'testutils/helpers';

import FirstLevelMenuItem from 'ui/common/menu-item/FirstLevelMenuItem';

configEnzymeAdapter();

const LABEL = <b>Label</b>;
const ID = 'mockId';

const children = <b>test</b>;
const eventMock = {
  preventDefault: jest.fn(),
};

let component;

describe('ui/menu/menu-item/DropdownMenuItem', () => {
  describe('basic usage', () => {
    beforeEach(() => {
      component = shallow((
        <FirstLevelMenuItem id={ID} label={LABEL}>{children}</FirstLevelMenuItem>
      ));
    });
    it('should render a patternfly compliant menu item (<li>)', () => {
      expect(component.is('li')).toBe(true);
    });

    it('should have FirstLevelMenuItem class', () => {
      expect(component.hasClass('FirstLevelMenuItem')).toBe(true);
    });
    it('should render the children', () => {
      expect(component.contains(children)).toBe(true);
    });
    it('should render the label', () => {
      expect(component.contains(LABEL)).toBe(true);
    });
  });

  describe('with prop className', () => {
    it('should add the classes to the component classes', () => {
      const CUSTOM_CLASS = 'custom-class';
      component = shallow((
        <FirstLevelMenuItem id={ID} label={LABEL} className={CUSTOM_CLASS}>
          {children}
        </FirstLevelMenuItem>
      ));
      expect(component.hasClass(CUSTOM_CLASS)).toBe(true);
    });
  });

  describe('with prop active', () => {
    it('should have "active" class if prop active === true', () => {
      component = shallow((
        <FirstLevelMenuItem id={ID} label={LABEL} active>
          {children}
        </FirstLevelMenuItem>
      ));
      expect(component.hasClass('active')).toBe(true);
    });
    it('should have "active" class if prop active === false', () => {
      component = shallow((
        <FirstLevelMenuItem id={ID} label={LABEL}>
          {children}
        </FirstLevelMenuItem>
      ));
      expect(component.hasClass('active')).toBe(false);
    });
  });

  describe('with prop pullRight', () => {
    it('should have "pull-right" class if prop pullRight === true', () => {
      component = shallow((
        <FirstLevelMenuItem id={ID} label={LABEL} pullRight>
          {children}
        </FirstLevelMenuItem>
      ));
      expect(component.hasClass('pull-right')).toBe(true);
    });
    it('should have "pull-right" class if prop pullRight === false', () => {
      component = shallow((
        <FirstLevelMenuItem id={ID} label={LABEL}>
          {children}
        </FirstLevelMenuItem>
      ));
      expect(component.hasClass('pull-right')).toBe(false);
    });
  });

  describe('on click', () => {
    const onClickMock = jest.fn();

    beforeEach(() => {
      component = mount((
        <FirstLevelMenuItem
          id={ID}
          label={LABEL}
          onClick={onClickMock}
        >
          {children}
        </FirstLevelMenuItem>
      ));
    });

    it('should call onClick when clicking on the <a> element', () => {
      component.find('a').first().simulate('click', eventMock);
      expect(onClickMock).toHaveBeenCalled();
    });
    it('should ev.preventDefault() to avoid reloading the page', () => {
      component.find('a').first().simulate('click', eventMock);
      expect(eventMock.preventDefault).toHaveBeenCalled();
    });
  });
});
