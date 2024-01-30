import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

import { appReducer, climateWarehouseReducer } from './reducers';

const rootReducer = combineReducers({
  app: appReducer,
  climateWarehouse: climateWarehouseReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));

export * from './store-functions';
