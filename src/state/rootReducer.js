import { combineReducers } from 'redux';
import { api, currentUser } from '@entando/apimanager';
import { reducer as form } from 'redux-form';

import locale from 'state/locale/reducer';
import contents from 'state/contents/reducer';

import { messages } from '@entando/messages';
import contentModel from 'state/content-model/reducer';
import contentType from 'state/content-type/reducer';
import loading from 'state/loading/reducer';

export default combineReducers({
  api,
  contentModel,
  contentType,
  currentUser,
  form,
  loading,
  locale,
  messages,
  contents,
});
