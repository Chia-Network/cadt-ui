import React, { useEffect, useImperativeHandle, forwardRef } from 'react';
import { formatDocType } from '@/utils/webview-formats';

interface WebViewProps {
  location: string;
  onDidNavigate: (url: string) => void;
  onDidNavigateInPage: (url: string) => void;
  style?: React.CSSProperties;
}

const WebView = forwardRef<Electron.WebviewTag, WebViewProps>(
  ({ location, onDidNavigate, onDidNavigateInPage, style = {} }, ref) => {
    const webviewRef = React.useRef<Electron.WebviewTag>(null);

    // Use type assertion to ensure webviewRef.current is not null
    useImperativeHandle(ref, () => webviewRef.current as Electron.WebviewTag);

    useEffect(() => {
      const currentWebview = webviewRef.current;

      const handleDidNavigate = (e: Electron.DidNavigateEvent) => {
        onDidNavigate(e.url);
        formatDocType(currentWebview);
      };

      const handleDidNavigateInPage = (e: Electron.DidNavigateInPageEvent) => {
        onDidNavigateInPage(e.url);
        formatDocType(currentWebview);
      };

      if (currentWebview) {
        currentWebview.addEventListener('did-navigate', handleDidNavigate);
        currentWebview.addEventListener(
          'did-navigate-in-page',
            handleDidNavigateInPage,
        );
      }

      return () => {
        if (currentWebview) {
          currentWebview.removeEventListener('did-navigate', handleDidNavigate);
          currentWebview.removeEventListener(
            'did-navigate-in-page',
            handleDidNavigateInPage,
          );
        }
      };
    }, [onDidNavigate, onDidNavigateInPage]);

    return (
      <webview
        ref={webviewRef}
        src={location}
        style={{
          width: '100%',
          height: '100%',
          ...style,
        }}
      />
    );
  },
);

export { WebView };
