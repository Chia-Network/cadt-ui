import React, { useState, useEffect } from 'react';
import { Toast, Tooltip } from 'flowbite-react';

interface OrgUidBadgeProps {
  orgUid: string;
}

const OrgUidBadge: React.FC<OrgUidBadgeProps> = ({ orgUid }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (showToast) {
      setToastVisible(true);
      timeoutId = setTimeout(() => setShowToast(false), 3000);
    } else if (!showToast && toastVisible) {
      timeoutId = setTimeout(() => setToastVisible(false), 300);
    }

    return () => clearTimeout(timeoutId);
  }, [showToast, toastVisible]);

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(orgUid)
      .then(() => {
        setToastMessage('Org UID copied to clipboard!');
        setShowToast(true);
      })
      .catch((err) => {
        console.error('Failed to copy Org UID: ', err);
        setToastMessage('Failed to copy Org UID.');
        setShowToast(true);
      });
  };

  if (!orgUid) {
    return null;
  }

  return (
    <>
      {toastVisible && (
        <div
          className={`absolute top-0 right-0 p-4 transition-opacity duration-300 ${showToast ? 'opacity-100' : 'opacity-0'}`}
        >
          <Toast className="bg-gray-900 text-white border border-gray-700">
            <span className="font-medium">{toastMessage}</span>
          </Toast>
        </div>
      )}
      <Tooltip content="Click to copy Organization ID">
        <span
          onClick={handleCopyToClipboard}
          className="cursor-pointer p-2 bg-gray-50 text-gray-700 text-xs font-mono rounded flex items-center"
        >
          {orgUid}
        </span>
      </Tooltip>
    </>
  );
};

export { OrgUidBadge };
