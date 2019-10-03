import React from 'react';

import { configEnzymeAdapter } from 'testutils/helpers';
import { shallow } from 'enzyme';
import AttributeInfo from 'ui/common/attributes/AttributeInfo';

configEnzymeAdapter();

describe('AttributeInfo', () => {
  it('renders without crashing', () => {
    const component = shallow(<AttributeInfo />);
    expect(component.exists()).toEqual(true);
  });
});
