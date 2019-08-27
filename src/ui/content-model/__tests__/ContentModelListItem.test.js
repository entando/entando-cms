import React from 'react';
import { shallow } from 'enzyme';
import { DropdownKebab } from 'patternfly-react';

import { configEnzymeAdapter } from 'testutils/helpers';

import ContentModelListItem from 'ui/content-model/ContentModelListItem';

configEnzymeAdapter();

const props = {
  id: 10012,
  contentType: 'Generic Content',
  descr: 'Hero Unit + Picture',
};

let component;

describe('content-model/ContentModelListItem', () => {
  beforeEach(() => {
    component = shallow(<ContentModelListItem {...props} />);
  });

  it('renders component without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('is a <tr> element', () => {
    expect(component.is('tr')).toBe(true);
  });

  it('has class ContentModelList', () => {
    expect(component.hasClass('ContentModelList')).toBe(true);
  });

  it('has last column is a DropdownKebab Component', () => {
    const last = component.find('td').last();
    expect(last.find(DropdownKebab).exists()).toBe(true);
  });
});
