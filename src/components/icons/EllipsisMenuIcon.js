import React from 'react';
import styled from 'styled-components';

import { EllipseIcon } from '..';
import theme from '../../theme';

const StyledElipseContainer = styled('div')`
  height: 29px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const EllipsisMenuIcon = () => {
  return (
    <StyledElipseContainer>
      <EllipseIcon height="6" width="6" fill={theme.colors.default.secondary} />
      <EllipseIcon height="6" width="6" fill={theme.colors.default.secondary} />
      <EllipseIcon height="6" width="6" fill={theme.colors.default.secondary} />
    </StyledElipseContainer>
  );
};

export { EllipsisMenuIcon };
