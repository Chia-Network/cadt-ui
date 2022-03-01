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
  commit: false,
  pendingError: false,
  readOnlyMode: true,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case appActions.SET_READ_ONLY:
      return u({ readOnlyMode: action.payload }, state);

    case socketActions.SOCKET_STATUS:
      return u({ socketStatus: action.payload }, state);

    case socketActions.SOCKET_UNITS_UPDATE:
    case socketActions.SOCKET_PROJECTS_UPDATE:
    case socketActions.SOCKET_STAGING_UPDATE:
      return u({ updateAvailablePleaseRefesh: true }, state);

    case appActions.RESET_REFRESH_PROMPT:
      return u({ updateAvailablePleaseRefesh: false }, state);

    case appActions.ACTIVATE_PROGRESS_INDICATOR:
      return u({ showProgressOverlay: true }, state);

    case appActions.DEACTIVATE_PROGRESS_INDICATOR:
      return u({ showProgressOverlay: false }, state);

    case appActions.COMMIT:
      return u({ commit: action.payload }, state);

    case appActions.COMMIT_ALL:
      return u({ commitAll: action.payload }, state);

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

    default:
      return state;
  }
};

export { appReducer };
