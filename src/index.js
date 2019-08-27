import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from 'state/store';
import AppContainer from 'ui/AppContainer';
import ApiManager from 'app-init/ApiManager';

import 'patternfly/dist/css/patternfly.min.css';
import 'patternfly/dist/css/patternfly-additions.min.css';

import '@entando/menu/dist/css/index.css';
import 'sass/index.scss';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <ApiManager store={store}>
        <AppContainer />
      </ApiManager>
    </Provider>
  </Router>,
  document.getElementById('root'),
);
