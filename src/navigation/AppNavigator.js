import React, { Suspense, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import {
  IndeterminateProgressOverlay,
  Dashboard,
  MyAccount,
} from '../components/';
import { NotificationContainer } from 'react-notifications';

import { signOut } from '../store/actions/app';
import * as Pages from '../pages';

import { createNotification } from '../utils/notificationUtils';

import { AppContainer, Modal, modalTypeEnum } from '../components';
import { setPendingError, setNotificationMessage } from '../store/actions/app';
import { getOrganizationData } from '../store/actions/climateWarehouseActions';

const AppNavigator = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [showConnectionModal, setShowConnectionModal] = useState(false);

  const {
    showProgressOverlay,
    connectionCheck,
    pendingError,
    notification,
    apiKey,
    isAppLocked,
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
      {!connectionCheck ? (
        <>
          {showConnectionModal ? (
            <MyAccount
              openModal={true}
              onClose={() => setShowConnectionModal(false)}
              isHeader={false}
            />
          ) : (
            <Modal
              informationType="error"
              modalType={modalTypeEnum.information}
              label="Try Again"
              onOk={() => dispatch(getOrganizationData())}
              title={intl.formatMessage({ id: 'network-error' })}
              body={intl.formatMessage({ id: 'there-is-a-connection-error' })}
              extraButtonLabel={
                apiKey != null
                  ? intl.formatMessage({ id: 'sign-out' })
                  : intl.formatMessage({ id: 'sign-in' })
              }
              extraButtonOnClick={
                apiKey
                  ? () => dispatch(signOut())
                  : () => setShowConnectionModal(true)
              }
            />
          )}
        </>
      ) : (
        isAppLocked && (
          <Modal
            informationType="error"
            modalType={modalTypeEnum.information}
            title={intl.formatMessage({ id: 'something-went-wrong' })}
            body={intl.formatMessage({ id: 'governance-data-failed' })}
            hideButtons
          />
        )
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
      <Router>
        <Dashboard>
          <Suspense fallback={<IndeterminateProgressOverlay />}>
            <Routes>
              <Route exact path="/" element={<Navigate to="/projects" />} />
              <Route exact path="" element={<Navigate to="/projects" />} />
              <Route path="/units" element={<Pages.Units />} />
              <Route path="/projects" element={<Pages.Projects />} />
              <Route path="/organization" element={<Pages.Organization />} />
              <Route path="/audit" element={<Pages.Audit />} />
              <Route path="/governance" element={<Pages.Governance />} />
              <Route path="/files" element={<Pages.Files />} />
              <Route path="/glossary" element={<Pages.Glossary />} />
              <Route path="*" element={<Navigate to="/projects" />} />
            </Routes>
          </Suspense>
        </Dashboard>
      </Router>
    </AppContainer>
  );
};

export { AppNavigator };
