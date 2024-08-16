import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, ConnectModal } from '@/components';
import { FormattedMessage } from 'react-intl';
import { useUrlHash } from '@/hooks';
import { useGetHealthQuery } from '@/api/cadt/v1/system';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { resetApiHost } from '@/store/slices/app';

const ConnectButton: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isActive, setActive] = useUrlHash('connect');
  const { configFileLoaded } = useSelector((state: RootState) => state.app);

  const { data: serverHealth, isLoading, refetch } = useGetHealthQuery({});

  // Activate the connect modal when the service is not found
  useEffect(() => {
    if (!serverHealth?.isHealthy && !isLoading) {
      setActive(true);
    } else if (serverHealth?.isHealthy && isActive) {
      setActive(false);
    }
  }, [serverHealth, setActive, isLoading, configFileLoaded, isActive]);

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
          !serverHealth?.isHealthy ? setActive(true) : handleDisconnect();
        }}
      >
        {!serverHealth?.isHealthy ? <FormattedMessage id="connect" /> : <FormattedMessage id="disconnect" />}
      </Button>
      {isActive && <ConnectModal onClose={() => setActive(false)} />}
    </>
  );
};

export { ConnectButton };
