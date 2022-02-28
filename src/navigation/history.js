import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const reloadApp = () => {
  history.push('/');
};

const reloadCurrentUrl = () => {
  if (history?.location?.pathname) {
    history.push(`${history.location.pathname}${history.location.search}`);
  }
};

export { history, reloadApp, reloadCurrentUrl };
