import u from 'updeep';

import { actions as climateWarehouseActions } from '../actions/climateWarehouseActions';

const initialState = {
  coBenefits: null,
};

const climateWarehouseReducer = (state = initialState, action) => {
  switch (action.type) {
    case climateWarehouseActions.GET_COBENEFITS:
      return u({ coBenefits: action.payload }, state);

    default:
      return state;
  }
};

export { climateWarehouseReducer };
