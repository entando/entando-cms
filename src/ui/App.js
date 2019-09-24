import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import {
  ROUTE_CMS,
  ROUTE_CMS_CONTENTMODEL_LIST,
  ROUTE_CMS_CONTENTMODEL_ADD,
  ROUTE_CMS_ADD_CONTENT,
  ROUTE_CMS_CONTENTMODEL_EDIT,
  ROUTE_CMS_CONTENT_SETTINGS,
} from 'app-init/routes';

import IntlProviderContainer from 'ui/locale/IntlProviderContainer';
import ContentModelListPage from 'ui/content-model/ContentModelListPage';
import AddContentModelPage from 'ui/content-model/AddContentModelPage';
import AddContentPage from 'ui/add-content/AddContentPage';
import EditContentModelPage from 'ui/content-model/EditContentModelPage';
import ContentSettingsPage from 'ui/content-settings/ContentSettingsPage';

import ToastsContainer from 'ui/toast/ToastsContainer';

const routesDir = [
  {
    path: ROUTE_CMS_CONTENTMODEL_LIST,
    component: ContentModelListPage,
  },
  {
    path: ROUTE_CMS_CONTENTMODEL_ADD,
    component: AddContentModelPage,
  },
  {
    path: ROUTE_CMS_ADD_CONTENT,
    component: AddContentPage,
  },
  {
    path: ROUTE_CMS_CONTENTMODEL_EDIT,
    component: EditContentModelPage,
  },
  {
    path: ROUTE_CMS_CONTENT_SETTINGS,
    component: ContentSettingsPage,
  },
];

export const routes = routesDir.map(route => <Route exact key={route.path} {...route} />);

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
          <ToastsContainer />
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
