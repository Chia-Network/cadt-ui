import React from 'react';
import { useSelector } from 'react-redux';
import styled, { withTheme, css } from 'styled-components';

const Text = withTheme(styled('body')`
  color: ${props => props.color || '#000000'};
  font-size: 16px;
  font-family: ${props => props.theme.typography.primary.regular};
  font-weight: 400;
  line-height: 150%;
  ${props =>
    props.size === 'Big' &&
    css`
      font-size: 18px;
    `}
  ${props =>
    props.size === 'Bold' &&
    css`
      font-weight: 700;
    `}
  ${props =>
    props.size === 'Small' &&
    css`
      font-size: 14px;
    `}
  ${props =>
    props.size === 'Small Bold' &&
    css`
      font-size: 14px;
      font-weight: 700;
    `}
  ${props =>
    props.size === 'X-Small' &&
    css`
      font-size: 12px;
    `}
  ${props =>
    props.size === 'X-Small Bold' &&
    css`
      font-weight: 700;
      font-size: 12px;
    `}
`);

const Body = withTheme(({ children, color, size }) => {
  const appStore = useSelector(state => state.app);
  return (
    <Text color={color} selectedTheme={appStore.theme} size={size}>
      {children}
    </Text>
  );
});

export { Body };
