import React from 'react';
import { shallow } from 'enzyme';

import ContentAttributes from 'ui/edit-content/content-attributes/ContentAttributes';
import { configEnzymeAdapter, findByTestId } from 'testutils/helpers';

configEnzymeAdapter();

describe('ui/edit-content/content-attributes/ContentAttributes', () => {
  const onDidMountMock = jest.fn();
  const wrapper = shallow(
    <ContentAttributes onDidMount={onDidMountMock} />,
  );

  it('should call onDidMount prop when componentDidMount is called', () => {
    const instance = wrapper.instance();
    instance.componentDidMount();
    expect(onDidMountMock).toHaveBeenCalled();
  });

  it('should contain a field array', () => {
    const testId = 'edit-content-content-attributes-field-array';
    expect(findByTestId(wrapper, testId).length).toBe(1);
  });
});
