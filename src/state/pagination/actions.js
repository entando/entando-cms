import { SET_PAGE } from 'state/pagination/types';

// eslint-disable-next-line import/prefer-default-export
export const setPage = (page, namespace = 'global') => ({
  type: SET_PAGE,
  payload: {
    page,
    namespace,
  },
});
