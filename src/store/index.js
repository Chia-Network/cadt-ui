import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import { appReducer, climateWarehouseReducer } from './reducers';

const rootReducer = combineReducers({
  app: appReducer,
  climateWarehouse: climateWarehouseReducer,
});

export default createStore(rootReducer, applyMiddleware(ReduxThunk));

export * from './store-functions';
