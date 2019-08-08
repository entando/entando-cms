import React from 'react';
import { mount } from 'enzyme';

import { configEnzymeAdapter, mockRenderWithIntl } from 'testutils/helpers';
import { injectIntl } from 'react-intl';

import RenderTextInput from 'ui/common/form/RenderTextInput';
import RenderDropdownTypeaheadInput from 'ui/common/form/RenderDropdownTypeaheadInput';
import RenderContentModelInput from 'ui/common/form/RenderContentModelInput';
import AddContentModelForm from 'ui/content-model/AddContentModelForm';

configEnzymeAdapter();

const PROPS = {
  handleSubmit: jest.fn(),
  contentTypes: [
    { contentType: 'Hello' },
    { contentType: 'World' },
  ],
};

describe('content-model/AddContentModelForm', () => {
  const InjectedAddContentModelForm = injectIntl(AddContentModelForm);
  const component = mount(
    mockRenderWithIntl(<InjectedAddContentModelForm {...PROPS} />),
  );

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('contains the modal', () => {
    const element = component.find('Modal');
    expect(element.exists()).toBe(true);
    const openModalBtn = component.find('.AddContentModelForm__editassistbtn').at(0);
    expect(openModalBtn.exists()).toBe(true);
  });

  it('contains the code, name, contentType, and stylesheet field', () => {
    const field1 = component.find('Field[name="code"]');
    const props1 = field1.at(0).props();

    const field2 = component.find('Field[name="name"]');
    const props2 = field2.at(0).props();

    const field3 = component.find('Field[name="contentType"]');
    const props3 = field3.at(0).props();

    const field4 = component.find('Field[name="stylesheet"]');
    const props4 = field4.at(0).props();

    expect(field1.exists()).toBe(true);
    expect(props1).toHaveProperty('component', RenderTextInput);
    expect(field2.exists()).toBe(true);
    expect(props2).toHaveProperty('component', RenderTextInput);
    expect(field3.exists()).toBe(true);
    expect(props3).toHaveProperty('component', RenderDropdownTypeaheadInput);
    expect(field4.exists()).toBe(true);
    expect(props4).toHaveProperty('component', RenderTextInput);
  });

  it('contains the model field', () => {
    const element = component.find('Field[name="model"]');
    expect(element.exists()).toBe(true);
    const props = element.at(0).props();
    expect(props).toHaveProperty('component', RenderContentModelInput);
  });
});
