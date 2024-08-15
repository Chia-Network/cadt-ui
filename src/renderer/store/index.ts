import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, REGISTER, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
// @ts-ignore
import { rtkQueryErrorLogger } from './middleware/rtkQueryErrorLogger';
import { cadtApi } from '@/api/cadt/v1';
import { appReducer } from './slices';
import { PersistState } from 'redux-persist/es/types';
import { AppState } from './slices/app/app.initialstate';

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
    [cadtApi.reducerPath]: cadtApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, REGISTER],
      },
    })
      .concat(rtkQueryErrorLogger)
      .concat(cadtApi.middleware),
});

const persistor = persistStore(store);

// @ts-ignore
window.store = store;

export type RootState = {
  app: AppState & PersistState;
  [cadtApi.reducerPath]: ReturnType<typeof cadtApi.reducer>;
};

export { store, persistor };
