import React from 'react';
import {
  shallow,
} from 'enzyme';

import {
  configEnzymeAdapter,
  findByTestId,
} from 'testutils/helpers';
import ContentSettingsCropRatios from 'ui/content-settings/ContentSettingsCropRatios';

configEnzymeAdapter();

const cropRatios = [
  '4:3',
  '16:9',
];

describe('ContentSettingsCropRatios', () => {
  const mockOnAddCallback = jest.fn();
  const mockOnDeleteCallback = jest.fn();
  const wrapper = shallow(
    <ContentSettingsCropRatios
      cropRatios={cropRatios}
      onAdd={mockOnAddCallback}
      onDelete={mockOnDeleteCallback}
    />,
  );

  const ratioInputTestId = 'content-settings-crop-ratios-form-input';

  it('should have a heading', () => {
    const testId = 'content-settings-crop-ratios-heading';

    expect(findByTestId(wrapper, testId).length).toBe(1);
  });

  describe('form', () => {
    it('should have a title', () => {
      const testId = 'content-settings-crop-ratios-form-title';

      expect(findByTestId(wrapper, testId).length).toBe(1);
    });

    it('should render crop ratio inputs based on length of cropRatios prop', () => {
      expect(findByTestId(wrapper, ratioInputTestId).length).toBe(cropRatios.length + 1);
    });

    it('should call onAdd prop when crop ratio input\'s onAdd is called', () => {
      const ratioInputs = findByTestId(wrapper, ratioInputTestId);
      const newRatioInput = ratioInputs.last();

      newRatioInput.props().onAdd();

      expect(mockOnAddCallback).toHaveBeenCalled();
    });

    it('should call onDelete prop when crop ratio input\'s onDelete is called', () => {
      const ratioInput = findByTestId(wrapper, ratioInputTestId).at(0);

      ratioInput.props().onDelete();

      expect(mockOnDeleteCallback).toHaveBeenCalled();
    });
  });
});
