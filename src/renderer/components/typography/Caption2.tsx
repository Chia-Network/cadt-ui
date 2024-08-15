import React from 'react';
import styled, { CSSProperties } from 'styled-components';

interface Caption2Props {
  children: React.ReactNode;
  style?: CSSProperties;
  color?: string;
  onClick?: () => void;
}

const Content = styled('span')`
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 150%;
  color: ${(props) => props.color || 'black'};
`;

const Caption2: React.FC<Caption2Props> = ({ children, style, color }) => (
  <Content color={color} style={style}>
    {children}
  </Content>
);

export { Caption2 };
