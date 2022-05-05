import u from 'updeep';

import { actions as climateWarehouseActions } from '../actions/climateWarehouseActions';

const initialState = {
  ratings: null,
  coBenefits: null,
  qualifications: null,
  projectLocations: null,
  relatedProjects: null,
  units: null,
  unit: null,
  pageCount: null,
  projects: null,
  project: null,
  vintages: null,
  stagingData: null,
  organizations: null,
  pickLists: null,
  issuances: null,
  labels: null,
  audit: null,
  stagingPageCount: null,
  totalProjectsPages: null,
  totalUnitsPages: null,
};

const climateWarehouseReducer = (state = initialState, action) => {
  switch (action.type) {
    case climateWarehouseActions.GET_ORGANIZATIONS:
      return u({ organizations: action.payload }, state);

    case climateWarehouseActions.GET_PICKLISTS:
      return u({ pickLists: action.payload }, state);

    case climateWarehouseActions.GET_AUDIT:
      return u({ audit: action.payload }, state);

    case climateWarehouseActions.GET_RATINGS:
      return u({ ratings: action.payload }, state);

    case climateWarehouseActions.GET_COBENEFITS:
      return u({ coBenefits: action.payload }, state);

    case climateWarehouseActions.GET_QUALIFICATIONS:
      return u({ qualifications: action.payload }, state);

    case climateWarehouseActions.GET_ISSUANCES:
      return u({ issuances: action.payload }, state);

    case climateWarehouseActions.GET_LABELS:
      return u({ labels: action.payload }, state);

    case climateWarehouseActions.GET_PROJECT_LOCATIONS:
      return u({ projectLocations: action.payload || [] }, state);

    case climateWarehouseActions.GET_RELATED_PROJECTS:
      return u({ relatedProjects: action.payload }, state);

    case climateWarehouseActions.GET_UNITS:
      return u({ units: action.payload || [] }, state);

    case climateWarehouseActions.GET_UNIT:
      return u({ unit: action.payload }, state);

    case climateWarehouseActions.GET_PROJECTS:
      return u({ projects: action.payload }, state);

    case climateWarehouseActions.GET_PROJECT:
      return u({ project: action.payload }, state);

    case climateWarehouseActions.GET_VINTAGES:
      return u({ vintages: action.payload }, state);

    case climateWarehouseActions.GET_STAGING_DATA:
      return u({ stagingData: action.payload }, state);

    case climateWarehouseActions.GET_STAGING_PROJECTS_PAGES:
      return u({ totalProjectsPages: action.payload }, state);

    case climateWarehouseActions.GET_STAGING_UNITS_PAGES:
      return u({ totalUnitsPages: action.payload }, state);

    case climateWarehouseActions.GET_PROJECTS_PAGE_COUNT:
    case climateWarehouseActions.GET_UNITS_PAGE_COUNT:
      return u({ pageCount: action.payload }, state);

    case climateWarehouseActions.GET_STAGING_PAGE_COUNT:
      return u({ stagingPageCount: action.payload }, state);

    default:
      return state;
  }
};

export { climateWarehouseReducer };
