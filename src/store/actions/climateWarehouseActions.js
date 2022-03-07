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
  NotificationMessageTypeEnum,
  setConnectionCheck,
  setGlobalErrorMessage,
  setNotificationMessage,
  setReadOnly,
} from './app';

export const actions = keyMirror(
  'GET_RATINGS',
  'GET_COBENEFITS',
  'GET_QUALIFICATIONS',
  'GET_PROJECT_LOCATIONS',
  'GET_RELATED_PROJECTS',
  'GET_UNITS',
  'GET_UNITS_PAGE_COUNT',
  'GET_PROJECTS',
  'GET_PROJECTS_PAGE_COUNT',
  'GET_VINTAGES',
  'GET_STAGING_DATA',
  'GET_ORGANIZATIONS',
  'GET_PICKLISTS',
  'GET_ISSUANCES',
  'GET_LABELS',
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

        const response = await fetchWrapper(url);

        if (response.ok) {
          dispatch(setGlobalErrorMessage(null));
          dispatch(setConnectionCheck(true));
          const results = await response.json();

          dispatch({
            type: action,
            payload: results,
          });
        }
      }
    } catch (error) {
      dispatch(setConnectionCheck(false));
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

export const getOrganizationData = () => {
  return async dispatch => {
    dispatch(activateProgressIndicator);

    try {
      const response = await fetchWrapper(
        `${constants.API_HOST}/organizations`,
      );

      if (response.ok) {
        dispatch(setGlobalErrorMessage(null));
        const results = await response.json();

        dispatch({
          type: actions.GET_ORGANIZATIONS,
          payload: results,
        });
      } else {
        dispatch(setConnectionCheck(false));
      }
    } catch {
      dispatch(setConnectionCheck(false));
    } finally {
      dispatch(deactivateProgressIndicator);
    }
  };
};

export const getPickLists = () => {
  return async dispatch => {
    dispatch(activateProgressIndicator);

    const tryToGetPickListsFromStorage = () => {
      const fromStorage = localStorage.getItem('pickLists');
      if (fromStorage) {
        dispatch({
          type: actions.GET_PICKLISTS,
          payload: JSON.parse(fromStorage),
        });
      } else {
        dispatch(setGlobalErrorMessage('Something went wrong...'));
      }
    };

    try {
      const response = await fetchWrapper(
        `https://climate-warehouse.s3.us-west-2.amazonaws.com/public/picklists.json`,
      );

      if (response.ok) {
        dispatch(setConnectionCheck(true));

        const results = await response.json();
        dispatch({
          type: actions.GET_PICKLISTS,
          payload: results,
        });

        localStorage.setItem('pickLists', JSON.stringify(results));
      } else {
        tryToGetPickListsFromStorage();
      }
    } catch {
      dispatch(setConnectionCheck(false));
      tryToGetPickListsFromStorage();
    } finally {
      dispatch(deactivateProgressIndicator);
    }
  };
};

export const getStagingData = ({ useMockedResponse = false }) => {
  return async dispatch => {
    dispatch(activateProgressIndicator);

    try {
      if (useMockedResponse) {
        dispatch(mockGetStagingDataResponse);
      } else {
        const response = await fetchWrapper(`${constants.API_HOST}/staging`);

        if (response.ok) {
          dispatch(setConnectionCheck(true));
          dispatch(setGlobalErrorMessage(null));
          const results = await response.json();

          dispatch({
            type: actions.GET_STAGING_DATA,
            payload: formatStagingData(results),
          });
        }
      }
    } catch {
      dispatch(setGlobalErrorMessage('Something went wrong...'));
      dispatch(setConnectionCheck(false));
    } finally {
      dispatch(deactivateProgressIndicator);
    }
  };
};

export const getIssuances = () => {
  return async dispatch => {
    dispatch(activateProgressIndicator);

    try {
      const response = await fetchWrapper(`${constants.API_HOST}/issuances`);

      if (response.ok) {
        dispatch(setGlobalErrorMessage(null));
        dispatch(setConnectionCheck(true));
        const results = await response.json();

        dispatch({
          type: actions.GET_ISSUANCES,
          payload: results,
        });
      }
    } catch {
      dispatch(setGlobalErrorMessage('Something went wrong...'));
      dispatch(setConnectionCheck(false));
    } finally {
      dispatch(deactivateProgressIndicator);
    }
  };
};

export const getLabels = () => {
  return async dispatch => {
    dispatch(activateProgressIndicator);

    try {
      const response = await fetchWrapper(`${constants.API_HOST}/labels`);

      if (response.ok) {
        dispatch(setGlobalErrorMessage(null));
        dispatch(setConnectionCheck(true));
        const results = await response.json();

        dispatch({
          type: actions.GET_LABELS,
          payload: results,
        });
      }
    } catch {
      dispatch(setGlobalErrorMessage('Something went wrong...'));
      dispatch(setConnectionCheck(false));
    } finally {
      dispatch(deactivateProgressIndicator);
    }
  };
};

export const getPaginatedData = ({
  type,
  page,
  resultsLimit,
  searchQuery,
  orgUid,
}) => {
  return async dispatch => {
    const typeIsValid = type === 'projects' || type === 'units';
    const pageAndLimitAreValid =
      typeof page === 'number' && typeof resultsLimit === 'number';

    if (typeIsValid && pageAndLimitAreValid) {
      dispatch(activateProgressIndicator);
      try {
        let url = `${constants.API_HOST}/${type}?page=${page}&limit=${resultsLimit}`;
        if (searchQuery) {
          url += `&search=${encodeURIComponent(searchQuery)}`;
        }
        if (orgUid && typeof orgUid === 'string') {
          url += `&orgUid=${orgUid}`;
        }
        const response = await fetchWrapper(url);

        if (response.ok) {
          dispatch(
            setReadOnly(response.headers.get('cw-read-only') === 'true'),
          );

          dispatch(setGlobalErrorMessage(null));
          dispatch(setConnectionCheck(true));
          const results = await response.json();

          let action = actions.GET_PROJECTS;
          let paginationAction = actions.GET_PROJECTS_PAGE_COUNT;
          if (type === 'units') {
            action = actions.GET_UNITS;
            paginationAction = actions.GET_UNITS_PAGE_COUNT;
          }

          dispatch({
            type: action,
            payload: results.data,
          });

          dispatch({
            type: paginationAction,
            payload: results.pageCount,
          });
        } else {
          const error = await response.json();
          dispatch(setNotificationMessage('error', error.error));
        }
      } catch {
        dispatch(setGlobalErrorMessage('Something went wrong...'));
        dispatch(setConnectionCheck(false));
      } finally {
        dispatch(deactivateProgressIndicator);
      }
    }
  };
};

export const commitStagingData = data => {
  return async dispatch => {
    try {
      dispatch(activateProgressIndicator);

      const url = `${constants.API_HOST}/staging/commit${
        data === 'all' ? '' : `?table=${data}`
      }`;
      const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetchWrapper(url, payload);

      if (response.ok) {
        dispatch(setConnectionCheck(true));
        dispatch(
          setNotificationMessage(
            NotificationMessageTypeEnum.success,
            'transactions-committed',
          ),
        );
        dispatch(getStagingData({ useMockedResponse: false }));
      } else {
        dispatch(
          setNotificationMessage(
            NotificationMessageTypeEnum.error,
            'transactions-not-committed',
          ),
        );
      }
    } catch {
      dispatch(
        setNotificationMessage(
          NotificationMessageTypeEnum.error,
          'transactions-not-committed',
        ),
      );
      dispatch(setConnectionCheck(false));
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

      const response = await fetchWrapper(url, payload);

      if (response.ok) {
        dispatch(setConnectionCheck(true));
        dispatch(
          setNotificationMessage(
            NotificationMessageTypeEnum.success,
            'staging-group-deleted',
          ),
        );
        dispatch(getStagingData({ useMockedResponse: false }));
      } else {
        dispatch(
          setNotificationMessage(
            NotificationMessageTypeEnum.error,
            'staging-group-could-not-be-deleted',
          ),
        );
      }
    } catch {
      dispatch(setConnectionCheck(false));
      dispatch(
        setNotificationMessage(
          NotificationMessageTypeEnum.error,
          'staging-group-could-not-be-deleted',
        ),
      );
    } finally {
      dispatch(deactivateProgressIndicator);
    }
  };
};

export const deleteUnit = warehouseUnitId => {
  return async dispatch => {
    try {
      dispatch(activateProgressIndicator);

      const url = `${constants.API_HOST}/units`;
      const payload = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ warehouseUnitId }),
      };

      const response = await fetchWrapper(url, payload);

      if (response.ok) {
        dispatch(setConnectionCheck(true));
        dispatch(
          setNotificationMessage(
            NotificationMessageTypeEnum.success,
            'unit-deleted',
          ),
        );
        dispatch(getStagingData({ useMockedResponse: false }));
      } else {
        dispatch(
          setNotificationMessage(
            NotificationMessageTypeEnum.error,
            'unit-could-not-be-deleted',
          ),
        );
      }
    } catch {
      dispatch(setConnectionCheck(false));
      dispatch(
        setNotificationMessage(
          NotificationMessageTypeEnum.error,
          'unit-could-not-be-deleted',
        ),
      );
    } finally {
      dispatch(deactivateProgressIndicator);
    }
  };
};

