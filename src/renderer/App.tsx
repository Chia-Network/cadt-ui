import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {IntlProvider} from 'react-intl';
import {loadLocaleData} from '@/translations';
import '@/App.css';
import {AppNavigator} from '@/routes';
import {resetApiHost, setConfigFileLoaded, setHost, setLocale} from '@/store/slices/app';
import {ComponentCenteredSpinner} from '@/components';
import {useGetUiConfigQuery} from '@/api';

/**
 * @returns app react component to be rendered by electron as the UI
 */
function App() {
  const dispatch = useDispatch();
  const appStore = useSelector((state: any) => state.app);
  const [translationTokens, setTranslationTokens] = useState<object>();
  const [appLoading, setAppLoading] = useState(true);
  const { data: configData, isLoading: configFileLoading } = useGetUiConfigQuery();

  useEffect(() => {
    if (appStore.locale) {
      const processTranslationTokens = async () => {
        setTranslationTokens(await loadLocaleData(appStore.locale));
      };

      processTranslationTokens();
    } else {
      dispatch(setLocale(navigator.language));
    }
  }, [appStore.locale, dispatch]);

  useEffect(() => {
    if (configData) {
      if (configData?.apiHost) {
        dispatch(setHost({ apiHost: configData.apiHost }));
      }
      dispatch(setConfigFileLoaded({ configFileLoaded: true }));
    } else if (!configFileLoading && !configData && appStore.configFileLoaded) {
      dispatch(resetApiHost());
      dispatch(setConfigFileLoaded({ configFileLoaded: false }));
    }
  }, [appStore.apiHost, appStore.configFileLoaded, configData, configFileLoading, dispatch]);

  setTimeout(() => setAppLoading(false), 400);

  if (!translationTokens || configFileLoading || appLoading) {
    return <ComponentCenteredSpinner />;
  }

  return (
    <div className="h-full dark:bg-gray-800 dark:text-white">
      <IntlProvider
        locale={appStore.locale}
        defaultLocale="en"
        //@ts-ignore
        messages={translationTokens.default}
      >
        <AppNavigator />
      </IntlProvider>
    </div>
  );
}

export default App;
