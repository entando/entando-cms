import React from 'react';
import { shallow } from 'enzyme';
import { configEnzymeAdapter } from 'testutils/helpers';

import { EditContentFormBody } from 'ui/edit-content/EditContentForm';
import { WORK_MODE_ADD, WORK_MODE_EDIT } from 'state/edit-content/types';

configEnzymeAdapter();

const props = {
  intl: {
    formatMessage: t => t,
    formatDate: t => t,
    formatTime: t => t,
  },
  workMode: WORK_MODE_ADD,
  language: 'en',
  content: {},
  currentUser: 'admin',
  location: {},
  groups: [],
  selectedJoinGroups: [],
  handleSubmit: () => {},
  onSubmit: () => {},
  initialize: () => {},
  onDidMount: () => {},
  ownerGroupDisabled: false,
  onSetOwnerGroupDisable: () => {},
  match: { params: {} },
  onIncompleteData: () => {},
  onWillUnmount: () => {},
  onUnpublish: () => {},
  invalid: false,
  submitting: false,
  contentType: {
    name: 'Article',
    code: 'ART',
  },
  dirty: false,
  onDiscard: () => {},
  onCancel: () => {},
  onSave: () => {},
  loading: false,
};

describe('ui/edit-content/EditContentForm', () => {
  describe('Test EditContentForm during adding a new content', () => {
    it('render component without crash and parts are hidden if ownerGroup is not chosen', () => {
      const component = shallow(
        <EditContentFormBody
          {...props}
        />,
      );
      expect(component.exists()).toBe(true);
      const contentDescriptionWrapper = component.find('#contentDescriptionWrapper');
      expect(contentDescriptionWrapper.exists()).toBe(true);
      expect(contentDescriptionWrapper.prop('style')).toHaveProperty('display', 'none');

      const categoriesWrapper = component.find('#contentGroupsWrapper');
      expect(categoriesWrapper.exists()).toBe(true);
      expect(categoriesWrapper.prop('style')).toHaveProperty('display', 'none');

      const attributesWrapper = component.find('#attributesWrapper');
      expect(attributesWrapper.exists()).toBe(true);
      expect(attributesWrapper.prop('style')).toHaveProperty('display', 'none');
    });

    it('render component without crash and parts are shown if ownerGroup is chosen', () => {
      const component = shallow(
        <EditContentFormBody
          {...props}
          ownerGroupDisabled
        />,
      );
      expect(component.exists()).toBe(true);
      const contentDescriptionWrapper = component.find('#contentDescriptionWrapper');
      expect(contentDescriptionWrapper.exists()).toBe(true);
      expect(contentDescriptionWrapper.prop('style')).toHaveProperty('display', 'block');

      const categoriesWrapper = component.find('#contentGroupsWrapper');
      expect(categoriesWrapper.exists()).toBe(true);
      expect(categoriesWrapper.prop('style')).toHaveProperty('display', 'block');

      const attributesWrapper = component.find('#attributesWrapper');
      expect(attributesWrapper.exists()).toBe(true);
      expect(attributesWrapper.prop('style')).toHaveProperty('display', 'block');
    });

    it('render component without crash and parts are shown if ownerGroup is not chosen but work mode is Edit', () => {
      const component = shallow(
        <EditContentFormBody
          {...props}
          workMode={WORK_MODE_EDIT}
        />,
      );
      expect(component.exists()).toBe(true);
      const contentDescriptionWrapper = component.find('#contentDescriptionWrapper');
      expect(contentDescriptionWrapper.exists()).toBe(true);
      expect(contentDescriptionWrapper.prop('style')).toHaveProperty('display', 'block');

      const categoriesWrapper = component.find('#contentGroupsWrapper');
      expect(categoriesWrapper.exists()).toBe(true);
      expect(categoriesWrapper.prop('style')).toHaveProperty('display', 'block');

      const attributesWrapper = component.find('#attributesWrapper');
      expect(attributesWrapper.exists()).toBe(true);
      expect(attributesWrapper.prop('style')).toHaveProperty('display', 'block');
    });
  });
});
