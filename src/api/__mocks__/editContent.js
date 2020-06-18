import { mockApi } from 'testutils/helpers';
import { GET_CONTENT_RESPONSE_OK } from 'testutils/mocks/editContent';
import { LIST_GROUPS_OK } from 'testutils/mocks/groups';

export const getContent = jest.fn(mockApi({ payload: GET_CONTENT_RESPONSE_OK }));
export const getGroups = jest.fn(mockApi({ payload: LIST_GROUPS_OK }));
