import { useCallback } from 'react';
import { Sidebar } from 'flowbite-react';
import { useLocation } from 'react-router-dom';
import ROUTES from '@/routes/route-constants';
import { useNavigate } from 'react-router-dom';
import {FormattedMessage} from "react-intl";

const LeftNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = useCallback(
    (path: string) => {
      return location.pathname === path;
    },
    [location],
  );

  return (
    <div
      className={`bg-white`}
      style={{ width: '100%', height: '100%', overflow: 'auto' }}
    >
      <Sidebar aria-label="App Navigation">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              style={{ cursor: 'pointer',  }}
              active={isActive(ROUTES.PROJECTS_LIST)}
              onClick={() => navigate(ROUTES.PROJECTS_LIST)}
            >
              <FormattedMessage id={'projects-list'}/>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export { LeftNav };
