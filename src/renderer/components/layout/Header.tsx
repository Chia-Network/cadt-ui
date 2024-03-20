import React from 'react';
import styled from 'styled-components';
import {AppLogo} from "@/components";

const Headline = styled('div')`
  border-top: 8px solid #2dec7c;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 100%;
  height: 4rem;
  background-color: #00242C;
`;

const LogoContainer = styled('div')`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLocalContainer = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: left;
  gap: 20px;
  padding: 0rem 1.5rem;
  box-sizing: border-box;
`;

const HomeOrgUidContainer = styled('div')`
  margin-left: auto;
  align-self: center;
`;

const Header: React.FC = () => {

  return (
    <Headline>
      <StyledLocalContainer>
        <LogoContainer>
          <AppLogo width="100%" height="80%" />
        </LogoContainer>
        <HomeOrgUidContainer>
          <div style={{color: 'white'}}>
            todo: connect button and locale selector
          </div>
        </HomeOrgUidContainer>
      </StyledLocalContainer>
    </Headline>
  );
};

export { Header };
