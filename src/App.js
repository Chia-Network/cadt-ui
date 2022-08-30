import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import {
  getUser,
  setLocale,
  setThemeFromLocalStorage,
} from './store/actions/app';
import {
  getOrganizationData,
  getPickLists,
} from './store/actions/climateWarehouseActions';
import { initiateSocket } from './store/actions/socket';

import { loadLocaleData } from './translations';
import { AppNavigator } from './navigation';
import theme from './theme';

import {
  IndeterminateProgressOverlay,
  SocketStatusContainer,
} from './components';

const App = () => {
  const dispatch = useDispatch();
  const { socketStatus } = useSelector(state => state.app);
  const appStore = useSelector(state => state.app);
  const [translationTokens, setTranslationTokens] = useState();

  useEffect(() => {
    dispatch(initiateSocket(appStore.serverAddress));
    dispatch(getOrganizationData());
    dispatch(getPickLists());
    dispatch(getUser());
  }, [dispatch, appStore.serverAddress]);

  useEffect(
    () => dispatch(setThemeFromLocalStorage),
    [setThemeFromLocalStorage],
  );

  useEffect(() => {
    if (appStore.locale) {
      const processTranslationTokens = async () => {
        setTranslationTokens(await loadLocaleData(appStore.locale));
      };

      processTranslationTokens();
    } else {
      dispatch(setLocale(navigator.language));
    }
  }, [appStore.locale]);

  if (!translationTokens) {
    return <IndeterminateProgressOverlay />;
  }

  return (
    <ThemeProvider theme={theme}>
      <IntlProvider
        locale="en"
        defaultLocale="en"
        messages={translationTokens.default}
      >
        <AppNavigator />
      </IntlProvider>
      <SocketStatusContainer socketStatus={socketStatus} />
    </ThemeProvider>
  );
};

export default App;
