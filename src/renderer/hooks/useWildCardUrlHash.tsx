import { useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

// Define a TypeScript type for the setActive callback function
type SetActiveFunction = (isActive: boolean) => void;

// Define the TypeScript return type for the useUrlHash hook
type UseUrlHashReturnType = [string, boolean, SetActiveFunction];

const useWildCardUrlHash = (prefix: string): UseUrlHashReturnType => {
  const [, setHash] = useState<number>();
  const location = useLocation();

  const setActive: SetActiveFunction = useCallback(
    (isActive: boolean) => {
      if (isActive) {
        window.history.pushState(
          {},
          '',
          decodeURIComponent(
            `${window.location.href.replace(window.location.hash, '')}#${prefix}`,
          ),
        );
      } else {
        window.history.pushState(
          {},
          '',
          decodeURIComponent(
            window.location.href.replace(window.location.hash, ''),
          ),
        );
      }
      // Use a random number to trigger a re-render
      setHash(Math.random());
    },
    [prefix, location.hash],
  );

  // Extract the current hash fragment, remove the leading '#' and any query or $ params
  const currentHashFragment = window.location.hash.substring(1).split(/[?$]/)[0];

  // Check if the current hash fragment starts with the given prefix
  const isActive = currentHashFragment.startsWith(prefix);


  return [currentHashFragment, isActive, setActive];
};

export { useWildCardUrlHash };
