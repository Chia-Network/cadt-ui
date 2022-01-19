import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled('div')`
  height: 100%;
`;

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <StyledContainer
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <>{children}</>}
    </StyledContainer>
  );
};

export { TabPanel };
