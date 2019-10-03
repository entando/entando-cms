import React from 'react';

import { configEnzymeAdapter } from 'testutils/helpers';
import { shallow } from 'enzyme';
import AttributesNumber from 'ui/common/attributes/AttributesNumber';

configEnzymeAdapter();

describe('AttributesNumber', () => {
  it('renders without crashing', () => {
    const component = shallow(<AttributesNumber />);
    expect(component.exists()).toEqual(true);
  });
});
