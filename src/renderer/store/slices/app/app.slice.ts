import { createSlice } from '@reduxjs/toolkit';
import initialState from './app.initialstate';
import _ from 'lodash';

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLocale: (state, { payload }) => {
      state.locale = payload;
    },
  },
});

export const {
  setLocale,
} = appSlice.actions;

export default appSlice.reducer;
