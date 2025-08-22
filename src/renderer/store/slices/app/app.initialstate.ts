export interface AppState {
  locale?: string | null;
  apiHost: string;
  apiKey?: string | null;
  configFileLoaded: boolean;
  isDarkTheme: boolean;
}

const initialState: AppState = {
  locale: null,
  apiHost: '', // Empty string means no default API host
  apiKey: null,
  configFileLoaded: false,
  isDarkTheme: false,
};

export default initialState;
