import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

import { configEnzymeAdapter } from 'testutils/helpers';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';

configEnzymeAdapter();

const CHILD = 'Page title';

describe('ui/common/BreadcrumbItem', () => {
  let component;
  beforeEach(() => {
    component = shallow(
      <BreadcrumbItem route="homePage" to="/home">
        {CHILD}
      </BreadcrumbItem>,
    );
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('component root is <li> element', () => {
    expect(component.find('li').exists()).toBe(true);
  });

  it('component root has class BreadcrumbItem', () => {
    expect(component.hasClass('BreadcrumbItem')).toBe(true);
  });

  it('component has a Link child', () => {
    expect(component.find(Link).exists()).toBe(true);
  });

  it('component root has active class', () => {
    component = shallow(<BreadcrumbItem active>{CHILD}</BreadcrumbItem>);
    expect(component.hasClass('active')).toBe(true);
  });

  it('component with children prop only', () => {
    component = shallow(<BreadcrumbItem>{CHILD}</BreadcrumbItem>);
    expect(component.find('a').exists()).toBe(false);
    expect(component.hasClass('active')).toBe(false);
  });
});
