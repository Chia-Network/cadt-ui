import _ from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { getRatings } from '../../store/actions/climateWarehouseActions';

import { Card, H3, DataTable } from '../../components';
import { useSelector, useDispatch } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const climateWarehouseStore = useSelector(store => store.climateWarehouse);

  useEffect(() => dispatch(getRatings({ useMockedResponse: true })), []);

  const resultsPages = useMemo(() => {
    if (!climateWarehouseStore.ratings) {
      return undefined;
    }

    return _.chunk(climateWarehouseStore.ratings, 100);
  }, [climateWarehouseStore.ratings]);

  return (
    <>
      <Card>
        <H3>{intl.formatMessage({ id: 'hello-world' })}</H3>
        <div>
          {climateWarehouseStore.ratings && (
            <DataTable
              headings={['type', 'rating', 'link', 'scale']}
              data={resultsPages}
            />
          )}
        </div>
      </Card>
    </>
  );
};

export { Home };
