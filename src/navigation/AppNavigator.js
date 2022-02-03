import React, { Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

const AppNavigator = () => {
  const dispatch = useDispatch();

  const {
    showProgressOverlay,
    connectionCheck,
    socketStatus,
    updateAvailablePleaseRefesh,
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
          title="Network Error"
          body={
            'There is a connection error. The Climate Warehouse is inaccessible'
          }
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
