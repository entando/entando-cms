import { combineReducers } from 'redux';
import { api, currentUser } from '@entando/apimanager';
import { reducer as form } from 'redux-form';

import locale from 'state/locale/reducer';
import { messages } from '@entando/messages';
import contentModel from 'state/content-model/reducer';
import contentType from 'state/content-type/reducer';
import editContent from 'state/edit-content/reducer';
import loading from 'state/loading/reducer';
import categories from 'state/categories/reducer';

export default combineReducers({
  api,
  contentModel,
  contentType,
  currentUser,
  editContent,
  form,
  loading,
  locale,
  messages,
  categories,
});
