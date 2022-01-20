import { keyMirror } from '../store-functions';
import { LANGUAGE_CODES } from '../../translations';
import _ from 'lodash';

export const actions = keyMirror(
  'ACTIVATE_PROGRESS_INDICATOR',
  'DEACTIVATE_PROGRESS_INDICATOR',
  'TOGGLE_THEME',
  'SET_THEME',
  'SET_GLOBAL_ERROR_MESSAGE',
  'CLEAR_GLOBAL_ERROR_MESSAGE',
  'SET_LOCALE',
  'CONNECTION_CHECK',
  'RESET_REFRESH_PROMPT',
  'SET_NOTIFICATION',
);

export const resetRefreshPrompt = {
  type: actions.RESET_REFRESH_PROMPT,
};

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

export const NotificationMessageTypeEnum = {
  error: 'error',
  success: 'success',
  null: 'null',
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
