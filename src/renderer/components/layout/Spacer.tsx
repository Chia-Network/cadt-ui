import React from 'react';
import styled from 'styled-components';

interface SpacerProps {
  size: number;
  children?: React.ReactNode;
}

const _Spacer = styled.div<SpacerProps>`
  height: ${(props) => props.size}px;
  width: 100%;
`;

// devide by 2 since itll be be
// doubled for top and bottom margins
const Spacer: React.FC<SpacerProps> = ({ children, size }) => <_Spacer size={size}>{children}</_Spacer>;

export { Spacer };
