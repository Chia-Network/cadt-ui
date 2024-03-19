import {createSlice} from '@reduxjs/toolkit';
import initialState from './userOptions.initialstate';
import {DeploymentSettingPayload} from "@/vite-env";

export const userOptionsSlice = createSlice({
  name: 'userOptions',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      if (state.selectedTheme === 'light') {
        state.selectedTheme = 'dark';
      } else {
        state.selectedTheme = 'light';
      }
    },

    setFallbackStoreProvider: (state, { payload }) => {
      state.fallbackStoreProvider = payload;
    },

    setAccessKey: (state, { payload }) => {
      if (typeof payload === 'string' && payload) {
        state.accessKey = payload;
      } else {
        console.error(
          'invalid access key. key must be a string and must not be null',
        );
      }
    },

    setStoreLabel: (state, { payload }) => {
      state.storeLabels[payload.storeId] = payload.label;
    },

    setProjectPath: (state, { payload }) => {
      state.storeProjectFolders[payload.storeId] = payload.label;
    },

    setAccessSecret: (state, { payload }) => {
      if (typeof payload === 'string' && payload) {
        state.accessSecret = payload;
      } else {
        console.error(
          'invalid access secret. secret must be a string and must not be null',
        );
      }
    },

    setDeploymentSetting: (state, { payload }) => {

      const { settingKey, value }: DeploymentSettingPayload = payload;

      if (settingKey) {
        if (typeof value === 'boolean' && (typeof initialState.deployOptions[settingKey] === 'boolean')) {
          state.deployOptions[settingKey] = value;
        } else if (typeof value === 'string') {

          const numericValue: number = parseInt(value);
          const valueIsNaN: boolean = Number.isNaN(numericValue);
          if (valueIsNaN && (typeof initialState.deployOptions[settingKey] === 'number')) {
            state.deployOptions[settingKey] = null;
          } else if (typeof initialState.deployOptions[settingKey] === 'number') {
            state.deployOptions[settingKey] = numericValue;
          } else if (settingKey === 'mirrorUrlOverride' && value === ''){
            // special case for mirror url override
            state.deployOptions.mirrorUrlOverride = null;
          } else {
            state.deployOptions[settingKey] = value;
          }

        } else if (typeof value === 'number') {
          // input type for the default fee is a number, but the type accepted by the RPC's is a string
          if (Number.isNaN(value)) {
            settingKey === 'defaultFee'
              ? state.deployOptions[settingKey] = '': state.deployOptions[settingKey] = null;
          } else {
            settingKey === 'defaultFee'
              ? state.deployOptions[settingKey] = String(value) : state.deployOptions[settingKey] = value;
          }

        } else if (value === null &&
            typeof initialState.deployOptions[settingKey] === 'number' ||
            settingKey === 'mirrorUrlOverride') {
          state.deployOptions[settingKey] = null;
        } else {
          console.error(
            'Invalid deployment setting value for key:', settingKey,
            '. value must be of type', typeof initialState.deployOptions[settingKey]
          );
        }
      } else{
        console.error(
          'Invalid deployment setting key:', settingKey
        );
      }
    },
  },
});

export const {
  toggleTheme,
  setStoreLabel,
  setAccessKey,
  setAccessSecret,
  setFallbackStoreProvider,
  setDeploymentSetting,
} = userOptionsSlice.actions;

export default userOptionsSlice.reducer;
