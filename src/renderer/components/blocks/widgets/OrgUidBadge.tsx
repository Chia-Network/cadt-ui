import React, { useEffect, useRef, useState } from 'react';
import { Spinner, Toast } from '@/components';
import { FiInfo } from 'react-icons/fi';
import { FormattedMessage } from 'react-intl';

interface OrgUidBadgeProps {
  orgUid: string;
  registryId?: string;
}

const OrgUidBadge: React.FC<OrgUidBadgeProps> = ({ orgUid, registryId }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showPopout, setShowPopout] = useState(false);
  const popoutRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // @ts-ignore
      if (popoutRef.current && !popoutRef.current.contains(event.target)) {
        setShowPopout(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [popoutRef]);

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      })
      .catch((err) => console.error('Failed to copy:', err));
  };

  const togglePopout = () => setShowPopout(!showPopout);

  return (
    <div className="relative inline-flex items-center">
      <button
        onClick={togglePopout}
        className="text-blue-300 hover:text-blue-400 transition duration-150 ease-in-out dark:text-blue-200 dark:hover:text-blue-300"
        aria-label="Info"
      >
        <FiInfo size={24} />
      </button>

      {showPopout && (
        <div
          ref={popoutRef}
          className="absolute left-0 transform -translate-x-1/2 top-full mt-2 p-4 bg-white shadow-lg rounded-lg z-10 border border-gray-200 dark:bg-gray-700 dark:border-gray-600"
          style={{ left: '50%', minWidth: '700px' }}
        >
          <div className="grid grid-cols-[100px_auto] gap-4">
            <div className="text-gray-700 text-xs font-mono dark:text-gray-300">Org UID:</div>
            <div
              className="cursor-pointer hover:bg-gray-100 p-2 rounded text-xs font-mono dark:hover:bg-gray-600 dark:text-gray-200"
              onClick={() => copyToClipboard(orgUid, 'Org UID copied!')}
            >
              {orgUid}
            </div>
            <div className="text-gray-700 text-xs font-mono dark:text-gray-300">
              <p>
                <FormattedMessage id="Registry" /> ID:
              </p>
            </div>
            {registryId ? (
              <div
                className="cursor-pointer hover:bg-gray-100 p-2 rounded text-xs font-mono dark:hover:bg-gray-600 dark:text-gray-200"
                onClick={() => copyToClipboard(registryId, 'Registry ID copied!')}
              >
                {registryId}
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Spinner size="sm" />
              </div>
            )}
          </div>
        </div>
      )}

      {showToast && (
        <Toast className="fixed bottom-4 right-4 z-50 bg-gray-900 text-white border border-gray-700 dark:bg-gray-800 dark:border-gray-600">
          <span className="font-medium dark:text-gray-200">{toastMessage}</span>
        </Toast>
      )}
    </div>
  );
};

export { OrgUidBadge };
