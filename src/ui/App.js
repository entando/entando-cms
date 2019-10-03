import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import {
  ROUTE_CMS,
  ROUTE_CMS_CONTENTMODEL_LIST,
  ROUTE_CMS_CONTENTMODEL_ADD,
  ROUTE_CMS_ADD_CONTENT,
  ROUTE_CMS_EDIT_CONTENT,
  ROUTE_CMS_CONTENTMODEL_EDIT,
  ROUTE_CMS_CONTENTTYPE_LIST,
  ROUTE_CMS_CONTENTTYPE_ADD,
  ROUTE_CMS_CONTENTTYPE_EDIT,
  ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_ADD,
  ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_EDIT,
  ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_MONOLIST_ADD,
  ROUTE_CMS_CONTENT_SETTINGS,
} from 'app-init/routes';

import IntlProviderContainer from 'ui/locale/IntlProviderContainer';
import ContentModelListPage from 'ui/content-model/ContentModelListPage';
import AddContentModelPage from 'ui/content-model/AddContentModelPage';
import AddContentPage from 'ui/add-content/AddContentPage';
import EditContentPage from 'ui/edit-content/EditContentPage';
import EditContentModelPage from 'ui/content-model/EditContentModelPage';
import ContentTypeListPage from 'ui/content-type/ContentTypeListPage';
import AddContentTypePage from 'ui/content-type/AddContentTypePage';
import EditContentTypePage from 'ui/content-type/EditContentTypePage';
import AddContentTypeAttributePage from 'ui/content-type/attributes/AddContentTypeAttributePage';
import EditContentTypeAttributePage from 'ui/content-type/attributes/EditContentTypeAttributePage';
import MonolistPageContainer from 'ui/content-type/attributes/monolist/MonolistPageContainer';
import ContentSettingsPage from 'ui/content-settings/ContentSettingsPage';

import ToastsContainer from 'ui/toast/ToastsContainer';

const defaultRedirect = () => <Redirect to={ROUTE_CMS_CONTENTMODEL_LIST} />;

const routesDir = [
  {
    path: ROUTE_CMS,
    component: defaultRedirect,
  },
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
    path: ROUTE_CMS_CONTENTTYPE_LIST,
    component: ContentTypeListPage,
  },
  {
    path: ROUTE_CMS_CONTENTTYPE_ADD,
    component: AddContentTypePage,
  },
  {
    path: ROUTE_CMS_CONTENTTYPE_EDIT,
    component: EditContentTypePage,
  },
  {
    path: ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_ADD,
    component: AddContentTypeAttributePage,
  },
  {
    path: ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_EDIT,
    component: EditContentTypeAttributePage,
  },
  {
    path: ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_MONOLIST_ADD,
    component: MonolistPageContainer,
  },
  {
    path: ROUTE_CMS_EDIT_CONTENT,
    component: EditContentPage,
  },
  {
    path: ROUTE_CMS_CONTENT_SETTINGS,
    component: ContentSettingsPage,
  },
];

export const routes = routesDir.map(route => <Route exact key={route.path} {...route} />);

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
