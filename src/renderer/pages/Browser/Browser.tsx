import { useState, useCallback, useRef, useEffect } from 'react';
import { WebView } from '@/components/blocks/layout/WebView';
import { NavigationBar } from './NavigationBar';
import { WebviewTag } from 'electron';
import { useDispatch, useSelector } from 'react-redux';
import {
  visitPage,
  PageState,
  VisitPagePayload,
  selectCurrentPage,
  selectDefaultPage,
  goBack,
  goForward,
} from '@/store/slices/browser';
import { transformToChiaProtocol } from '@/utils/chia-router';
import { useGetOwnedStoresQuery } from '@/api/ipc/datalayer';
import { LoadingSpinnerCard } from '@/components';
import SplashScreen from '@/assets/home2.png';

const Browser: React.FC = () => {
  const dispatch = useDispatch();
  const webviewRef = useRef<WebviewTag>(null);
  const currentPage = useSelector((state: any) => selectCurrentPage(state));
  const defaultPage = useSelector((state: any) => selectDefaultPage(state));
  const { data: ownedStores } = useGetOwnedStoresQuery({});
  const fallbackStoreProvider = useSelector(
    (state: any) => state.userOptions.fallbackStoreProvider,
  );
  const [addressBar, setAddressBar] = useState('');

  useEffect(() => {
    if (!currentPage) {
      dispatch(
        visitPage({ page: defaultPage, fallbackStoreProvider, ownedStores }),
      );
      setAddressBar(
        transformToChiaProtocol(defaultPage.url, fallbackStoreProvider),
      );
    } else {
      setAddressBar(
        transformToChiaProtocol(currentPage.url, fallbackStoreProvider),
      );
    }
  }, [
    currentPage,
    dispatch,
    defaultPage,
    setAddressBar,
    fallbackStoreProvider,
    ownedStores,
  ]);

  const handleOnDidNavigate = useCallback((location) => {
    setAddressBar(transformToChiaProtocol(location, fallbackStoreProvider));
  }, [fallbackStoreProvider]);

  const handleOnDidNavigateInPage = useCallback(
    (location) => {
      setAddressBar(transformToChiaProtocol(location, fallbackStoreProvider));

      const pageState: PageState = {
        scrollPosition: { x: 0, y: 0 },
        formData: {},
      };

      const payload: VisitPagePayload = {
        url: location.url,
        title: '',
        pageState: pageState,
      };

      visitPage({ payload, fallbackStoreProvider, ownedStores });
    },
    [fallbackStoreProvider, ownedStores],
  );

  const handleUpdateAddressBar = useCallback(
    (event) => {
      setAddressBar(
        transformToChiaProtocol(event.target.value, fallbackStoreProvider),
      );
    },
    [setAddressBar, fallbackStoreProvider],
  );

  const handleGotoAddress = useCallback(
    (_?: any, url: string = addressBar) => {
      if (webviewRef.current && url === currentPage.url) {
        webviewRef.current.reload();
        return;
      }

      const pageState: PageState = {
        scrollPosition: { x: 0, y: 0 },
        formData: {},
      };

      const page: VisitPagePayload = {
        url: url,
        title: '',
        pageState: pageState,
      };

      dispatch(visitPage({ page, fallbackStoreProvider, ownedStores }));
    },
    [addressBar, currentPage, dispatch, fallbackStoreProvider, ownedStores],
  );

  const handleGoToPrevPage = useCallback(() => {
    dispatch(goBack());
  }, [dispatch]);

  const handleGoToNextPage = useCallback(() => {
    dispatch(goForward());
  }, [dispatch]);

  const handleGoToHome = useCallback(() => {
    dispatch(
      visitPage({ page: defaultPage, fallbackStoreProvider, ownedStores }),
    );
  }, [dispatch, defaultPage, fallbackStoreProvider, ownedStores]);

  if (!currentPage) {
    return <LoadingSpinnerCard />;
  }

  return (
    <>
      <NavigationBar
        value={addressBar}
        onChange={handleUpdateAddressBar}
        onEnterDown={handleGotoAddress}
        onRefresh={handleGotoAddress}
        onBack={handleGoToPrevPage}
        onForward={handleGoToNextPage}
        onHome={handleGoToHome}
      />
      {currentPage.url === 'browser://home' ? (
        <div
          style={{ 
            width: '100%', // Adjust the width as needed
            height: '100vh', // Adjust the height as needed
            backgroundImage: `url(${SplashScreen})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top',
            backgroundRepeat: 'no-repeat',
            opacity: 0.3
        }}
        />
      ) : (
        <WebView
          ref={webviewRef}
          onDidNavigate={handleOnDidNavigate}
          onDidNavigateInPage={handleOnDidNavigateInPage}
          location={currentPage.url}
        />
      )}
    </>
  );
};

export { Browser };
