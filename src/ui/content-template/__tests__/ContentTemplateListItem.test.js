import React from 'react';
import { shallow } from 'enzyme';
import { DropdownKebab } from 'patternfly-react';

import { configEnzymeAdapter } from 'testutils/helpers';

import ContentTemplateListItem from 'ui/content-template/ContentTemplateListItem';

configEnzymeAdapter();

const props = {
  id: 10012,
  contentType: 'Generic Content',
  descr: 'Hero Unit + Picture',
  onDelete: () => {},
};

let component;

describe('content-template/ContentTemplateListItem', () => {
  beforeEach(() => {
    component = shallow(<ContentTemplateListItem {...props} />);
  });

  it('renders component without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('is a <tr> element', () => {
    expect(component.is('tr')).toBe(true);
  });

  it('has class ContentTemplateList', () => {
    expect(component.hasClass('ContentTemplateList')).toBe(true);
  });

  it('has last column is a DropdownKebab Component', () => {
    const last = component.find('td').last();
    expect(last.find(DropdownKebab).exists()).toBe(true);
  });
});