export const deleteProject = warehouseProjectId => {
  return async dispatch => {
    try {
      dispatch(activateProgressIndicator);

      const url = `${constants.API_HOST}/projects`;
      const payload = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ warehouseProjectId }),
      };

      const response = await fetchWrapper(url, payload);

      if (response.ok) {
        dispatch(setConnectionCheck(true));
        dispatch(
          setNotificationMessage(
            NotificationMessageTypeEnum.success,
            'project-deleted',
          ),
        );
        dispatch(getStagingData({ useMockedResponse: false }));
      } else {
        dispatch(
          setNotificationMessage(
            NotificationMessageTypeEnum.error,
            'project-could-not-be-deleted',
          ),
        );
      }
    } catch {
      dispatch(setConnectionCheck(false));
      dispatch(
        setNotificationMessage(
          NotificationMessageTypeEnum.error,
          'project-could-not-be-deleted',
        ),
      );
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

      const response = await fetchWrapper(url, payload);

      if (response.ok) {
        dispatch(setConnectionCheck(true));
        dispatch(
          setNotificationMessage(
            NotificationMessageTypeEnum.success,
            'project-successfully-created',
          ),
        );
        dispatch(getStagingData({ useMockedResponse: false }));
      } else {
        const responseErrors = await response.json();
        if (!_.isEmpty(responseErrors.errors)) {
          dispatch(
            setNotificationMessage(
              NotificationMessageTypeEnum.error,
              responseErrors.message,
            ),
          );
        } else {
          dispatch(
            setNotificationMessage(
              NotificationMessageTypeEnum.error,
              'project-not-created',
            ),
          );
        }
      }
    } catch {
      dispatch(setConnectionCheck(false));
      dispatch(
        setNotificationMessage(
          NotificationMessageTypeEnum.error,
          'project-not-created',
        ),
      );
    } finally {
      dispatch(deactivateProgressIndicator);
    }
  };
};

