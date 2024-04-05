export interface AppState {
  locale?: string | null,
  apiHost: string,
  isDarkTheme: boolean
}

const initialState: AppState = {
  locale: null,
  apiHost: 'http://localhost:31310',
  isDarkTheme: false
};

export default initialState;
