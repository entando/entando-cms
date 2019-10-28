import React from 'react';
import { shallow } from 'enzyme';

import ContentAttributes from 'ui/edit-content/content-attributes/ContentAttributes';
import { configEnzymeAdapter, findByTestId } from 'testutils/helpers';

configEnzymeAdapter();

describe('ui/edit-content/content-attributes/ContentAttributes', () => {
  const onDidMountMock = jest.fn();
  const attributes = [{ code: 'Title', type: 'text' }];
  const wrapper = shallow(
    <ContentAttributes
      onDidMount={onDidMountMock}
      attributes={attributes}
    />,
  );

  it('should call onDidMount prop when componentDidMount is called', () => {
    const instance = wrapper.instance();
    instance.componentDidMount();
    expect(onDidMountMock).toHaveBeenCalled();
  });

  it('should contain a field array with passed in attributes as prop', () => {
    const testId = 'edit-content-content-attributes-field-array';
    const fieldArrayWrapper = findByTestId(wrapper, testId);
    expect(fieldArrayWrapper.length).toBe(1);
    expect(fieldArrayWrapper.props().attributes).toMatchObject(attributes);
  });
});
