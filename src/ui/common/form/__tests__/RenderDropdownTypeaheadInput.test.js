import React from 'react';
import { configEnzymeAdapter, mockRenderWithIntl } from 'testutils/helpers';
import { mount } from 'enzyme';

import RenderDropdownTypeaheadInput from 'ui/common/form/RenderDropdownTypeaheadInput';

configEnzymeAdapter();

describe('ui/common/form/RenderDropdownTypeaheadInput', () => {
  const props = {
    options: [{ label: 'a' }, { label: 'b' }],
    input: { name: 'a' },
    id: 'a',
  };

  const component = mount(mockRenderWithIntl(<RenderDropdownTypeaheadInput {...props} />));

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('checks Toggle button and its props', () => {
    const el = component.find('button');
    expect(el.exists()).toEqual(true);
    expect(el.hasClass('DropdownTypeahead__toggle-button')).toEqual(true);
  });

  it('checks Typeahead and option props', () => {
    const el = component.find('Typeahead');
    expect(el.exists()).toEqual(true);
    expect(el.prop('options')).toEqual(props.options);
  });
});
