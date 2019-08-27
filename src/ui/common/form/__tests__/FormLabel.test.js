import React from 'react';
import { shallow, mount } from 'enzyme';
import { configEnzymeAdapter, mockRenderWithIntl } from 'testutils/helpers';

import FormLabel from 'ui/common/form/FormLabel';

configEnzymeAdapter();

const LABEL_ID = 'cms.title';
const LANG_LABEL_ID = 'cms.title';
const HELP_ID = 'cms.title';

describe('ui/common/form/FormLabel', () => {
  let component;

  describe('with labelId only', () => {
    beforeEach(() => {
      component = shallow(mockRenderWithIntl(<FormLabel labelId={LABEL_ID} />));
    });
    it('render component without crash', () => {
      expect(component.exists()).toBe(true);
    });
    it('does not render the required icon', () => {
      expect(component.find('.fa-asterisk').exists()).toBe(false);
    });
    it('does not render the help popover', () => {
      expect(component.find('FieldLevelHelp').exists()).toBe(false);
    });
    it('does not render the language label', () => {
      expect(component.find('.FormLabel__language-label').exists()).toBe(false);
    });
  });

  describe('with langLabelId', () => {
    beforeEach(() => {
      component = mount(
        mockRenderWithIntl(<FormLabel labelId={LABEL_ID} langLabelId={LANG_LABEL_ID} />),
      );
    });
    it('renders the language label', () => {
      expect(component.find('.FormLabel__language-label').exists()).toBe(true);
    });
  });

  describe('with helpId', () => {
    beforeEach(() => {
      component = mount(mockRenderWithIntl(<FormLabel labelId={LABEL_ID} helpId={HELP_ID} />));
    });
    it('renders the help popover', () => {
      expect(component.find('FieldLevelHelp').exists()).toBe(true);
    });
  });

  describe('with required', () => {
    beforeEach(() => {
      component = mount(mockRenderWithIntl(<FormLabel labelId={LABEL_ID} required />));
    });
    it('renders the required icon', () => {
      expect(component.find('.fa-asterisk').exists()).toBe(true);
    });
  });
});
