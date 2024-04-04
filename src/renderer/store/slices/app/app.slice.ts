import { createSlice } from '@reduxjs/toolkit';
import initialState from './app.initialstate';

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLocale: (state, { payload }) => {
      state.locale = payload;
    },
    setHost: (state, { payload }) => {
      state.apiHost = payload;
    },
  },
});

export const { setLocale, setHost } = appSlice.actions;

export const selectCurrentHost = (state) => state.app.host;

export default appSlice.reducer;
