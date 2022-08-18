import _ from 'lodash';

import constants from '../../constants';
import { keyMirror } from '../store-functions';
import { LANGUAGE_CODES } from '../../translations';
import { getOrganizationData } from './climateWarehouseActions';

export const actions = keyMirror(
  'ACTIVATE_PROGRESS_INDICATOR',
  'DEACTIVATE_PROGRESS_INDICATOR',
  'TOGGLE_THEME',
  'SET_THEME',
  'SET_GLOBAL_ERROR_MESSAGE',
  'CLEAR_GLOBAL_ERROR_MESSAGE',
  'SET_LOCALE',
  'CONNECTION_CHECK',
  'SET_NOTIFICATION',
  'PENDING_ERROR',
  'SET_READ_ONLY',
  'SIGN_USER_IN',
  'SIGN_USER_OUT',
  'REFRESH_APP',
  'LOCK_APP',
  'SET_USER',
);

export const refreshApp = render => ({
  type: actions.REFRESH_APP,
  payload: render,
});

export const lockApp = isLocked => ({
  type: actions.LOCK_APP,
  payload: isLocked,
});

export const setReadOnly = isReadOnly => ({
  type: actions.SET_READ_ONLY,
  payload: isReadOnly,
});

export const setUser = user => ({
  type: actions.SET_USER,
  payload: user,
});

export const activateProgressIndicator = {
  type: actions.ACTIVATE_PROGRESS_INDICATOR,
};

export const deactivateProgressIndicator = {
  type: actions.DEACTIVATE_PROGRESS_INDICATOR,
};

export const setThemeFromLocalStorage = {
  type: actions.SET_THEME,
  payload: localStorage.getItem('theme'),
};

export const toggleTheme = {
  type: actions.TOGGLE_THEME,
};

export const setGlobalErrorMessage = message => ({
  type: actions.SET_GLOBAL_ERROR_MESSAGE,
  payload: message,
});

export const clearGlobalErrorMessage = {
  type: actions.CLEAR_GLOBAL_ERROR_MESSAGE,
};

export const setConnectionCheck = bool => ({
  type: actions.CONNECTION_CHECK,
  payload: bool,
});

export const setPendingError = bool => ({
  type: actions.PENDING_ERROR,
  payload: bool,
});

export const NotificationMessageTypeEnum = {
  error: 'error',
  success: 'success',
  null: 'null',
};

export const getUser = () => {
  return async dispatch => {
    try {
      const req = new XMLHttpRequest();
      req.open('GET', constants.APP_URL, false);
      req.send(null);

      if (req.getAllResponseHeaders().indexOf('x-user') >= 0) {
        const xUser = req.getResponseHeader('x-user');
        dispatch(setUser(xUser));
      }
    } catch (err) {
      console.log('err', err);
    }
  };
};

export const setNotificationMessage = (type, id) => {
  return async dispatch => {
    if (
      _.includes(Object.keys(NotificationMessageTypeEnum), type) &&
      typeof id === 'string'
    ) {
      dispatch({
        type: actions.SET_NOTIFICATION,
        payload: {
          id,
          type,
        },
      });
    }
    if (type === null) {
      dispatch({
        type: actions.SET_NOTIFICATION,
        payload: null,
      });
    }
  };
};

export const signIn = ({ apiKey, serverAddress }) => {
  return async dispatch => {
    if (apiKey && serverAddress) {
      localStorage.setItem('apiKey', apiKey);
      localStorage.setItem('serverAddress', serverAddress);
      dispatch({
        type: actions.SIGN_USER_IN,
        payload: {
          apiKey,
          serverAddress,
        },
      });
      dispatch(getOrganizationData());
      dispatch(refreshApp(true));
    }
  };
};

export const signOut = () => {
  return async dispatch => {
    localStorage.removeItem('apiKey');
    localStorage.removeItem('serverAddress');
    dispatch({
      type: actions.SIGN_USER_OUT,
      payload: {
        apiKey: null,
        serverAddress: null,
      },
    });
  };
};

export const signInFromLocalStorage = () => {
  return async dispatch => {
    const apiKey = localStorage.getItem('apiKey');
    const serverAddress = localStorage.getItem('serverAddress');
    if (apiKey && serverAddress) {
      dispatch({
        type: actions.SIGN_USER_IN,
        payload: {
          apiKey,
          serverAddress,
        },
      });
    }
  };
};

export const setLocale = locale => {
  let localeToSet = locale;

  // Default to en-US if language isnt supported
  if (
    !Object.keys(LANGUAGE_CODES)
      .map(key => LANGUAGE_CODES[key])
      .includes(locale)
  ) {
    localeToSet = 'en-US';
  }

  return {
    type: actions.SET_LOCALE,
    payload: localeToSet,
  };
};
