import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const reloadApp = () => {
  history.push('/');
};

const saveCurrentUrlToStorage = () => {
  if (history?.location?.pathname) {
    const currentUrl = `${history.location.pathname}${history.location.search}&reload=true`;
    localStorage.setItem('currentUrl', currentUrl);
  }
};

const reloadCurrentUrlFromStorage = () => {
  const currentUrl = localStorage.getItem('currentUrl');
  if (currentUrl) {
    history.push(currentUrl);
    localStorage.removeItem('currentUrl');
  }
};

export {
  history,
  reloadApp,
  saveCurrentUrlToStorage,
  reloadCurrentUrlFromStorage,
};
