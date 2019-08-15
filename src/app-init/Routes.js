import React from 'react';
import ContentModelListPage from 'ui/content-model/ContentModelListPage';
import { Route, Redirect } from 'react-router-dom';

export const ROUTE_CMS = '/cms';
export const ROUTE_CMS_CONTENTMODEL_LIST = '/cms/content-models';

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

const Routes = () => (
  <>
    <Route exact path="/" component={defaultRedirect} />
    <Route exact path={ROUTE_CMS} component={defaultRedirect} />
    {routes}
  </>
);

export default Routes;
