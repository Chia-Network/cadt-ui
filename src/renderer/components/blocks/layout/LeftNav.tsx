import { useCallback } from 'react';
import { Sidebar } from 'flowbite-react';
import { Button } from 'flowbite-react';
import { 
  HiOutlineArrowLeft, 
  HiOutlineArrowRight,
  HiOutlineArchive,
} from 'react-icons/hi';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import ROUTES from '@/routes/route-constants';
import { useNavigate } from 'react-router-dom';

const ButtonContainer = styled('div')`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 10px;
`;

const LeftNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [leftNavExpanded, setLeftNavExpanded] = useState<boolean>(true);
  const buttonArrowSize: string = "h-3 w-3";

  const isActive = useCallback(
    (path: string) => {
      return location.pathname === path;
    },
    [location],
  );
  
  const handleToggleLeftNav = useCallback(
    () => {
      if (leftNavExpanded){
        setLeftNavExpanded(() => false);
      }else{
        setLeftNavExpanded(() => true);
      }
    },
    [leftNavExpanded]
  );

  const CollapseButton = () => {
    return(
      <ButtonContainer>
        <Button pill color="light" onClick={handleToggleLeftNav}>
          {
            (leftNavExpanded) ?
              <HiOutlineArrowLeft className={buttonArrowSize}/> :
              <HiOutlineArrowRight className={buttonArrowSize}/>
          }
        </Button>
      </ButtonContainer>
    );
  }

  const SidebarItems = () => {
    return (
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            style={{ cursor: 'pointer',  }}
            active={isActive(ROUTES.PROJECTS_LIST)}
            onClick={() => navigate(ROUTES.PROJECTS_LIST)}
            icon={leftNavExpanded && HiOutlineArchive}
          >
            {
              (leftNavExpanded) ?
                <FormattedMessage id="projects-list" /> :
                <HiOutlineArchive/>
            }
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    );
  }

  return (
    <div
      className={`bg-white`}
      style={{ width: '100%', height: '100%', overflow: 'auto' }}
    >
      <Sidebar aria-label="App Navigation" style={ (leftNavExpanded) ? {} : {width: '75px'}}>
        <CollapseButton/>
        <SidebarItems/>
      </Sidebar>
    </div>
  );
};

export { LeftNav };
