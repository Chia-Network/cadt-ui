import u from 'updeep';

import { actions as appActions } from '../actions/climateWarehouseActions';

const initialState = {
  ratings: null,
};

const climateWarehouseReducer = (state = initialState, action) => {
  switch (action.type) {
    case appActions.GET_RATINGS_DATA:
      return u({ ratings: action.payload }, state);

    default:
      return state;
  }
};

export { climateWarehouseReducer };
