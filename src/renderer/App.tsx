import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { loadLocaleData } from '@/translations';
import '@/App.css';
import { AppNavigator } from '@/routes';
import { setLocale } from '@/store/slices/app';
import { IndeterminateProgressOverlay } from '@/components';

const fetchedTheme = {
  leftNavBg: `#4e161d`,
};

/**
 * @returns app react component to be rendered by electron as the UI
 */
function App() {
  const dispatch = useDispatch();
  const appStore = useSelector((state: any) => state.app);
  const [translationTokens, setTranslationTokens] = useState<object>();

  // apply loaded theme colors via changing css property values
  Object.entries(fetchedTheme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--color-${key}`, value);
  });

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

  if (!translationTokens) {
    return <IndeterminateProgressOverlay />;
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
