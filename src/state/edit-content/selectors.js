import { createSelector } from 'reselect';

export const getEditContentState = (state) => state.editContent;

export const getOwnerGroupDisabled = createSelector(
  getEditContentState,
  (editContent) => editContent.ownerGroupDisabled.disabled,
);

export const getContent = createSelector(
  getEditContentState,
  (editContent) => editContent.content,
);

export const getWorkMode = createSelector(
  getEditContentState,
  (editContent) => editContent.workMode,
);

export const getGroups = createSelector(
  getEditContentState,
  (editContent) => editContent.groups,
);

export const getJoinedCategories = createSelector(
  getEditContentState,
  (editContent) => editContent.joinedCategories,
);

export const getLanguage = createSelector(
  getEditContentState,
  (editContent) => editContent.language,
);

export const getNewContentsType = createSelector(
  getEditContentState,
  (editContent) => editContent.contentType,
);
