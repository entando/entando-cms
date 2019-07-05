import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import messages from 'state/messages/reducer';

export default combineReducers({
  form,
  messages,
});
