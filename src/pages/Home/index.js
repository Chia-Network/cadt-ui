import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { IndeterminateProgressOverlay } from '../../components';

const Home = () => {
  const history = useHistory();
  useEffect(() => {
    history.push('/projects');
  });
  return <IndeterminateProgressOverlay />;
};

export { Home };
