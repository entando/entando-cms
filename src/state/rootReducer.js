import { combineReducers } from 'redux';
import { api, currentUser } from '@entando/apimanager';
import { reducer as form } from 'redux-form';

import locale from 'state/locale/reducer';
import contents from 'state/contents/reducer';

// import messages from 'state/messages/reducer';
import { messages } from '@entando/messages';

export default combineReducers({
  api,
  currentUser,
  form,
  locale,
  messages,
  contents,
});
