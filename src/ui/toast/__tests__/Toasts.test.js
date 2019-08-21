import React from 'react';
import { configEnzymeAdapter } from 'testutils/helpers';
import { shallow } from 'enzyme';
import { ToastNotificationList } from 'patternfly-react';

import Toasts from 'ui/toast/Toasts';

configEnzymeAdapter();

const component = shallow(<Toasts onDismiss={() => {}} />);


describe('Toasts', () => {
  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('verify it is a ToastNotificationList', () => {
    expect(component.type()).toBe(ToastNotificationList);
  });
});