export const updateProjectRecord = data => {
  return async dispatch => {
    try {
      dispatch(activateProgressIndicator);

      const url = `${constants.API_HOST}/projects`;
      const payload = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      const response = await fetchWrapper(url, payload);

      if (response.ok) {
        dispatch(setConnectionCheck(true));
        dispatch(
          setNotificationMessage(
            NotificationMessageTypeEnum.success,
            'project-successfully-edited',
          ),
        );
        dispatch(getStagingData({ useMockedResponse: false }));
      } else {
        const responseErrors = await response.json();
        if (!_.isEmpty(responseErrors.errors)) {
          dispatch(
            setNotificationMessage(
              NotificationMessageTypeEnum.error,
              responseErrors.message,
            ),
          );
        } else {
          dispatch(
            setNotificationMessage(
              NotificationMessageTypeEnum.error,
              'project-could-not-be-edited',
            ),
          );
        }
      }
    } catch {
      dispatch(setConnectionCheck(false));
      dispatch(
        setNotificationMessage(
          NotificationMessageTypeEnum.error,
          'project-could-not-be-edited',
        ),
      );
    } finally {
      dispatch(deactivateProgressIndicator);
    }
  };
};

export const postNewOrg = data => {
  return async dispatch => {
    try {
      dispatch(activateProgressIndicator);

      const url = `${constants.API_HOST}/organizations`;
      const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      const response = await fetchWrapper(url, payload);

      if (response.ok) {
        dispatch(setConnectionCheck(true));
        dispatch(getOrganizationData());
        dispatch(
          setNotificationMessage(
            NotificationMessageTypeEnum.success,
            'organization-created',
          ),
        );
      } else {
        dispatch(
          setNotificationMessage(
            NotificationMessageTypeEnum.error,
            'organization-not-created',
          ),
        );
      }
    } catch {
      dispatch(setConnectionCheck(false));
      dispatch(
        setNotificationMessage(
          NotificationMessageTypeEnum.error,
          'organization-not-created',
        ),
      );
    } finally {
      dispatch(deactivateProgressIndicator);
    }
  };
};

