import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import { appReducer, climateWarehouseReducer, projectRatingsReducer } from './reducers';

const rootReducer = combineReducers({
  app: appReducer,
  climateWarehouse: climateWarehouseReducer,
  projectRatingsReducer: projectRatingsReducer
});

export default createStore(rootReducer, applyMiddleware(ReduxThunk));

export * from './store-functions';
