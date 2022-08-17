import u from 'updeep';

import { actions as appActions } from '../actions/app';
import { actions as socketActions } from '../actions/socket';
import constants from '../../constants';

const initialState = {
  socketStatus: 'Waiting for status',
  showProgressOverlay: false,
  theme: constants.THEME.DEFAULT,
  errorMessage: null,
  locale: null,
  connectionCheck: true,
  updateAvailablePleaseRefesh: false,
  notification: null,
  pendingError: false,
  readOnlyMode: true,
  apiKey: null,
  serverAddress: null,
  validateForm: false,
  refresh: false,
  isAppLocked: false,
  user: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case appActions.REFRESH_APP:
      return u({ refresh: action.payload }, state);

    case appActions.LOCK_APP:
      return u({ isAppLocked: action.payload }, state);

    case appActions.SET_READ_ONLY:
      return u({ readOnlyMode: action.payload }, state);

    case appActions.SET_USER:
      return u({ user: action.payload }, state);

    case socketActions.SOCKET_STATUS:
      return u({ socketStatus: action.payload }, state);

    case socketActions.SOCKET_UNITS_UPDATE:
    case socketActions.SOCKET_PROJECTS_UPDATE:
    case socketActions.SOCKET_STAGING_UPDATE:
      return u({ updateAvailablePleaseRefesh: true }, state);

    case appActions.ACTIVATE_PROGRESS_INDICATOR:
      return u({ showProgressOverlay: true }, state);

    case appActions.DEACTIVATE_PROGRESS_INDICATOR:
      return u({ showProgressOverlay: false }, state);

    case appActions.SET_GLOBAL_ERROR_MESSAGE:
      return u({ errorMessage: action.payload }, state);

    case appActions.CLEAR_GLOBAL_ERROR_MESSAGE:
      return u({ errorMessage: null }, state);

    case appActions.SET_LOCALE:
      return u({ locale: action.payload }, state);

    case appActions.PENDING_ERROR:
      return u({ pendingError: action.payload }, state);

    case appActions.SET_THEME:
      if (
        action.payload === constants.THEME.LIGHT ||
        action.payload === constants.THEME.DARK
      ) {
        return u({ theme: action.payload }, state);
      }
      return state;

    case appActions.TOGGLE_THEME:
      // eslint-disable-next-line
      const theme =
        state.theme === constants.THEME.DARK
          ? constants.THEME.LIGHT
          : constants.THEME.DARK;
      localStorage.setItem('theme', theme);
      return u({ theme }, state);

    case appActions.CONNECTION_CHECK:
      return u({ connectionCheck: action.payload }, state);

    case appActions.SET_NOTIFICATION:
      return u({ notification: action.payload }, state);

    case appActions.SIGN_USER_IN:
      return u(
        {
          apiKey: action.payload.apiKey,
          serverAddress: action.payload.serverAddress,
        },
        state,
      );

    case appActions.SIGN_USER_OUT:
      return u(
        {
          apiKey: null,
          serverAddress: null,
        },
        state,
      );

    default:
      return state;
  }
};

export { appReducer };
