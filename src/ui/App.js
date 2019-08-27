import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import {
  ROUTE_CMS,
  ROUTE_CMS_CONTENTMODEL_LIST,
} from 'app-init/routes';

import IntlProviderContainer from 'ui/locale/IntlProviderContainer';
import ContentModelListPage from 'ui/content-model/ContentModelListPage';

const routesDir = [
  {
    path: ROUTE_CMS_CONTENTMODEL_LIST,
    component: ContentModelListPage,
  },
];

const routes = routesDir.map(route => (
  <Route exact key={route.path} {...route} />
));

const defaultRedirect = () => <Redirect to={ROUTE_CMS_CONTENTMODEL_LIST} />;

class App extends Component {
  componentDidMount() {
    const { setupLanguage, lang } = this.props;
    setupLanguage(lang);
  }

  render() {
    return (
      <IntlProviderContainer>
        <>
          <Route exact path="/" component={defaultRedirect} />
          <Route exact path={ROUTE_CMS} component={defaultRedirect} />
          {routes}
        </>
      </IntlProviderContainer>
    );
  }
}

App.propTypes = {
  setupLanguage: PropTypes.func.isRequired,
  lang: PropTypes.string,
};

App.defaultProps = {
  lang: 'en',
};

export default App;
