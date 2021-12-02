import u from 'updeep';

import { actions as climateWarehouseActions } from '../actions/climateWarehouseActions';

const initialState = {
  ratings: null,
  coBenefits: null,
  qualifications: null,
  projectLocations: null,
  relatedProjects: null,
  units: null,
  projects: null,
  vintages: null,
};

const climateWarehouseReducer = (state = initialState, action) => {
  switch (action.type) {
    case climateWarehouseActions.GET_RATINGS:
      return u({ ratings: action.payload }, state);

    case climateWarehouseActions.GET_COBENEFITS:
      return u({ coBenefits: action.payload }, state);

    case climateWarehouseActions.GET_QUALIFICATIONS:
      return u({ qualifications: action.payload }, state);

    case climateWarehouseActions.GET_PROJECT_LOCATIONS:
      return u({ projectLocations: action.payload }, state);
      
    case climateWarehouseActions.GET_RELATED_PROJECTS:
      return u({ relatedProjects: action.payload }, state);

    case climateWarehouseActions.GET_UNITS:
      return u({ units: action.payload }, state);

    case climateWarehouseActions.GET_PROJECTS:
      return u({ projects: action.payload }, state);

    case climateWarehouseActions.GET_VINTAGES:
      return u({ vintages: action.payload }, state);

    default:
      return state;
  }
};

export { climateWarehouseReducer };
