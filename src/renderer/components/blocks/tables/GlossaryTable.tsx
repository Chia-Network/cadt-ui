import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { DataTable } from '@/components';

interface TableProps {
  data: any[];
  isLoading: boolean;
  order: string;
  setOrder: (sort: string) => void;
}

const GlossaryTable: React.FC<TableProps> = ({ data, isLoading, order, setOrder }) => {
  const columns = useMemo(
    () => [
      {
        title: <FormattedMessage id={'term'} />,
        key: 'term',
      },
      {
        title: <FormattedMessage id={'description'} />,
        key: 'description',
        render: (row: any) => {
          return (
            <div className="text-gray-600 dark:text-white">
              {row.description.map((item, index) => (
                <div key={`${item.header}-${index}`} className="mb-4 last:mb-0 text-left">
                  <div className="font-bold items-start">{item.header}</div>
                  <div className="items-start">{item.definition}</div>
                </div>
              ))}
            </div>
          );
        },
      },
    ],
    [],
  );

  return (
    <div className="relative">
      <DataTable
        columns={columns}
        data={data}
        primaryKey="term"
        isLoading={isLoading}
        order={order}
        onChangeOrder={setOrder}
      />
    </div>
  );
};

export { GlossaryTable };
