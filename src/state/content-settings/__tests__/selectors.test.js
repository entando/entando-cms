import {
  getSettingsState,
  getIndexesStatus,
  getReferencesStatus,
  getIndexesLastReload,
  getEditorSettings,
} from 'state/content-settings/selectors';
import { CONTENT_SETTINGS_OK } from 'testutils/mocks/contentSettings';

const TEST_STATE = {
  contentSettings: CONTENT_SETTINGS_OK,
};

it('verify getSettingsState selector', () => {
  const state = getSettingsState(TEST_STATE);
  expect(state).toBeDefined();
  expect(state).toEqual(CONTENT_SETTINGS_OK);
});

it('verify getIndexes selector', () => {
  const state = getIndexesStatus(TEST_STATE);
  expect(state).toBeDefined();
  expect(state).toEqual(CONTENT_SETTINGS_OK.indexesStatus);
});

it('verify getReferencesStatus selector', () => {
  const state = getReferencesStatus(TEST_STATE);
  expect(state).toBeDefined();
  expect(state).toEqual(CONTENT_SETTINGS_OK.referencesStatus);
});

it('verify getIndexesLastReload selector', () => {
  const state = getIndexesLastReload(TEST_STATE);
  expect(state).toBeDefined();
  expect(state).toEqual(CONTENT_SETTINGS_OK.indexesLastReload);
});

it('verify getEditorSettings selector', () => {
  const state = getEditorSettings(TEST_STATE);
  expect(state).toBeDefined();
  expect(state).toEqual(CONTENT_SETTINGS_OK.editor);
});
