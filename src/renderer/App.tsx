import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { IntlProvider } from 'react-intl';
import { loadLocaleData } from '@/translations';
import "@/App.css";
import { AppNavigator } from "@/routes";
import { setLocale } from '@/store/slices/app';
import { IndeterminateProgressOverlay } from '@/components';

/**
 * @returns app react component to be rendered by electron as the UI
 */
function App() {

  const dispatch = useDispatch();
  const appStore = useSelector((state: any) => state.app);
  const [translationTokens, setTranslationTokens] = useState<object>();

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
  <div style={{height: '100%'}}> 
    <IntlProvider
      locale={appStore.locale}
      defaultLocale="en"
      //@ts-ignore
      messages={translationTokens.default}
    >
      <AppNavigator/>
    </IntlProvider>
  </div>
  );
}

export default App;
