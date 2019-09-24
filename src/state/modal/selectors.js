import { createSelector } from 'reselect';

export const getModal = state => state.modal;
export const getVisibleModal = createSelector(getModal, modal => modal.visibleModal);
export const getInfo = createSelector(getModal, modal => modal.info);
