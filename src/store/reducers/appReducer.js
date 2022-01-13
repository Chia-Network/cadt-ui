import u from 'updeep';

import { actions as appActions } from '../actions/app';
import { actions as socketActions } from '../actions/socket';
import constants from '../../constants';

// import { Message } from '../../components'

const initialState = {
  socketStatus: 'Waiting for status',
  showProgressOverlay: false,
  theme: constants.THEME.DEFAULT,
  errorMessage: null,
  locale: null,
  mode: constants.MODE.WAREHOUSE,
  connectionCheck: true,
  updateAvailablePleaseRefesh: false,
  notification: null
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case socketActions.SOCKET_STATUS:
      return u({ socketStatus: action.payload }, state);

    case socketActions.SOCKET_UNITS_UPDATE:
    case socketActions.SOCKET_PROJECTS_UPDATE:
      return u({ updateAvailablePleaseRefesh: true }, state);

    case appActions.RESET_REFRESH_PROMPT:
      return u({ updateAvailablePleaseRefesh: false }, state);

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

    case appActions.TOGGLE_MODE:
      // eslint-disable-next-line
      const mode =
        state.mode === constants.MODE.WAREHOUSE
          ? constants.MODE.REGISTRY
          : constants.MODE.WAREHOUSE;

      return u({ mode }, state);

    case appActions.CONNECTION_CHECK:
      return u({ connectionCheck: action.payload }, state);

    case appActions.SET_NOTIFICATION:
      console.log('notification saved in store: ', action.payload);
      // return u({ notification: action.payload }, state);
      return u({ notification: action.payload }, state);

    default:
      return state;
  }
};

export { appReducer };
