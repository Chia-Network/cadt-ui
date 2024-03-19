import { isEqual } from 'lodash';
import { createSlice, current } from '@reduxjs/toolkit';
import initialState from './browser.initialstate';
import { HistoryEntry } from './browser.types';
import { transformToHttpProtocal } from '@/utils/chia-router';

export const browserSlice = createSlice({
  name: 'browser',
  initialState,
  reducers: {
    visitPage: (state, { payload }) => {
      const timestamp: string = new Date().toDateString();

      const { page, fallbackStoreProvider, ownedStores } = payload;

      const newEntry: HistoryEntry = {
        url: transformToHttpProtocal(
          page.url,
          fallbackStoreProvider,
          ownedStores,
        ),
        title: page.title,
        pageState: page.pageState,
        timeStamp: timestamp,
      };

      const currentPage = current(state).history[state.historyIndex];

      if (!isEqual(currentPage, newEntry)) {        
        const history = current(state).history;
        const historyIndex = current(state).historyIndex;

        state.historyIndex++;
        state.history = [history.slice(0, historyIndex + 1), newEntry].flat();
      }
    },

    goBack: (state) => {
      if (state.historyIndex > 0) {
        state.historyIndex--;
        state.history[current(state).historyIndex];
      }
    },

    goForward: (state) => {
      if (state.historyIndex < state.history.length - 1) {
        state.historyIndex++;
        state.history[current(state).historyIndex];
      }
    },
  },
});

export const { visitPage, goBack, goForward } = browserSlice.actions;

export default browserSlice.reducer;
