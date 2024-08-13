export interface AppState {
  locale?: string | null;
  apiHost: string;
  apiKey?: string | null;
  configFileLoaded: boolean;
  isDarkTheme: boolean;
}

const initialState: AppState = {
  locale: null,
  apiHost: 'http://localhost:31310',
  apiKey: null,
  configFileLoaded: false,
  isDarkTheme: false,
};

export default initialState;
