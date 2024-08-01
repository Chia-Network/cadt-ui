import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, ComponentCenteredSpinner, EditOrganizationForm } from '@/components';
import { Organization } from '@/schemas/Organization.schema';
import { useDeleteOrganizationMutation, useEditOrganizationMutation, useGetOrganizationsListQuery } from '@/api';
import { FormattedMessage } from 'react-intl';
import QRCode from 'qrcode.react';
import { FiEdit } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

interface MyOrganizationProps {}

const MyOrganizationPage: React.FC<MyOrganizationProps> = () => {
  const navigate = useNavigate();
  const { data: organizationsListData, isLoading: organizationsListLoading } = useGetOrganizationsListQuery();
  const [triggerDeleteOrganization] = useDeleteOrganizationMutation();
  const [triggerEditOrganization] = useEditOrganizationMutation();
  const [editOrganization, setEditOrganization] = useState<boolean>(false);

  const myOrganization = useMemo<Organization | undefined>(
    () => organizationsListData?.find((org: Organization) => org.isHome),
    [organizationsListData],
  );

  useEffect(() => {
    if (!myOrganization && !organizationsListLoading) {
      navigate('/');
    }
  }, [myOrganization, navigate, organizationsListLoading]);

  const handleSubmitEditOrganization = async (orgName: string) => {
    if (myOrganization) {
      await triggerEditOrganization({ orgName, orgUid: myOrganization?.orgUid });
    }
  };

  const handleDeleteOrganization = async () => {
    setEditOrganization(false);
    if (myOrganization) {
      await triggerDeleteOrganization(myOrganization.orgUid);
      navigate('/');
    }
  };

  if (organizationsListLoading || !myOrganization) {
    return <ComponentCenteredSpinner />;
  }

  const MyOrganizationInformation: React.FC = () => {
    return (
      <>
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
      </>
    );
  };

  return (
    <div className="space-y-6 m-6">
      <Card className="whitespace-nowrap">
        <div className="flex justify-start">
          <p className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            <FormattedMessage id="organization" />
          </p>
          {!editOrganization ? (
            <button className="ml-2" onClick={() => setEditOrganization(true)}>
              <FiEdit className="text-lime-500" />
            </button>
          ) : (
            <Button className="ml-2" size="xs" color="failure" onClick={handleDeleteOrganization}>
              <FormattedMessage id="delete-organization" />
            </Button>
          )}
        </div>
        {editOrganization ? (
          <EditOrganizationForm
            onSubmit={handleSubmitEditOrganization}
            myOrganization={myOrganization}
            onCancel={() => setEditOrganization(false)}
          />
        ) : (
          <MyOrganizationInformation />
        )}
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
    </div>
  );
};
export { MyOrganizationPage };
