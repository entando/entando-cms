import { createSelector } from 'reselect';

export const getSettingsState = state => state.settings;
export const getIndexesStatus = createSelector(
  getSettingsState,
  settings => settings.indexesStatus,
);
export const getReferencesStatus = createSelector(
  getSettingsState,
  settings => settings.referencesStatus,
);

export const getEditorSettings = createSelector(
  getSettingsState,
  settings => settings.editor,
);
