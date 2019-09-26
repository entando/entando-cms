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

describe('ContentSettingsCropRatios', () => {
  describe('render', () => {
    const wrapper = shallow(<ContentSettingsCropRatios />);

    it('with a heading', () => {
      const testId = 'content-settings-crop-ratios-heading';

      expect(findByTestId(wrapper, testId).length).toBe(1);
    });

    describe('form', () => {
      it('should contain add button', () => {
        const testId = 'content-settings-crop-ratios-form-add';

        expect(findByTestId(wrapper, testId).length).toBe(1);
      });

      it('should contain save button', () => {
        const testId = 'content-settings-crop-ratios-form-save';

        expect(findByTestId(wrapper, testId).length).toBe(1);
      });
    });
  });
});
