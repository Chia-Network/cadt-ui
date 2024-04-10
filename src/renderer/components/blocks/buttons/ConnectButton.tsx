import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, ConnectModal } from '@/components';
import { FormattedMessage } from 'react-intl';
import { useUrlHash } from '@/hooks';
import { useGetHealthQuery } from '@/api/cadt/v1/system';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import initialAppState from '@/store/slices/app/app.initialstate';
import { resetApiHost } from '@/store/slices/app';
import { useDispatch } from 'react-redux';

const ConnectButton: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isActive, setActive] = useUrlHash('connect');
  const { apiHost } = useSelector((state: RootState) => state.app);

  const { data: serverFound, isLoading, refetch } = useGetHealthQuery({});

  // Activte the connect modal when the service is not found
  useEffect(() => {
    if (!serverFound && !isLoading) {
      setActive(true);
    }
  }, [serverFound, setActive, isLoading]);

  // Recheck the health when the location changes
  useEffect(() => {
    refetch();
  }, [location, refetch]);

  const handleDisconnect = () => {
    dispatch(resetApiHost());
    setTimeout(() => window.location.reload(), 0);
  };

  return (
    <>
      <Button
        color="none"
        onClick={() => {
          apiHost === initialAppState.apiHost ? setActive(true) : handleDisconnect();
        }}
      >
        {apiHost == initialAppState.apiHost ? <FormattedMessage id="connect" /> : <FormattedMessage id="disconnect" />}
      </Button>
      {isActive && <ConnectModal onClose={() => setActive(false)} />}
    </>
  );
};

export { ConnectButton };
