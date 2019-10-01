import { createSelector } from 'reselect';

export const getSettingsState = state => state.apps.cms.contentSettings;

export const getIndexesStatus = createSelector(
  getSettingsState,
  settings => settings.indexesStatus,
);

export const getReferencesStatus = createSelector(
  getSettingsState,
  settings => settings.referencesStatus,
);

export const getIndexesLastReload = createSelector(
  getSettingsState,
  settings => settings.indexesLastReload,
);

export const getEditorSettings = createSelector(
  getSettingsState,
  settings => settings.editor,
);
