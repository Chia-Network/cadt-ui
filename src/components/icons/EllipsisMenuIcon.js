import React from 'react';
import styled from 'styled-components';

import { EllipseIcon, IconColorsWrapper } from '../../components';

const StyledElipseContainer = styled('div')`
  height: 29px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const EllipsisMenuIcon = () => {
  return (
    <IconColorsWrapper>
      <StyledElipseContainer>
        <EllipseIcon height="6" width="6" />
        <EllipseIcon height="6" width="6" />
        <EllipseIcon height="6" width="6" />
      </StyledElipseContainer>
    </IconColorsWrapper>
  );
};

export { EllipsisMenuIcon };
