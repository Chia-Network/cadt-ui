import u from 'updeep';

import { actions as appActions } from '../actions/projectRatingsActions';

const initialState = [];

const projectRatingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case appActions.GET_DATA:
      return u([...action.payload], state);
    
    default:
      return state;
  }
};

export { projectRatingsReducer };
