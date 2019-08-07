import { addErrors } from '@entando/messages';

import { SET_CONTENTS } from 'state/contents/types';
import { getContents } from 'api/contents';

export const setContents = contents => ({
  type: SET_CONTENTS,
  payload: {
    contents,
  },
});

export const fetchContents = (paginationMetadata = { page: 1, pageSize: 10 }, params = '') => dispatch => (
  new Promise((resolve) => {
    getContents(paginationMetadata, params).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setContents(data.payload));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);
