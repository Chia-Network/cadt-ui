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
    toggleTheme: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
    },
  },
});

export const { setLocale, setHost, toggleTheme } = appSlice.actions;

export const selectCurrentHost = (state) => state.app.host;

export default appSlice.reducer;
