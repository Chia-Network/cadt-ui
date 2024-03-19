import { HistoryEntry } from './browser.types';

export const selectDefaultPage = (state): HistoryEntry => {
  return state.browser.defaultPage;
};

export const selectCurrentPage = (state): HistoryEntry => {
  const history = state.browser.history;
  const historyIndex = state.browser.historyIndex;
  return history[historyIndex];
};
