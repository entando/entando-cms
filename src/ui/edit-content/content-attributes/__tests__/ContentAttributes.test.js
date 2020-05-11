import React from 'react';
import { shallow } from 'enzyme';

import ContentAttributes from 'ui/edit-content/content-attributes/ContentAttributes';
import { configEnzymeAdapter, findByTestId } from 'testutils/helpers';
import { LANGUAGES_LIST } from 'testutils/mocks/languages';

configEnzymeAdapter();

describe('ui/edit-content/content-attributes/ContentAttributes', () => {
  const onDidMountMock = jest.fn();
  const onWillUnmountMock = jest.fn();
  const attributes = [{ code: 'Title', type: 'text' }];
  const wrapper = shallow(
    <ContentAttributes
      onDidMount={onDidMountMock}
      onWillUnmount={onWillUnmountMock}
      attributes={attributes}
      languages={LANGUAGES_LIST}
    />,
  );

  it('should call onDidMount prop when componentDidMount is called', () => {
    const instance = wrapper.instance();
    instance.componentDidMount();
    expect(onDidMountMock).toHaveBeenCalled();
  });

  it('should call onWillUnmount prop when componentWillUnmount is called', () => {
    const instance = wrapper.instance();
    instance.componentWillUnmount();
    expect(onWillUnmountMock).toHaveBeenCalled();
  });

  it('should contain a field array with passed in attributes as prop', () => {
    const testId = 'edit-content-content-attributes-field-array';
    const fieldArrayWrapper = findByTestId(wrapper, testId);
    expect(fieldArrayWrapper.length).toBe(3);
    const allAttributes = fieldArrayWrapper.map(field => field.props().attributes);
    expect(allAttributes).toMatchObject([attributes, attributes, attributes]);
  });
});
