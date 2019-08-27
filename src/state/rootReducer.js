import { combineReducers } from 'redux';
import { api, currentUser } from '@entando/apimanager';
import { reducer as form } from 'redux-form';

import locale from 'state/locale/reducer';
import { messages } from '@entando/messages';
import contentModel from 'state/content-model/reducer';
import loading from 'state/loading/reducer';

export default combineReducers({
  api,
  contentModel,
  currentUser,
  form,
  loading,
  locale,
  messages,
});