export const uploadXLSXFile = (file, type) => {
  return async dispatch => {
    if (type === 'projects' || type === 'units') {
      try {
        dispatch(activateProgressIndicator);
        const formData = new FormData();
        formData.append('xlsx', file);
        const url = `${constants.API_HOST}/${type}/xlsx`;
        const payload = {
          method: 'PUT',
          body: formData,
        };

        const response = await fetchWrapper(url, payload);

        if (response.ok) {
          dispatch(setConnectionCheck(true));
          dispatch(
            setNotificationMessage(
              NotificationMessageTypeEnum.success,
              'upload-successful',
            ),
          );
          dispatch(getStagingData({ useMockedResponse: false }));
        } else {
          dispatch(
            setNotificationMessage(
              NotificationMessageTypeEnum.error,
              'file-could-not-be-uploaded',
            ),
          );
        }
      } catch {
        dispatch(setConnectionCheck(false));
        dispatch(
          setNotificationMessage(
            NotificationMessageTypeEnum.error,
            'file-could-not-be-uploaded',
          ),
        );
      } finally {
        dispatch(deactivateProgressIndicator);
      }
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

      const response = await fetchWrapper(url, payload);

      if (response.ok) {
        dispatch(setConnectionCheck(true));
        dispatch(
          setNotificationMessage(
            NotificationMessageTypeEnum.success,
            'unit-successfully-created',
          ),
        );
        dispatch(getStagingData({ useMockedResponse: false }));
      } else {
        const responseErrors = await response.json();
        if (!_.isEmpty(responseErrors.errors)) {
          dispatch(
            setNotificationMessage(
              NotificationMessageTypeEnum.error,
              responseErrors.message,
            ),
          );
        } else {
          dispatch(
            setNotificationMessage(
              NotificationMessageTypeEnum.error,
              'unit-not-created',
            ),
          );
        }
      }
    } catch (err) {
      dispatch(setConnectionCheck(false));
      dispatch(
        setNotificationMessage(
          NotificationMessageTypeEnum.error,
          'unit-not-created',
        ),
      );
    } finally {
      dispatch(deactivateProgressIndicator);
    }
  };
};

export const splitUnits = data => {
  return async dispatch => {
    try {
      dispatch(activateProgressIndicator);

      const url = `${constants.API_HOST}/units/split`;
      const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const response = await fetchWrapper(url, payload);

      if (response.ok) {
        dispatch(setConnectionCheck(true));
        dispatch(
          setNotificationMessage(
            NotificationMessageTypeEnum.success,
            'unit-successfully-split',
          ),
        );
        dispatch(getStagingData({ useMockedResponse: false }));
      } else {
        dispatch(
          setNotificationMessage(
            NotificationMessageTypeEnum.error,
            'unit-could-not-be-split',
          ),
        );
      }
    } catch (err) {
      dispatch(setConnectionCheck(false));
      dispatch(
        setNotificationMessage(
          NotificationMessageTypeEnum.error,
          'unit-could-not-be-split',
        ),
      );
    } finally {
      dispatch(deactivateProgressIndicator);
    }
  };
};

export const updateUnitsRecord = data => {
  return async dispatch => {
    try {
      dispatch(activateProgressIndicator);

      const url = `${constants.API_HOST}/units`;
      const payload = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      const response = await fetchWrapper(url, payload);

      if (response.ok) {
        dispatch(setConnectionCheck(true));
        dispatch(
          setNotificationMessage(
            NotificationMessageTypeEnum.success,
            'unit-successfully-edited',
          ),
        );
        dispatch(getStagingData({ useMockedResponse: false }));
      } else {
        const responseErrors = await response.json();
        if (!_.isEmpty(responseErrors.errors)) {
          dispatch(
            setNotificationMessage(
              NotificationMessageTypeEnum.error,
              responseErrors.message,
            ),
          );
        } else {
          dispatch(
            setNotificationMessage(
              NotificationMessageTypeEnum.error,
              'unit-could-not-be-edited',
            ),
          );
        }
      }
    } catch {
      dispatch(setConnectionCheck(false));
      dispatch(
        setNotificationMessage(
          NotificationMessageTypeEnum.error,
          'unit-could-not-be-edited',
        ),
      );
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
  const url = options?.searchQuery
    ? `${constants.API_HOST}/units?search=${options.searchQuery}`
    : `${constants.API_HOST}/units`;

  return dispatch => {
    dispatch(
      getClimateWarehouseTable(
        url,
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
  const url = options.searchQuery
    ? `${constants.API_HOST}/projects?search=${options.searchQuery}`
    : `${constants.API_HOST}/projects`;

  return dispatch => {
    dispatch(
      getClimateWarehouseTable(
        url,
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

// TODO to replace with an extended wrapper that also adds try catch finally and also handles network connection and progress indicator dispatches
const fetchWrapper = async (url, payload) => {
  const apiKey = localStorage.getItem('apiKey');
  const serverAddress = localStorage.getItem('serverAddress');
  const doesSignInDataExist = apiKey != null && serverAddress != null;

  if (doesSignInDataExist) {
    const payloadWithApiKey = { ...payload };
    if (payloadWithApiKey?.headers) {
      payloadWithApiKey.headers = {
        ...payloadWithApiKey.headers,
        'x-api-key': apiKey,
      };
    } else {
      payloadWithApiKey.headers = { 'x-api-key': apiKey };
    }

    const serverAddressUrl =
      serverAddress[serverAddress.length - 1] !== '/'
        ? `${serverAddress}/`
        : serverAddressUrl;

    const newUrl = url.replace(/(http:|)(^|\/\/)(.*?\/)/g, serverAddressUrl);

    return fetch(newUrl, payloadWithApiKey);
  }

  return fetch(url, payload);
};
