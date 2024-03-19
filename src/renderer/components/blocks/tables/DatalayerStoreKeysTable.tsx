import React, { useEffect } from 'react';
import { Button, Table, TableBody } from 'flowbite-react';
import { FormattedMessage } from 'react-intl';
import { useGetKeysQuery } from '@/api/ipc/datalayer';
import {FauxLinkButton, LoadingSpinnerCard} from '@/components';

import { GetKeysParams } from 'chia-datalayer';
import { decodeHex } from '@/utils/hex-utils';
import {useLocation} from "react-router-dom";
import _ from "lodash";

interface DatalayerStoreKeysTableProps {
  onViewKeyData?: (storeId: string) => void;
  setTableContentsLoaded?: (loaded: boolean) => void;
}

const DatalayerStoreKeysTable: React.FC<DatalayerStoreKeysTableProps> = (
  { onViewKeyData = _.noop, setTableContentsLoaded = _.noop }: DatalayerStoreKeysTableProps,
) => {

  const location = useLocation();
  const storeId = location.state?.storeId;
  const getKeysParams: GetKeysParams = { id: storeId };
  const { data, isLoading, error, refetch } = useGetKeysQuery(getKeysParams);

  useEffect(() => {
    if (isLoading || error) {
      setTableContentsLoaded(false);
    } else {
      setTableContentsLoaded(true);
    }
  }, [setTableContentsLoaded, isLoading, error]);

  const tableContents = data?.keys?.map((storeKey: string, index: number) => (
    <Table.Row
      className="bg-white dark:border-gray-700 dark:bg-gray-800"
      key={index}
    >
      <Table.Cell key={index}>
        <FauxLinkButton
          onClick={() => onViewKeyData(decodeHex(data.keys[index]))}
        >
          {decodeHex(storeKey)}
        </FauxLinkButton>
      </Table.Cell>
    </Table.Row>
  ));

  const NoDataInStore: React.FC = () => {
    return (
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          <FormattedMessage id={'no-data-in-store'} />
        </Table.Cell>
      </Table.Row>
    );
  }

  if (isLoading) {
    return <LoadingSpinnerCard />;
  } else if (error) {
    return (
      <>
        <Button onClick={refetch}>
          <FormattedMessage id={'unable-to-load-stores-click-to-retry'} />
        </Button>
      </>
    );
  } else {
    return (
      <>
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell>
                <FormattedMessage id="key" />
              </Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only" />
              </Table.HeadCell>
            </Table.Head>
            <TableBody className="divide-y">
              {!data?.keys?.length ? (
                <NoDataInStore/>
              ) : (
                <>{tableContents}</>
              )}
            </TableBody>
          </Table>
        </div>
      </>
    );
  }
};

export { DatalayerStoreKeysTable };
