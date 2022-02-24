import React, { Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { IndeterminateProgressOverlay, Dashboard } from '../components/';
import { resetRefreshPrompt } from '../store/actions/app';
import * as Pages from '../pages';

import {
  AppContainer,
  Modal,
  SocketStatusContainer,
  UpdateRefreshContainer,
  modalTypeEnum,
} from '../components';
import { setPendingError } from '../store/actions/app';

const AppNavigator = () => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const {
    showProgressOverlay,
    connectionCheck,
    socketStatus,
    updateAvailablePleaseRefesh,
    pendingError,
  } = useSelector(store => store.app);

  return (
    <AppContainer>
      {updateAvailablePleaseRefesh && (
        <UpdateRefreshContainer
          onRefresh={() => window.location.reload()}
          onClose={() => dispatch(resetRefreshPrompt)}
        />
      )}
      <SocketStatusContainer socketStatus={socketStatus} />
      {showProgressOverlay && <IndeterminateProgressOverlay />}
      {!connectionCheck && (
        <Modal
          informationType="error"
          modalType={modalTypeEnum.information}
          label="Try Again"
          onOk={() => window.location.reload()}
          title={intl.formatMessage({ id: 'network-error' })}
          body={intl.formatMessage({ id: 'there-is-a-connection-error' })}
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
      <Router>
        <Dashboard>
          <Suspense fallback={<IndeterminateProgressOverlay />}>
            <Route exact path="/">
              <Pages.Home />
            </Route>
            <Route exact path="/units">
              <Pages.Units />
            </Route>
            <Route exact path="/projects">
              <Pages.Projects />
            </Route>
            <Route exact path="/projects/add">
              <Pages.AddProject />
            </Route>
            <Route exact path="/units/add">
              <Pages.AddUnits />
            </Route>
            <Route exact path="/storybook">
              <Pages.StoryBook />
            </Route>
          </Suspense>
        </Dashboard>
      </Router>
    </AppContainer>
  );
};

export { AppNavigator };
