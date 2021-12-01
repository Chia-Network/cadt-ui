import _ from 'lodash';
import { keyMirror } from '../store-functions';
import constants from '../../constants';

import {
  activateProgressIndicator,
  deactivateProgressIndicator,
  setGlobalErrorMessage,
} from './app';

import { mockedProjectRatingsResponse } from '../../mocks';

export const actions = keyMirror('GET_RATINGS_DATA');

export const mockRatingsResponse = {
  type: actions.GET_RATINGS_DATA,
  // Different envs import this differently
  payload: _.get(
    mockedProjectRatingsResponse,
    'default',
    mockedProjectRatingsResponse,
  ),
};

export const getRatingsData = ({ useMockedResponse = false, useApiMock = false }) => {
  return async dispatch => {
    dispatch(activateProgressIndicator);

    try {
      if (useMockedResponse) {
        dispatch(mockRatingsResponse);
      } else {
        let url = `${constants.API_HOST}/ratings`;
        if (useApiMock) url = `${url}?useMock=true`;
        const response = fetch(url);

        if (response.ok) {
          const results = await response.json();
          dispatch({
            type: actions.GET_DATA,
            payload: results,
          });
        }
      }
    } catch {
      dispatch(setGlobalErrorMessage('Something went wrong...'));
    } finally {
      dispatch(deactivateProgressIndicator);
    }
  };
};
