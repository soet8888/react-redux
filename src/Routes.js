import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout, Simple } from './layouts';
import CreateProject from './views/Project/Create'
import * as ROUTES from 'constants/routes'
import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  Configuration,
  ObjectList,
  Sql,
  Logs as Log,
  ProjectList,
} from './views';

const Routes = (props) => {
  const { path, firebaseUser } = props
  var from;
  console.log("PATH TO ROUTE", path, "Fb user", firebaseUser)
  if (path === ROUTES.LANDING || path !== ROUTES.SIGN_IN) {
    from = path
  }
  return (
    <Switch>
      {firebaseUser === null ? <Redirect
        exact
        from={from}
        to={ROUTES.SIGN_IN}
      /> : <Redirect to={ROUTES.NOT_FOUND} />}

      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path={ROUTES.DASHBOARD}
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path={ROUTES.USER}
      />
      <RouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        path={ROUTES.PRODUCT}
      />
      <RouteWithLayout
        component={TypographyView}
        exact
        layout={MainLayout}
        path={ROUTES.TYPOGRAPHY}
      />
      <RouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path={ROUTES.ICONS}
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path={ROUTES.ACCOUNT}
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path={ROUTES.SETTING}
      />
      <RouteWithLayout
        component={Configuration}
        exact
        layout={MainLayout}
        path={ROUTES.CONFIG}
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path={ROUTES.SIGNPUP}
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path={ROUTES.NOT_FOUND}
      />

      <RouteWithLayout
        component={ObjectList}
        exact
        layout={MainLayout}
        path={ROUTES.OBJ}
      />
      <RouteWithLayout
        component={ProjectList}
        exact
        layout={Simple}
        path={ROUTES.PROJECT_LIST}
      />

      <RouteWithLayout
        component={Sql}
        exact
        layout={MainLayout}
        path={ROUTES.SQL}
      />
      <RouteWithLayout
        component={Log}
        exact
        layout={MainLayout}
        path={ROUTES.LOGS}
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={Simple}
        path={ROUTES.SIGN_IN}
      />
      <RouteWithLayout
        component={CreateProject}
        exact
        layout={MinimalLayout}
        path={ROUTES.CREATE_PROJECT}
      />
    </Switch>
  );

};

export default Routes;
