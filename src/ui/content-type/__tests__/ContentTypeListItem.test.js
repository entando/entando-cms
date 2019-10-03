import React from 'react';
import {
  configEnzymeAdapter,
  mockRenderWithIntl,
  mockRenderWithRouter,
} from 'testutils/helpers';
import { mount } from 'enzyme';
import { DropdownKebab } from 'patternfly-react';

import ContentTypeListItem from 'ui/content-type/ContentTypeListItem';

configEnzymeAdapter();

const onClickDelete = jest.fn();
const onClickReload = jest.fn();

describe('ContentTypeListItem', () => {
  let component;
  beforeEach(() => {
    component = mount(mockRenderWithRouter(mockRenderWithIntl(
      <ContentTypeListItem code="code" name="maw" status="0" onDelete={onClickDelete} onReload={onClickReload} />,
    )));
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('has a drop down with kebab button', () => {
    expect(component.find(DropdownKebab).exists()).toBe(true);
  });
});
