import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';

import rootReducer from 'state/rootReducer';

const localStorageStates = {
  permissions: [],
};

const composeParams = [
  applyMiddleware(thunk),
  persistState(
    Object.keys(localStorageStates),
    {
      slicer: paths => state => (
        paths.reduce((acc, curr) => {
          const localState = localStorageStates[curr];
          acc[curr] = localState.length
            ? localState.reduce((accLocState, currLocState) => ({
              ...accLocState,
              [currLocState]: state[curr][currLocState],
            }), {})
            : state[curr];
          return acc;
        }, {})
      ),
    },
  ),
];

/* eslint-disable */
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  composeParams.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}
/* eslint-enable */

const store = createStore(rootReducer, compose(...composeParams));

export default store;
