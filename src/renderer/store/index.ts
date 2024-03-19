import { configureStore } from '@reduxjs/toolkit';
import { ipcApi, getUserIp } from '@/api';
import appReducer from './slices/app/app.slice';
import userOptionsReducer from './slices/userOptions/userOptions.slice';
import storage from 'redux-persist/lib/storage';
// @ts-ignore
import { rtkQueryErrorLogger } from './middleware/rtkQueryErrorLogger';

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  REGISTER,
  persistStore,
} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {browserReducer} from './slices';

const persistUserOptionsConfig = {
  key: 'userOptions',
  version: 1,
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistAppsConfig = {
  key: 'app',
  version: 1,
  storage,
  stateReconciler: autoMergeLevel2,
};

const store = configureStore({
  reducer: {
    // @ts-ignore
    app: persistReducer(persistAppsConfig, appReducer),
    // @ts-ignore
    userOptions: persistReducer(persistUserOptionsConfig, userOptionsReducer),
    [ipcApi.reducerPath]: ipcApi.reducer,
    [getUserIp.reducerPath]: getUserIp.reducer,
    browser: browserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, REGISTER],
      },
    })
      .concat(ipcApi.middleware)
      .concat(getUserIp.middleware)
      .concat(rtkQueryErrorLogger),
});

const persistor = persistStore(store);

// @ts-ignore
window.store = store;

export { store, persistor };
