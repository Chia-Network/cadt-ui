import { isRejectedWithValue } from '@reduxjs/toolkit';

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger = () => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    console.warn('We got a rejected action!');

    // TODO: XLA-30 - add a toast component to here to show an error to the user
    console.warn({ title: 'Async error!', message: action?.error?.data?.message || JSON.stringify(action) });
  }

  return next(action);
};
