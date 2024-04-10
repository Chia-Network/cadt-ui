import React, { useEffect, useState } from 'react';
import { Card, Spinner } from '@/components';
import { Organization } from '@/schemas/Organization.schema';
import { useGetOrganizationsListQuery } from '@/api';
import { FormattedMessage } from 'react-intl';
import QRCode from 'qrcode.react';

interface MyOrganizationProps {}

const MyOrganization: React.FC<MyOrganizationProps> = () => {
  const { data: organizationsListData, isLoading: organizationsListLoading } = useGetOrganizationsListQuery();

  const [myOrganization, setMyOrganization] = useState<Organization | undefined>(undefined);

  useEffect(() => {
    setMyOrganization(organizationsListData?.find((org: Organization) => org.isHome));
  }, [myOrganization?.orgUid, organizationsListData]);

  if (!myOrganization || organizationsListLoading) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-6 m-6">
      <Card className="whitespace-nowrap">
        <div className="flex justify-start">
          <p className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            <FormattedMessage id="organization" />
          </p>
        </div>
        <div className="flex justify-start">
          <p className="font-bold text-left text-gray-700 dark:text-gray-400 mr-4">
            <FormattedMessage id="name" />
          </p>
          <p className="font-normal text-left text-gray-700 dark:text-gray-400">{myOrganization.name}</p>
        </div>
        <div className="flex justify-start">
          <p className="font-bold text-left text-gray-700 dark:text-gray-400 mr-4">
            <FormattedMessage id="orguid" />
          </p>
          <p className="font-normal text-left text-gray-700 dark:text-gray-400 inline-block">{myOrganization.orgUid}</p>
        </div>
      </Card>
      <Card>
        <div className="flex justify-start">
          <p className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            <FormattedMessage id="wallet" />
          </p>
        </div>
        <div className="flex justify-start">
          <p className="font-bold text-left text-gray-700 dark:text-gray-400 mr-4 whitespace-nowrap">
            <FormattedMessage id="wallet-sync-status" />
          </p>
          {myOrganization?.synced ? (
            <p className="font-normal text-lime-500 text-left dark:text-green-400">
              <FormattedMessage id="synced" /> &#10003;
            </p>
          ) : (
            <p className="font-normal text-amber-600 text-left dark:text-orange-400">
              <FormattedMessage id="not-synced" /> &#9747;
            </p>
          )}
        </div>
        <div className="flex justify-start">
          <p className="font-bold text-left text-gray-700 dark:text-gray-400 mr-4 whitespace-nowrap">
            <FormattedMessage id="spendable-balance" />
          </p>
          <p className="font-normal text-left text-gray-700 dark:text-gray-400 inline-block whitespace-nowrap">
            {myOrganization.balance}
            {' XCH'}
          </p>
        </div>
        <div className="flex justify-start">
          <p className="font-bold text-left text-gray-700 dark:text-gray-400 mr-4 whitespace-nowrap">
            <FormattedMessage id="public-address" />
          </p>
          <p className="font-normal text-left text-gray-700 dark:text-gray-400 inline-block whitespace-nowrap">
            {myOrganization.xchAddress}
          </p>
        </div>

        {myOrganization?.xchAddress && (
          <div className="space-y-3">
            <p className="font-bold text-left text-gray-700 dark:text-gray-400 mr-4">
              <FormattedMessage id="public-address-qr-code" />
            </p>
            <QRCode value={myOrganization.xchAddress} />
          </div>
        )}
      </Card>
      <Card>
        <div className="flex justify-start">
          <p className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            <FormattedMessage id="organization-subscriptions" />
          </p>
        </div>
      </Card>
    </div>
  );
};
export { MyOrganization };
