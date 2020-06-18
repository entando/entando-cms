import { mockApi } from 'testutils/helpers';
import { LANGUAGES_LIST } from 'testutils/mocks/languages';

// eslint-disable-next-line import/prefer-default-export
export const getLanguages = jest.fn(mockApi({ payload: LANGUAGES_LIST }));
