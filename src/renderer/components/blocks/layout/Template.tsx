import { ErrorBoundary } from '@/pages';
import { LeftNav } from './LeftNav';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import {Header} from "@/components";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const BodyContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const LeftNavAside = styled('aside')`
  height: 100%;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  margin: 0 auto;
`;

const Template = () => {
  return (
    <ErrorBoundary>
      <>
        <AppContainer id="app">
          <Header/>
          <BodyContainer id="body">
            <LeftNavAside>
              <LeftNav />
            </LeftNavAside>
            <ContentContainer id="content">
              <>
                <div style={{ height: '100%', overflowY: 'auto', padding: 10 }}>
                  <ErrorBoundary>
                    <Outlet />
                  </ErrorBoundary>
                </div>
              </>
            </ContentContainer>
          </BodyContainer>
        </AppContainer>
      </>
    </ErrorBoundary>
  );
};

export { Template };
