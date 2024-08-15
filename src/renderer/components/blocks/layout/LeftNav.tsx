import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoMenu } from 'react-icons/io5';
import { FormattedMessage } from 'react-intl';
import { Card, CreateOrganizationModal, Sidebar, Spinner, WarehouseIcon } from '@/components';
import ROUTES from '@/routes/route-constants';
import { MdListAlt } from 'react-icons/md';
import { invalidateOrgApiTag, useGetHealthQuery, useGetOrganizationsListQuery } from '@/api';
import { Organization } from '@/schemas/Organization.schema';
import { useUrlHash } from '@/hooks';
import { useDispatch } from 'react-redux';
import { organizationsTag } from '@/api/cadt/v1';

const LeftNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [myOrganization, setMyOrganization] = useState<Organization | undefined>(undefined);
  const [orgCreationPending, setOrgCreationPending] = useState<boolean>(false);
  const { data: serverHealth, isLoading: isServerHealthLoading } = useGetHealthQuery({});

  const [createOrgModalActive, setCreateOrgModalActive] = useUrlHash('create-organization');
  const getOrgRtkQueryOptions = myOrganization || createOrgModalActive ? {} : { pollingInterval: 10000 };
  const { data: organizationsListData, isLoading: organizationsListLoading } = useGetOrganizationsListQuery(
    null,
    getOrgRtkQueryOptions,
  );

  useEffect(() => {
    setMyOrganization(organizationsListData?.find((org: Organization) => org.isHome));
    if (orgCreationPending && myOrganization?.orgUid !== 'PENDING') {
      dispatch(invalidateOrgApiTag([organizationsTag]));
    }
    setOrgCreationPending(myOrganization?.orgUid === 'PENDING');
  }, [dispatch, myOrganization?.orgUid, orgCreationPending, organizationsListData]);

  const isActive = useCallback((path: string) => location.pathname === path, [location]);
  const handleClickMyOrganization = useCallback(() => {
    if (myOrganization && !orgCreationPending) {
      navigate(ROUTES.MY_ORGANIZATION);
    } else {
      setCreateOrgModalActive(true);
    }
  }, [myOrganization, navigate, orgCreationPending, setCreateOrgModalActive]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false); // Close the menu after navigation
  };

  return (
    <div className="h-full relative bg-white dark:bg-gray-800">
      {/* Menu toggle with darker background */}
      <div className="md:hidden flex justify-end p-4 dark:bg-gray-700">
        <button
          onClick={toggleDropdown}
          aria-label="Open navigation"
          className="rounded-full bg-gray-200 dark:bg-gray-600 p-2 hover:bg-gray-300 dark:hover:bg-gray-500"
        >
          <IoMenu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`${isOpen ? 'absolute z-50' : 'hidden'} md:hidden top-full right-0 w-full bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 rounded-b-lg shadow-lg`}
      >
        <div
          onClick={() => handleNavigation(ROUTES.PROJECTS_LIST)}
          className={`cursor-pointer p-3 ${isActive(ROUTES.PROJECTS_LIST) ? 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white' : 'text-gray-700 dark:text-gray-300'} hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md text-lg font-semibold`}
        >
          <FormattedMessage id={'projects-list'} />
        </div>
        <div
          onClick={() => handleNavigation(ROUTES.UNITS_LIST)}
          className={`cursor-pointer p-3 ${isActive(ROUTES.UNITS_LIST) ? 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white' : 'text-gray-700 dark:text-gray-300'} hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md text-lg font-semibold`}
        >
          <FormattedMessage id={'units-list'} />
        </div>
        <div
          onClick={() => handleNavigation(ROUTES.AUDIT)}
          className={`cursor-pointer p-3 ${isActive(ROUTES.AUDIT) ? 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white' : 'text-gray-700 dark:text-gray-300'} hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md text-lg font-semibold`}
        >
          <FormattedMessage id={'audit'} />
        </div>
        <div
          onClick={() => handleNavigation(ROUTES.GLOSSARY)}
          className={`cursor-pointer p-3 ${isActive(ROUTES.GLOSSARY) ? 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white' : 'text-gray-700 dark:text-gray-300'} hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md text-lg font-semibold`}
        >
          <FormattedMessage id={'glossary'} />
        </div>
        {/* Additional mobile navigation items here */}
      </div>

      {/* Original Desktop LeftNav Layout */}
      <div className="h-full hidden md:block">
        <Sidebar aria-label="App Navigation">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Card className="max-w-sm mb-6 shadow-none">
                <div className={'flex space-x-3 justify-center'}>
                  <WarehouseIcon height={24} width={24} />
                  <div>
                    <FormattedMessage id={'warehouse'} />
                  </div>
                </div>
              </Card>
              <Sidebar.Item
                style={{ cursor: 'pointer' }}
                active={isActive(ROUTES.PROJECTS_LIST)}
                onClick={() => navigate(ROUTES.PROJECTS_LIST)}
              >
                <FormattedMessage id="projects-list" />
              </Sidebar.Item>
              <Sidebar.Item
                style={{ cursor: 'pointer' }}
                active={isActive(ROUTES.UNITS_LIST)}
                onClick={() => navigate(ROUTES.UNITS_LIST)}
              >
                <FormattedMessage id="units-list" />
              </Sidebar.Item>
              <Sidebar.Item
                style={{ cursor: 'pointer' }}
                active={isActive(ROUTES.AUDIT)}
                onClick={() => navigate(ROUTES.AUDIT)}
              >
                <FormattedMessage id="audit" />
              </Sidebar.Item>
              <Sidebar.Item
                style={{ cursor: 'pointer' }}
                active={isActive(ROUTES.GLOSSARY)}
                onClick={() => navigate(ROUTES.GLOSSARY)}
              >
                <FormattedMessage id="glossary" />
              </Sidebar.Item>
            </Sidebar.ItemGroup>
            {isServerHealthLoading && <Spinner />}
            {!isServerHealthLoading && !serverHealth?.readOnly && (
              <Sidebar.ItemGroup>
                <Card className="max-w-sm mb-6 shadow-none">
                  <div className={'flex space-x-3 justify-center'}>
                    <MdListAlt size={24} />
                    <div>
                      <FormattedMessage id={'my-registry'} />
                    </div>
                  </div>
                </Card>
                <Sidebar.Item
                  style={{ cursor: 'pointer' }}
                  active={isActive(ROUTES.MY_ORGANIZATION)}
                  onClick={orgCreationPending || organizationsListLoading ? () => {} : handleClickMyOrganization}
                >
                  {myOrganization ? (
                    <>
                      {orgCreationPending ? (
                        <>
                          <FormattedMessage id={'creating-organization'} />
                          <Spinner className="ml-2" />
                        </>
                      ) : (
                        <FormattedMessage id={'my-organization'} />
                      )}
                    </>
                  ) : (
                    <FormattedMessage id={'create-organization'} />
                  )}
                </Sidebar.Item>
                {!orgCreationPending && !organizationsListLoading && myOrganization && (
                  <>
                    <Sidebar.Item
                      style={{ cursor: 'pointer' }}
                      active={isActive(ROUTES.MY_PROJECTS)}
                      onClick={() => navigate(ROUTES.MY_PROJECTS)}
                    >
                      <FormattedMessage id="my-projects" />
                    </Sidebar.Item>
                    <Sidebar.Item
                      style={{ cursor: 'pointer' }}
                      active={isActive(ROUTES.MY_UNITS_LIST)}
                      onClick={() => navigate(ROUTES.MY_UNITS_LIST)}
                    >
                      <FormattedMessage id="my-units" />
                    </Sidebar.Item>
                  </>
                )}
              </Sidebar.ItemGroup>
            )}
          </Sidebar.Items>
        </Sidebar>
        {createOrgModalActive && (
          <CreateOrganizationModal
            orgCreationPending={orgCreationPending}
            orgListLoading={organizationsListLoading}
            onClose={() => setCreateOrgModalActive(false)}
          />
        )}
      </div>
    </div>
  );
};

export { LeftNav };
