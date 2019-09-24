import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  config, setApi, useMocks, getUsername, getToken, loginUser,
} from '@entando/apimanager';

import { addErrors, addToast, TOAST_WARNING } from '@entando/messages';

import { login } from 'api/login';

class ApiManager extends Component {
  constructor(props) {
    super(props);
    this.performAutoLogin = this.performAutoLogin.bind(this);
    this.initApiManager(props);
  }

  initApiManager(props) {
    const { store } = props;
    const loggedIn = this.reloadWithDelay;
    const loggedOut = this.performAutoLogin;
    config(store, loggedIn, loggedOut);

    const { dispatch, getState } = store;

    dispatch(
      setApi({
        domain: process.env.REACT_APP_DOMAIN,
        useMocks: process.env.REACT_APP_USE_MOCKS === 'true',
      }),
    );

    const state = getState();
    const mockMode = useMocks(state);

    if (mockMode) this.announceMockMode();

    const devMode = process.env.NODE_ENV === 'development';

    if (devMode && !mockMode && !this.isUserLogged()) {
      this.performAutoLogin();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  reloadWithDelay() {
    setTimeout(() => window.location.reload(), 3000);
  }

  isUserLogged() {
    const { store } = this.props;
    const { getState } = store;
    const state = getState();
    const username = getUsername(state);
    const token = getToken(state);
    return username && token;
  }

  announceMockMode() {
    const { store } = this.props;
    const { dispatch } = store;
    dispatch(addToast('This application is using mocks', TOAST_WARNING));
  }

  performAutoLogin() {
    const { store } = this.props;
    const { dispatch } = store;
    const username = 'admin';
    const password = 'adminadmin';
    login(username, password)
      .then(response => response.json())
      .then(json => dispatch(loginUser(username, json.access_token)))
      .catch(e => dispatch(addErrors([e.message])));
  }

  render() {
    const { children } = this.props;
    return <>{children}</>;
  }
}

ApiManager.propTypes = {
  store: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
  }).isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default ApiManager;
