import React from 'react';
import { configEnzymeAdapter } from 'testutils/helpers';
import { shallow } from 'enzyme';

import RenderSearchFormInput from 'ui/common/form/RenderSearchFormInput';

configEnzymeAdapter();

describe('ui/common/form/RenderSearchFormInput', () => {
  let component = shallow(<RenderSearchFormInput />);

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('checks classname', () => {
    expect(component.hasClass('SearchForm__textbox')).toEqual(true);
  });

  it('checks input props', () => {
    const el = component.find('input');
    expect(el.exists()).toEqual(true);
    expect(el.hasClass('SearchForm__textbox--base')).toEqual(true);
  });

  it('checks element parts', () => {
    component = shallow(<RenderSearchFormInput input={{ value: 'hey' }} />);
    expect(component.find('Button').exists()).toEqual(true);
  });
});
