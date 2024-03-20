import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
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
// @ts-ignore
import { rtkQueryErrorLogger } from './middleware/rtkQueryErrorLogger';

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
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, REGISTER],
      },
    })
      .concat(rtkQueryErrorLogger),
});

const persistor = persistStore(store);

// @ts-ignore
window.store = store;

export { store, persistor };
