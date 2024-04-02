import { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoMenu } from 'react-icons/io5';
import { FormattedMessage } from 'react-intl';
import { Sidebar } from '@/components';
import ROUTES from '@/routes/route-constants';

const LeftNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = useCallback((path: string) => location.pathname === path, [location]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false); // Close the menu after navigation
  };

  return (
    <div className="relative bg-white dark:bg-gray-800">
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
        {/* Additional mobile navigation items here */}
      </div>

      {/* Original Desktop LeftNav Layout */}
      <div className="hidden md:block">
        <Sidebar aria-label="App Navigation">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
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
                <FormattedMessage id="audits" />
              </Sidebar.Item>
              <Sidebar.Item
                style={{ cursor: 'pointer' }}
                active={isActive(ROUTES.GLOSSARY)}
                onClick={() => navigate(ROUTES.GLOSSARY)}
              >
                <FormattedMessage id="glossary" />
              </Sidebar.Item>
              {/* Add more Sidebar.Item as needed */}
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
    </div>
  );
};

export { LeftNav };
