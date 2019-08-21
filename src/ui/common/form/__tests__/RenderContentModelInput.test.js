import React from 'react';
import { configEnzymeAdapter } from 'testutils/helpers';
import { mount } from 'enzyme';
import AceEditor from 'react-ace';

import RenderContentModelInput from 'ui/common/form/RenderContentModelInput';

configEnzymeAdapter();

describe('ui/common/form/RenderContentModelInput', () => {
  const props = {
    input: {
      name: 'model',
      value: 'hello',
      onChange: jest.fn(),
      onFocus: jest.fn(),
    },
    id: 'model',
  };

  const component = mount(<RenderContentModelInput {...props} />);

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('checks AceEditor and its props', () => {
    const el = component.find(AceEditor);
    expect(el.exists()).toEqual(true);
    expect(el.prop('name')).toEqual(props.input.name);
  });
});
