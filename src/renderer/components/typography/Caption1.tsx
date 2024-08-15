import React from 'react';
import styled, { CSSProperties } from 'styled-components';

interface Caption1Props {
  children: React.ReactNode;
  style?: CSSProperties;
  color?: string;
}

const Content = styled('span')`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: ${(props) => props.color || 'black'};
`;

const Caption1: React.FC<Caption1Props> = ({ children, style, color }) => (
  <Content color={color} style={style}>
    {children}
  </Content>
);

export { Caption1 };
