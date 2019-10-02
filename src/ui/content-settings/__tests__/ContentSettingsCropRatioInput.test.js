import React from 'react';
import { shallow } from 'enzyme';

import RatioInput from 'ui/content-settings/ContentSettingsCropRatioInput';
import { findByTestId, configEnzymeAdapter } from 'testutils/helpers';

configEnzymeAdapter();

describe('ContentSettingsCropRatioInput', () => {
  const inputTestId = 'content-settings-crop-ratio-input-field';
  const addBtnTestId = 'content-settings-crop-ratio-input-add';
  const deleteBtnTestId = 'content-settings-crop-ratio-input-delete';

  it('should have an input field', () => {
    const wrapper = shallow(<RatioInput />);

    expect(findByTestId(wrapper, inputTestId).length).toBe(1);
  });

  describe('when new', () => {
    const mockOnAddCallback = jest.fn();
    const wrapper = shallow(<RatioInput isNew onAdd={mockOnAddCallback} />);

    it('should have an add button', () => {
      expect(findByTestId(wrapper, addBtnTestId).length).toBe(1);
    });

    it('should not have a delete button', () => {
      expect(findByTestId(wrapper, deleteBtnTestId).length).toBe(0);
    });

    it('should call onAdd prop with inputted value after clicking the add button', () => {
      const value = '4:9';
      const changeEvent = {
        target: {
          value,
        },
      };

      const inputField = findByTestId(wrapper, inputTestId);
      inputField.simulate('change', changeEvent);

      const addBtn = findByTestId(wrapper, addBtnTestId);
      addBtn.simulate('click');

      expect(mockOnAddCallback).toHaveBeenCalledWith(value);
    });
  });

  describe('when not new', () => {
    const mockOnDeleteCallback = jest.fn();
    const value = '4:9';
    const wrapper = shallow(<RatioInput value={value} onDelete={mockOnDeleteCallback} />);

    it('should have a value derived from props', () => {
      expect(findByTestId(wrapper, inputTestId).props().value).toBe(value);
    });

    it('should have a delete button', () => {
      expect(findByTestId(wrapper, deleteBtnTestId).length).toBe(1);
    });

    it('should not have an add button', () => {
      expect(findByTestId(wrapper, addBtnTestId).length).toBe(0);
    });

    it('should call onDelete prop after clicking the delete button', () => {
      const deleteBtn = findByTestId(wrapper, deleteBtnTestId);

      deleteBtn.simulate('click');

      expect(mockOnDeleteCallback).toHaveBeenCalled();
    });
  });
});
