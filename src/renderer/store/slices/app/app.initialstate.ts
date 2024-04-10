export interface AppState {
  locale?: string | null,
  apiHost: string,
  apiKey?: string | null,
  isDarkTheme: boolean
}

const initialState: AppState = {
  locale: null,
  apiHost: 'http://localhost:31310',
  apiKey: null,
  isDarkTheme: false
};

export default initialState;
