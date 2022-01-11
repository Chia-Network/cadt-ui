import React from 'react';
import styled from 'styled-components';
import { EllipseIcon } from '..';

const StyledElipseContainer = styled('div')`
  height: 29px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const EllipsisMenuIcon = () => {
    return (
      <StyledElipseContainer>
        <EllipseIcon height="6" width="6" fill="#1890FF" />
        <EllipseIcon height="6" width="6" fill="#1890FF" />
        <EllipseIcon height="6" width="6" fill="#1890FF" />
      </StyledElipseContainer>
    );
}

export { EllipsisMenuIcon };