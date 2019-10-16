import { SET_LANGUAGE } from 'state/locale/types';

// eslint-disable-next-line import/prefer-default-export
export const setLanguage = langCode => ({
  type: SET_LANGUAGE,
  payload: {
    locale: langCode,
  },
});
