import _ from 'lodash';
import { useState, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const useQueryParamState = (name, defaultValue) => {
  const [param, setParam] = useState();
  const location = useLocation();

  const setQueryStringParameter = useCallback(
    value => {
      const [base, hashFragment] = window.location.hash.split('?');
      let params = new URLSearchParams(hashFragment);

      if (_.isNil(value) || value === '') {
        params.delete(name);
      } else {
        params.set(name, value);
      }

      const newHash = params.toString() ? `${base}?${params}` : base;

      window.location.hash = decodeURIComponent(newHash);
      setParam(value);
    },
    [name],
  );

  const value = useMemo(() => {
    const [, hashFragment] = window.location.hash.split('?');
    const params = new URLSearchParams(hashFragment);
    return params.get(name) || defaultValue || '';
  }, [location, param, name]);

  return [value, setQueryStringParameter];
};

export { useQueryParamState };
