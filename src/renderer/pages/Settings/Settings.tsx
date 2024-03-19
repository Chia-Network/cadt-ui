import styled from 'styled-components';
import {
  Spacer,
  DeploymentSettings,
  AccessSettings,
  Web2GatewaySettings
} from '@/components';
import React from "react";

const SettingsDiv = styled('div')`
  height: 100%;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
`;

const Settings: React.FC = () => {
  return (
    <SettingsDiv>
      <div style={{ width: '100%' }}>
        <Web2GatewaySettings />
        <Spacer size={10} />
        <DeploymentSettings />
        <Spacer size={10} />
        <AccessSettings />
      </div>
    </SettingsDiv>
  );
};

export { Settings };
