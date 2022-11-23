import React from 'react';
import MuiTabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import styled from 'styled-components';

const StyledTabs = styled(MuiTabs)`
  .MuiButtonBase-root {
    color: ${props => props.theme.colors.default.secondary};
  }

  .MuiButtonBase-root:hover {
    color: ${props => props.theme.colors.default.secondaryDark};
  }

  button.Mui-selected {
    color: ${props => props.theme.colors.default.secondaryDark};
  }

  .MuiTabs-indicator {
    background-color: ${props => props.theme.colors.default.secondaryDark};
  }
`;

const Tabs = ({ ...props }) => {
  return <StyledTabs {...props} />;
};

export { Tabs, Tab };
