import _ from 'lodash';
import { keyMirror } from '../store-functions';
import constants from '../../constants';

import {
  activateProgressIndicator,
  deactivateProgressIndicator,
  setGlobalErrorMessage,
} from './app';

export const actions = keyMirror('GET_COBENEFITS');

export const getCoBenefits = ({ useMockedResponse = false }) => {
  return async dispatch => {
    try {
      dispatch(activateProgressIndicator);

      let url = `${constants.API_HOST}/co-benefits`;
      if (useMockedResponse) {
        url = `${url}/useMock=true`;
      }

      const response = fetch(url);

      if (response.ok) {
        const results = await response.json();
        dispatch({
          type: actions.GET_COBENEFITS,
          payload: results,
        });
      }
    } catch {
      dispatch(setGlobalErrorMessage('Something went wrong...'));
    } finally {
      dispatch(deactivateProgressIndicator);
    }
  };
};
