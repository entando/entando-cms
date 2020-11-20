import { createSelector } from 'reselect';

export const getUserPreferences = state => state.userPreferences || {};

export const getTranslationWarning = (
  createSelector([getUserPreferences], preferences => preferences.translationWarning)
);

export const getDisplayAttributes = (
  createSelector([getUserPreferences], preferences => preferences.displayAttributes)
);
