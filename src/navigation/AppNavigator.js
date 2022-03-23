import React, { Suspense, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { Router } from 'react-router';
import { Route, Redirect } from 'react-router-dom';
import { IndeterminateProgressOverlay, Dashboard } from '../components/';
import { NotificationContainer } from 'react-notifications';

import { signOut } from '../store/actions/app';
import { history } from './';
import * as Pages from '../pages';

import { createNotification } from '../utils/notificationUtils';

import { AppContainer, Modal, modalTypeEnum } from '../components';
import { setPendingError, setNotificationMessage } from '../store/actions/app';
import { getOrganizationData } from '../store/actions/climateWarehouseActions';
import { reloadCurrentUrlFromStorage } from './history';

const AppNavigator = () => {
  const intl = useIntl();
  const dispatch = useDispatch();

  useEffect(() => {
    reloadCurrentUrlFromStorage();
  }, []);

  const {
    showProgressOverlay,
    connectionCheck,
    pendingError,
    notification,
    apiKey,
  } = useSelector(store => store.app);

  useEffect(() => {
    if (notification) {
      createNotification(
        notification.type,
        intl.formatMessage({ id: notification.id }),
      );
      dispatch(setNotificationMessage(null));
    }
  }, [notification]);

  return (
    <AppContainer>
      {showProgressOverlay && <IndeterminateProgressOverlay />}
      {!connectionCheck && (
        <Modal
          informationType="error"
          modalType={modalTypeEnum.information}
          label="Try Again"
          onOk={() => dispatch(getOrganizationData())}
          title={intl.formatMessage({ id: 'network-error' })}
          body={intl.formatMessage({ id: 'there-is-a-connection-error' })}
          extraButtonLabel={
            apiKey != null ? intl.formatMessage({ id: 'sign-out' }) : undefined
          }
          extraButtonOnClick={apiKey ? () => dispatch(signOut()) : undefined}
        />
      )}
      {pendingError && (
        <Modal
          title={intl.formatMessage({ id: 'create-pending-title' })}
          body={intl.formatMessage({ id: 'create-pending-error' })}
          onOk={() => dispatch(setPendingError(false))}
          modalType={modalTypeEnum.information}
          informationType="error"
        />
      )}
      <NotificationContainer />
      <Router history={history}>
        <Dashboard>
          <Suspense fallback={<IndeterminateProgressOverlay />}>
            <Route exact path="/">
              <Redirect to="/projects" />
            </Route>
            <Route exact path="">
              <Redirect to="/projects" />
            </Route>
            <Route path="/units">
              <Pages.Units />
            </Route>
            <Route path="/projects">
              <Pages.Projects />
            </Route>
            <Route path="/storybook">
              <Pages.StoryBook />
            </Route>
            <Route path="/organization">
              <Pages.Organization />
            </Route>
            <Route path="*">
              <Redirect to="/projects" />
            </Route>
          </Suspense>
        </Dashboard>
      </Router>
    </AppContainer>
  );
};

export { AppNavigator };
