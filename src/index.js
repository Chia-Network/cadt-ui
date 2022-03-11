import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { refreshApp } from './store/actions/app';

import 'react-notifications/lib/notifications.css';
import './index.css';

import App from './App';
import store from './store';

// Allows the app to reload in a platform agnostic way (either in browser or electron)
const RefreshWrapper = () => {
  const dispatch = useDispatch();
  const appStore = useSelector(state => state.app);

  useEffect(() => {
    dispatch(refreshApp(false));
  }, [appStore.refresh]);

  if (appStore.refresh) {
    return null;
  }

  return <App />;
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <RefreshWrapper />
    </Provider>
  </React.StrictMode>,
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
);
