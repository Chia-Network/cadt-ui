import _ from 'lodash';
import { keyMirror } from '../store-functions';
import constants from '../../constants';

import { coBenefitResponseStub, projectRatingResponseStub } from '../../mocks';

import {
  activateProgressIndicator,
  deactivateProgressIndicator,
  setGlobalErrorMessage,
} from './app';

export const actions = keyMirror('GET_RATINGS', 'GET_COBENEFITS');

export const mockedRatingsResponse = {
  type: actions.GET_RATINGS,
  // Different envs import this differently
  payload: _.get(
    projectRatingResponseStub,
    'default',
    projectRatingResponseStub,
  ),
};

export const getRatings = ({
  useMockedResponse = false,
  useApiMock = false,
}) => {
  return async dispatch => {
    dispatch(activateProgressIndicator);

    try {
      if (useMockedResponse) {
        dispatch(mockedRatingsResponse);
      } else {
        let url = `${constants.API_HOST}/ratings`;
        if (useApiMock) url = `${url}?useMock=true`;
        const response = fetch(url);

        if (response.ok) {
          const results = await response.json();
          dispatch({
            type: actions.GET_RATINGS,
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

const mockedCoBenefitResponse = {
  type: actions.GET_COBENEFITS,
  // Different envs import this differently
  payload: _.get(coBenefitResponseStub, 'default', coBenefitResponseStub),
};

export const getCoBenefits = ({
  useMockedResponse = false,
  useApiMock = false,
}) => {
  return async dispatch => {
    try {
      dispatch(activateProgressIndicator);

      if (useMockedResponse) {
        dispatch(mockedCoBenefitResponse);
      } else {
        let url = `${constants.API_HOST}/co-benefits`;
        if (useApiMock) {
          url = `${url}?useMock=true`;
        }

        const response = fetch(url);

        if (response.ok) {
          const results = await response.json();
          dispatch({
            type: actions.GET_COBENEFITS,
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
