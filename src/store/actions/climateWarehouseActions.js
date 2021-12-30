import _ from 'lodash';
import { keyMirror } from '../store-functions';
import constants from '../../constants';

import {
  coBenefitResponseStub,
  projectRatingResponseStub,
  qualificationsResponseStub,
  projectLocationsResponseStub,
  relatedProjectsResponseStub,
  unitsResponseStub,
  projectsResponseStub,
  vintagesResponseStub,
  stagingDataResponseStub,
} from '../../mocks';

import {
  activateProgressIndicator,
  deactivateProgressIndicator,
  setConnectionCheck,
  setGlobalErrorMessage,
} from './app';

export const actions = keyMirror(
  'GET_RATINGS',
  'GET_COBENEFITS',
  'GET_QUALIFICATIONS',
  'GET_PROJECT_LOCATIONS',
  'GET_RELATED_PROJECTS',
  'GET_UNITS',
  'GET_PROJECTS',
  'GET_VINTAGES',
  'GET_STAGING_DATA'
);

const getClimateWarehouseTable = (
  url,
  action,
  mockAction,
  { useMockedResponse = false, useApiMock = false },
) => {
  return async dispatch => {
    dispatch(activateProgressIndicator);

    try {
      if (useMockedResponse) {
        dispatch(mockAction);
      } else {
        if (useApiMock) {
          url = `${url}?useMock=true`;
        }

        const response = await fetch(url);

        if (response.ok) {
          dispatch(setConnectionCheck(true));
          const results = await response.json();
          dispatch({
            type: action,
            payload: results,
          });
        }
      }
    } catch {
      dispatch(setConnectionCheck(false))
      dispatch(setGlobalErrorMessage('Something went wrong...'));
    } finally {
      dispatch(deactivateProgressIndicator);
    }
  };
};

const formatStagingData = dataArray => {
  const splittedByTable = _.groupBy(dataArray, 'table');

  splittedByTable.Projects = _.groupBy(splittedByTable.Projects, 'commited');

  splittedByTable.Units = _.groupBy(splittedByTable.Units, 'commited');

  const splittedAndFormatted = {
    projects: {
      pending: [...(splittedByTable.Projects.true || [])],
      staging: [...(splittedByTable.Projects.false || [])],
    },
    units: {
      pending: [...(splittedByTable.Units.true || [])],
      staging: [...(splittedByTable.Units.false || [])],
    },
  };
  return splittedAndFormatted;
};

export const mockGetStagingDataResponse = {
  type: actions.GET_STAGING_DATA,
  payload: formatStagingData(
    _.get(stagingDataResponseStub, 'default', stagingDataResponseStub),
  ),
};

