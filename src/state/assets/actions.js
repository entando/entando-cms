import { addErrors } from '@entando/messages';
import {
  SET_ASSETS,
  SET_ASSET_CATEGORY_FILTER,
  SET_ACTIVE_FILTERS,
  REMOVE_ACTIVE_FILTER,
  FILE_TYPE_CHANGE,
  ASSETS_VIEW_CHANGE,
  APPLY_SORT,
  CHANGE_PAGINATION,
} from 'state/assets/types';

import { toggleLoading } from 'state/loading/actions';

import { getAssets } from 'api/assets';

export const setAssetCategoryFilter = category => ({
  type: SET_ASSET_CATEGORY_FILTER,
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

export const applySort = sortName => ({
  type: APPLY_SORT,
  payload: sortName,
});

export const changePagination = paginationOptions => ({
  type: CHANGE_PAGINATION,
  payload: paginationOptions,
});

export const fetchAssets = params => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('assets'));
  getAssets(params)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setAssets(json.payload));
          const {
            page, pageSize, lastPage, totalItems,
          } = json.metaData;
          const paginationOptions = {
            page,
            perPage: pageSize,
            totalItems,
            lastPage,
            perPageOptions: [5, 10, 15, 25, 50],
          };
          dispatch(changePagination(paginationOptions));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        dispatch(toggleLoading('assets'));
        resolve();
      });
    })
    .catch(() => {});
});
