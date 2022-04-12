import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled('div')`
  height: ${props => (props.noHeight ? '' : '100%')};
`;

const TabPanel = ({ children, value, index, noHeight, ...other }) => {
  return (
    <StyledContainer
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      noHeight={noHeight}
      {...other}>
      {value === index && <>{children}</>}
    </StyledContainer>
  );
};

export { TabPanel };
