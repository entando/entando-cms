import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from 'state/store';
import App from 'ui/App';
import ApiManager from 'ui/ApiManager';
import 'sass/index.scss';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <ApiManager store={store}>
        <App />
      </ApiManager>
    </Provider>
  </Router>,
  document.getElementById('root'),
);
