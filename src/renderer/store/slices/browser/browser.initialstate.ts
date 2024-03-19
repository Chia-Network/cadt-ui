import { HistoryEntry } from ".";

export default {
  history: [] as HistoryEntry[],
  historyIndex: -1,
  defaultPage: {
    url: 'browser://home',
    title: '',
    pageState: {},
    timeStamp: '',
  },
};
