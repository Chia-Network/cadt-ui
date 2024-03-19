import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  redirect,
} from 'react-router-dom';
import ROUTES from './route-constants'
import * as Pages from '@/pages'
import {ChiaNotAccessibleModal, Template, WaitingForWalletSyncModal} from '@/components';

const AppNavigator: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route // remove trailing slash
            path="*(/+)"
            loader={({ params }) => redirect(params['*'] || '/')}
          />
          <Route path="" element={<Template/>}>
            <Route
              path="/"
              element={<Navigate to={ROUTES.MY_STORES}/>}
            />
            <Route
              path={ROUTES.KEY_PREVIEW}
              element={<Pages.KeyPreview/>}
            />
            <Route
              path={ROUTES.SETTINGS}
              element={<Pages.Settings/>}
            />
            <Route
              path={ROUTES.MY_STORES}
              element={<Pages.MyStores/>}
            />
            <Route
              path={ROUTES.EDIT_STORE}
              element={<Pages.EditStore/>}
            />
            <Route
              path={ROUTES.VIEW_STORE}
              element={<Pages.ViewStore/>}
            />
            <Route
              path={ROUTES.SUBSCRIPTIONS}
              element={<Pages.Subscriptions/>}
            />
            <Route
              path="*"
              element={<Navigate replace to={ROUTES.MY_STORES} />}
            />
          </Route>  
        </Routes>
        {/* app-wide blocking modals */}
        <ChiaNotAccessibleModal/>
        <WaitingForWalletSyncModal/>
      </Router>
    </>
  );
};

export { AppNavigator };