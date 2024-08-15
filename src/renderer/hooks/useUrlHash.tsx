import _ from 'lodash';
import { useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

// Define a TypeScript type for the setActive callback function
type SetActiveFunction = (isActive: boolean) => void;

// Define the TypeScript return type for the useUrlHash hook
type UseUrlHashReturnType = [boolean, SetActiveFunction];

const useUrlHash = (name: string): UseUrlHashReturnType => {
  const [, setHash] = useState<number>();
  const location = useLocation();

  const setActive: SetActiveFunction = useCallback(
    (isActive: boolean) => {
      if (isActive) {
        window.history.pushState(
          {},
          '',
          decodeURIComponent(`${window.location.href.replace(window.location.hash, '')}#${name}`),
        );
      } else {
        window.history.pushState({}, '', decodeURIComponent(window.location.href.replace(window.location.hash, '')));
      }
      // Use a random number to trigger a re-render
      setHash(Math.random());
    },
    [name, location.hash],
  );

  const currentHash = new URLSearchParams(window.location.hash.substring(1).replace(/\$.*$/, '').replace(/\?.*/, ''));

  // Expose currentHash globally for debugging (Consider removing this in production)
  (window as any).currentHash = currentHash;

  const isActive = !_.isNil(currentHash.get(name));

  return [isActive, setActive];
};

export { useUrlHash };
