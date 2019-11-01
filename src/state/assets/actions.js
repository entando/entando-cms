import {
  addErrors,
  addToast,
  TOAST_ERROR,
  clearErrors,
} from '@entando/messages';
import {
  SET_ASSETS,
  SET_CATEGORY_FILTER,
  SET_ACTIVE_FILTERS,
  REMOVE_ACTIVE_FILTER,
  FILE_TYPE_CHANGE,
  ASSETS_VIEW_CHANGE,
  APPLY_SORT,
  SET_ASSET_SYNC,
} from 'state/assets/types';
import { setPage } from 'state/pagination/actions';

import { toggleLoading } from 'state/loading/actions';

import { getAssets, editAsset } from 'api/assets';

export const setCategoryFilter = category => ({
  type: SET_CATEGORY_FILTER,
  payload: category,
});

export const setAssets = assets => ({
  type: SET_ASSETS,
  payload: assets,
});

export const setActiveFilters = filters => ({
  type: SET_ACTIVE_FILTERS,
  payload: filters,
});

export const removeActiveFilter = filter => ({
  type: REMOVE_ACTIVE_FILTER,
  payload: filter,
});

export const changeFileType = fileType => ({
  type: FILE_TYPE_CHANGE,
  payload: fileType,
});

export const changeAssetsView = assetsView => ({
  type: ASSETS_VIEW_CHANGE,
  payload: assetsView,
});

export const setAssetChanged = asset => ({
  type: SET_ASSET_SYNC,
  payload: asset,
});

export const applySort = sortName => ({
  type: APPLY_SORT,
  payload: sortName,
});

export const fetchAssets = params => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('assets'));
  getAssets(params)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setAssets(json.payload));
          dispatch(setPage(json.metaData));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        dispatch(toggleLoading('assets'));
        resolve();
      });
    })
    .catch(() => {});
});

export const sendPostAssetEdit = ({ id, ...others }, file) => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('editasset'));
  const { filename, ...info } = others;
  const formdata = new FormData();
  if (file) {
    formdata.append('file', new File([file], filename, { type: 'image/png', lastModified: new Date() }));
  }
  editAsset(id, formdata, `?${new URLSearchParams(info).toString()}`)
    .then((response) => {
      response.json().then((json) => {
        dispatch(toggleLoading('editasset'));
        if (response.ok) {
          dispatch(setAssetChanged(json.payload));
          resolve(json.payload);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          dispatch(clearErrors());
          resolve();
        }
      });
    })
    .catch(() => {});
});
