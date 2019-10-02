import { configEnzymeAdapter } from 'testutils/helpers';

import { mapStateToProps, mapDispatchToProps } from 'ui/add-content/AddContentFormContainer';
import { ADD_CONTENT_OPENED_OK } from 'testutils/mocks/editContent';

const TEST_STATE = {
  apps: {
    cms: {
      editContent: {
        ownerGroupDisabled: {
          disabled: false,
        },
        language: 'en',
        workMode: 'work-mode-add',
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
      },
    },
  },
};

configEnzymeAdapter();

describe('AddContentFormContainer connection to redux', () => {
  it('maps editContent properties from state to AddContentForm', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual(ADD_CONTENT_OPENED_OK);
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
