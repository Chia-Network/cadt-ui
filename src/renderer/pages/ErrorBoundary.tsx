import React from 'react';
import { Modal } from '@/components';
import { FormattedMessage } from 'react-intl';

class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state as any;
    const { children } = this.props as any;

    if (!hasError) {
      return children;
    }

    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Modal show={true} onClose={() => (window.location.href = '/')}>
          <Modal.Header>
            <FormattedMessage id="application-error" />
          </Modal.Header>
          <Modal.Body>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              <FormattedMessage id="please-reload-or-restart-the-application" />.
            </p>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export { ErrorBoundary };
