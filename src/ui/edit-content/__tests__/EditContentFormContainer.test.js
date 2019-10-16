import { configEnzymeAdapter } from 'testutils/helpers';

import { mapStateToProps, mapDispatchToProps } from 'ui/edit-content/EditContentFormContainer';
import { EDIT_CONTENT_OPENED_OK } from 'testutils/mocks/editContent';

const TEST_STATE = {
  apps: {
    cms: {
      editContent: {
        language: 'en',
        workMode: 'work-mode-edit',
        content: {
          contentType: 'NEWS',
          version: '0.0',
        },
        groups: [
          { code: 'adminstrators', name: 'Administrators' },
          { code: 'freeAccess', name: 'Free Access' },
        ],
        selectedCategories: undefined,
        selectedJoinGroups: undefined,
        ownerGroupDisabled: { disabled: false },
      },
    },
  },
};

const TEST_OWN_PROPS = {
  match: { params: { id: 1 } },
};

configEnzymeAdapter();

describe('EditContentFormContainer connection to redux', () => {
  it('maps editContent properties from state to EditContentForm', () => {
    expect(mapStateToProps(TEST_STATE, TEST_OWN_PROPS)).toEqual(EDIT_CONTENT_OPENED_OK);
  });

  it('verify that onDidMount and onSetOwnerGroupDisable are defined and called in mapDispatchToProps', () => {
    const dispatchMock = jest.fn();
    const result = mapDispatchToProps(dispatchMock, { intl: {}, history: {} });
    expect(result.onSetOwnerGroupDisable).toBeDefined();
    result.onSetOwnerGroupDisable();
    expect(dispatchMock).toHaveBeenCalled();
    expect(result.onDidMount).toBeDefined();
    result.onDidMount();
    expect(dispatchMock).toHaveBeenCalled();
  });
});
