import {
  addErrors, addToast, clearErrors, TOAST_ERROR,
} from '@entando/messages';
import { putPageWidget } from 'api/pages';


// eslint-disable-next-line
export const sendPutWidgetConfig = (pageCode, frameId, configItem) => dispatch => new Promise(
  resolve => putPageWidget(pageCode, frameId, configItem)
    .then((response) => {
      console.log('response: ', response);
      response.json().then((json) => {
        console.log('json', json);
        if (response.ok) {
          resolve(json.payload);
        } else {
          dispatch(clearErrors());
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          resolve();
        }
      }).catch((err) => { console.log('err in .json catch: ', err); resolve(); });
    })
    .catch((err) => { console.log('err in response catch: ', err); resolve(); }),
);
