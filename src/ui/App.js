import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import IntlProviderContainer from 'ui/locale/IntlProviderContainer';
import ContentModelListPage from 'ui/content-model/ContentModelListPage';

const routesDir = [
  {
    path: '/cms/content-models',
    component: ContentModelListPage,
  },
];

class App extends Component {
  componentDidMount() {
    const { setupLanguage, lang } = this.props;
    setupLanguage(lang);
  }

  render() {
    const routes = routesDir.map(route => (
      <Route exact key={route.path} {...route} />
    ));

    const defaultRedirect = () => <Redirect to="/cms/content-models" />;

    return (
      <IntlProviderContainer>
        <>
          <Route exact path="/" component={defaultRedirect} />
          {routes}
        </>
      </IntlProviderContainer>
    );
  }
}

App.propTypes = {
  setupLanguage: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
};

export default App;
