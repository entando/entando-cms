import { mockApi } from 'testutils/helpers';
import { LIST_VERSIONING_OK, LIST_SINGLE_VERSIONING_OK } from 'testutils/mocks/versioning';

// eslint-disable-next-line import/prefer-default-export
export const getVersionings = jest.fn(mockApi({ payload: LIST_VERSIONING_OK }));
export const getSingleVersioning = jest.fn(mockApi({ payload: LIST_SINGLE_VERSIONING_OK }));
