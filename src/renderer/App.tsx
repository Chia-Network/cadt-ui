import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { loadLocaleData } from '@/translations';
import '@/App.css';
import { AppNavigator } from '@/routes';
import { resetApiHost, setConfigFileLoaded, setHost, setLocale } from '@/store/slices/app';
import { ComponentCenteredSpinner } from '@/components';
import { useGetThemeColorsQuery, useGetUiConfigQuery } from '@/api';

/**
 * @returns app react component to be rendered by electron as the UI
 */
function App() {
  const dispatch = useDispatch();
  const appStore = useSelector((state: any) => state.app);
  const [translationTokens, setTranslationTokens] = useState<object>();
  const [appLoading, setAppLoading] = useState(true);
  const { data: fetchedConfig, isLoading: configFileLoading } = useGetUiConfigQuery();
  const { data: fetchedThemeColors, isLoading: themeColorsFileLoading } = useGetThemeColorsQuery();

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
    if (fetchedThemeColors) {
      // apply loaded theme colors via changing css property values (see App.css)
      Object.entries(fetchedThemeColors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--color-${key}`, value as string);
      });
    }
  }, [fetchedThemeColors]);

  useEffect(() => {
    if (fetchedConfig) {
      if (fetchedConfig?.apiHost) {
        dispatch(setHost({ apiHost: fetchedConfig.apiHost }));
      }
      dispatch(setConfigFileLoaded({ configFileLoaded: true }));
    } else if (!configFileLoading && !fetchedConfig && appStore.configFileLoaded) {
      dispatch(resetApiHost());
      dispatch(setConfigFileLoaded({ configFileLoaded: false }));
    }
  }, [appStore.apiHost, appStore.configFileLoaded, fetchedConfig, configFileLoading, dispatch]);

  useEffect(() => {
    if (!configFileLoading) setTimeout(() => setAppLoading(false), 400);
  }, [configFileLoading]);

  if (!translationTokens || configFileLoading || themeColorsFileLoading || appLoading) {
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
