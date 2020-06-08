import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import {
  ROUTE_CMS,
  ROUTE_CMS_CONTENTTEMPLATE_LIST,
  ROUTE_CMS_CONTENTTEMPLATE_ADD,
  ROUTE_CMS_ADD_CONTENT,
  ROUTE_CMS_EDIT_CONTENT,
  ROUTE_CMS_CONTENTTEMPLATE_EDIT,
  ROUTE_CMS_ASSETS_LIST,
  ROUTE_CMS_CONTENTTYPE_LIST,
  ROUTE_CMS_CONTENTTYPE_ADD,
  ROUTE_CMS_CONTENTTYPE_EDIT,
  ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_ADD,
  ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_EDIT,
  ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_MONOLIST_ADD,
  ROUTE_CMS_CONTENT_SETTINGS,
  ROUTE_CMS_CONTENTS,
  ROUTE_CMS_VERSIONING,
} from 'app-init/routes';

import IntlProviderContainer from 'ui/locale/IntlProviderContainer';
import ContentTemplateListPage from 'ui/content-template/ContentTemplateListPage';
import AddContentTemplatePage from 'ui/content-template/AddContentTemplatePage';
import AddContentPage from 'ui/add-content/AddContentPage';
import EditContentPage from 'ui/edit-content/EditContentPage';
import EditContentTemplatePage from 'ui/content-template/EditContentTemplatePage';
import AssetsListPage from 'ui/assets/AssetsListPage';
import ContentTypeListPage from 'ui/content-type/ContentTypeListPage';
import AddContentTypePage from 'ui/content-type/AddContentTypePage';
import EditContentTypePage from 'ui/content-type/EditContentTypePage';
import AddContentTypeAttributePage from 'ui/content-type/attributes/AddContentTypeAttributePage';
import EditContentTypeAttributePage from 'ui/content-type/attributes/EditContentTypeAttributePage';
import MonolistPageContainer from 'ui/content-type/attributes/monolist/MonolistPageContainer';
import ContentSettingsPage from 'ui/content-settings/ContentSettingsPage';
import ContentsPage from 'ui/contents/ContentsPage';
import VersioningListPage from 'ui/versioning/VersioningListPage';

import CMSShell from 'ui/common/CMSShell';
import ToastsContainer from 'ui/toast/ToastsContainer';

const defaultRedirect = () => <Redirect to={ROUTE_CMS_CONTENTTEMPLATE_LIST} />;

export const routesDir = [
  {
    path: ROUTE_CMS,
    component: defaultRedirect,
  },
  {
    path: ROUTE_CMS_CONTENTTEMPLATE_LIST,
    component: ContentTemplateListPage,
  },
  {
    path: ROUTE_CMS_CONTENTTEMPLATE_ADD,
    component: AddContentTemplatePage,
  },
  {
    path: ROUTE_CMS_ADD_CONTENT,
    component: AddContentPage,
  },
  {
    path: ROUTE_CMS_CONTENTTEMPLATE_EDIT,
    component: EditContentTemplatePage,
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
    path: ROUTE_CMS_ASSETS_LIST,
    component: AssetsListPage,
  },
  {
    path: ROUTE_CMS_CONTENT_SETTINGS,
    component: ContentSettingsPage,
  },
  {
    path: ROUTE_CMS_CONTENTS,
    component: ContentsPage,
  },
  {
    path: ROUTE_CMS_VERSIONING,
    component: VersioningListPage,
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
          <CMSShell>{routes}</CMSShell>
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