export const getStagingData = ({ useMockedResponse = false }) => {
  return async dispatch => {
    dispatch(activateProgressIndicator);

    try {
      if (useMockedResponse) {
        dispatch(mockGetStagingDataResponse);
      } else {
        const response = await fetch(`${constants.API_HOST}/staging`);

        if (response.ok) {
          const results = await response.json();

          dispatch({
            type: actions.GET_STAGING_DATA,
            payload: formatStagingData(results),
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

export const commitStagingData = () => {
  return async dispatch => {
    try {
      dispatch(activateProgressIndicator);

      const url = `${constants.API_HOST}/staging/commit`;
      const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch(url, payload);

      if (response.ok) {
        console.log('yay!');
        dispatch(getStagingData({ useMockedResponse: false }));
      } else {
        dispatch(setGlobalErrorMessage('Staging group could not be deleted'));
      }
    } catch {
      dispatch(setGlobalErrorMessage('Something went wrong...'));
    } finally {
      dispatch(deactivateProgressIndicator);
    }
  };
};

export const deleteStagingData = uuid => {
  return async dispatch => {
    try {
      dispatch(activateProgressIndicator);

      const url = `${constants.API_HOST}/staging`;
      const payload = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uuid }),
      };

      const response = await fetch(url, payload);

      if (response.ok) {
        console.log('yay!');
        dispatch(getStagingData({ useMockedResponse: false }));
      } else {
        dispatch(setGlobalErrorMessage('Staging group could not be deleted'));
      }
    } catch {
      dispatch(setGlobalErrorMessage('Something went wrong...'));
    } finally {
      dispatch(deactivateProgressIndicator);
    }
  };
};

export const postNewProject = data => {
  return async dispatch => {
    try {
      dispatch(activateProgressIndicator);

      const url = `${constants.API_HOST}/projects`;
      const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(url, payload);

      if (response.ok) {
        console.log('yay!');
      } else {
        dispatch(setGlobalErrorMessage('Project could not be created'));
      }
    } catch {
      dispatch(setGlobalErrorMessage('Something went wrong...'));
    } finally {
      dispatch(deactivateProgressIndicator);
    }
  };
};

export const postNewUnits = data => {
  return async dispatch => {
    try {
      dispatch(activateProgressIndicator);

      const url = `${constants.API_HOST}/units`;
      const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(url, payload);

      if (response.ok) {
        console.log('yay!');
      } else {
        dispatch(setGlobalErrorMessage('Unit could not be created'));
      }
    } catch {
      dispatch(setGlobalErrorMessage('Something went wrong...'));
    } finally {
      dispatch(deactivateProgressIndicator);
    }
  };
};

export const updateUnitsRecord = data => {
  console.log(data);
  return async dispatch => {
    try {
      dispatch(activateProgressIndicator);

      const url = `${constants.API_HOST}/units`;
      const payload = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      };

      const response = await fetch(url, payload);

      if (response.ok) {
        console.log('yay!');
      } else {
        dispatch(setGlobalErrorMessage('Unit could not be created'));
      }
    } catch {
      dispatch(setGlobalErrorMessage('Something went wrong...'));
    } finally {
      dispatch(deactivateProgressIndicator);
    }
  };
};

const mockedRatingsResponse = {
  type: actions.GET_RATINGS,
  // Different envs import this differently
  payload: _.get(
    projectRatingResponseStub,
    'default',
    projectRatingResponseStub,
  ),
};

export const getRatings = options => {
  return dispatch => {
    dispatch(
      getClimateWarehouseTable(
        `${constants.API_HOST}/ratings`,
        actions.GET_RATINGS,
        mockedRatingsResponse,
        options,
      ),
    );
  };
};

const mockedCoBenefitResponse = {
  type: actions.GET_COBENEFITS,
  // Different envs import this differently
  payload: _.get(coBenefitResponseStub, 'default', coBenefitResponseStub),
};

export const getCoBenefits = options => {
  return dispatch => {
    dispatch(
      getClimateWarehouseTable(
        `${constants.API_HOST}/co-benefits`,
        actions.GET_COBENEFITS,
        mockedCoBenefitResponse,
        options,
      ),
    );
  };
};

export const mockQualificationsResponse = {
  type: actions.GET_QUALIFICATIONS,
  // Different envs import this differently
  payload: _.get(
    qualificationsResponseStub,
    'default',
    qualificationsResponseStub,
  ),
};

export const getQualifications = options => {
  return dispatch => {
    dispatch(
      getClimateWarehouseTable(
        `${constants.API_HOST}/qualifications`,
        actions.GET_QUALIFICATIONS,
        mockQualificationsResponse,
        options,
      ),
    );
  };
};

export const mockProjectLocationsResponse = {
  type: actions.GET_PROJECT_LOCATIONS,
  // Different envs import this differently
  payload: _.get(
    projectLocationsResponseStub,
    'default',
    projectLocationsResponseStub,
  ),
};

export const getProjectLocations = options => {
  return dispatch => {
    dispatch(
      getClimateWarehouseTable(
        `${constants.API_HOST}/locations`,
        actions.GET_PROJECT_LOCATIONS,
        mockProjectLocationsResponse,
        options,
      ),
    );
  };
};

export const mockRelatedProjectsResponse = {
  type: actions.GET_RELATED_PROJECTS,
  // Different envs import this differently
  payload: _.get(
    relatedProjectsResponseStub,
    'default',
    relatedProjectsResponseStub,
  ),
};

export const getRelatedProjects = options => {
  return dispatch => {
    dispatch(
      getClimateWarehouseTable(
        `${constants.API_HOST}/related-projects`,
        actions.GET_RELATED_PROJECTS,
        mockRelatedProjectsResponse,
        options,
      ),
    );
  };
};

export const mockUnitsResponse = {
  type: actions.GET_UNITS,
  // Different envs import this differently
  payload: _.get(unitsResponseStub, 'default', unitsResponseStub),
};

export const getUnits = options => {
  return dispatch => {
    dispatch(
      getClimateWarehouseTable(
        `${constants.API_HOST}/units`,
        actions.GET_UNITS,
        mockUnitsResponse,
        options,
      ),
    );
  };
};

export const mockProjectsResponse = {
  type: actions.GET_PROJECTS,
  // Different envs import this differently
  payload: _.get(projectsResponseStub, 'default', projectsResponseStub),
};

export const getProjects = options => {
  return dispatch => {
    dispatch(
      getClimateWarehouseTable(
        `${constants.API_HOST}/projects`,
        actions.GET_PROJECTS,
        mockProjectsResponse,
        options,
      ),
    );
  };
};

export const mockVintagesResponse = {
  type: actions.GET_VINTAGES,
  // Different envs import this differently
  payload: _.get(vintagesResponseStub, 'default', vintagesResponseStub),
};

export const getVintages = options => {
  return dispatch => {
    dispatch(
      getClimateWarehouseTable(
        `${constants.API_HOST}/vintages`,
        actions.GET_VINTAGES,
        mockVintagesResponse,
        options,
      ),
    );
  };
};
