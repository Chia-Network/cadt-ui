import React from 'react';
import styled, { withTheme } from 'styled-components';
import { EllipseIcon } from '..';

const StyledElipseContainer = styled('div')`
  height: 29px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const EllipsisMenuIcon = withTheme(theme => {
  return (
    <StyledElipseContainer>
      <EllipseIcon height="6" width="6" fill={theme.colors.default.onDate} />
      <EllipseIcon height="6" width="6" fill={theme.colors.default.onDate} />
      <EllipseIcon height="6" width="6" fill={theme.colors.default.onDate} />
    </StyledElipseContainer>
  );
});

export { EllipsisMenuIcon };
