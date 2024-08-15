import React, { useMemo, useCallback } from 'react';
import { useGetGlossaryQuery } from '@/api/cadt/v1/governance';
import { SkeletonTable, GlossaryTable, SearchBox } from '@/components';
import { useQueryParamState, useColumnOrderHandler } from '@/hooks';
import { FormattedMessage } from 'react-intl';
import { debounce } from 'lodash';

const GlossaryPage: React.FC = () => {
  const { data: glossaryData, isLoading: glossaryLoading, error: glossaryError } = useGetGlossaryQuery();
  const [search, setSearch] = useQueryParamState('search', ''); // Fixed the state name to 'search'
  const [order, setOrder] = useQueryParamState('order', undefined);
  const handleSetOrder = useColumnOrderHandler(order, setOrder);

  // Memoized ordered data based on the `order` variable
  const orderedData = useMemo(() => {
    if (!order || !glossaryData) return glossaryData;

    const [orderBy, direction] = order.split(':');
    return [...glossaryData].sort((a, b) => {
      if (a[orderBy] < b[orderBy]) return direction === 'ASC' ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return direction === 'ASC' ? 1 : -1;
      return 0;
    });
  }, [glossaryData, order]);

  // Filter the ordered data based on the search term
  const filteredData = useMemo(() => {
    if (!search.trim()) return orderedData;
    return orderedData?.filter((item) => item.term.toLowerCase().includes(search.toLowerCase()));
  }, [orderedData, search]);

  const handleSearchChange = useCallback(
    debounce((event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    }, 800),
    [], // Removed dependencies on `setSearch` and `debounce` as they are not expected to change
  );

  if (glossaryLoading) {
    return <SkeletonTable />;
  }

  if (glossaryError) {
    return <FormattedMessage id={'unable-to-load-contents'} />;
  }

  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 pl-1 my-2.5 relative z-30">
        <SearchBox defaultValue={search} onChange={handleSearchChange} />
      </div>
      <GlossaryTable data={filteredData || []} isLoading={glossaryLoading} order={order} setOrder={handleSetOrder} />
    </>
  );
};

export { GlossaryPage };
