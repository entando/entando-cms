import { mockApi } from 'testutils/helpers';
import { GET_CONTENT_RESPONSE_OK } from 'testutils/mocks/editContent';

// eslint-disable-next-line import/prefer-default-export
export const getContent = jest.fn(mockApi({ payload: GET_CONTENT_RESPONSE_OK }));
