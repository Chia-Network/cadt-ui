import React, { useEffect } from 'react';
import { IndeterminateProgressOverlay } from '../../components';

const Home = () => {
  useEffect(() => {
    window.location.href = './projects';
  });
  return <IndeterminateProgressOverlay />;
};

export { Home };
