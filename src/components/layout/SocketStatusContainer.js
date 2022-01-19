import React from 'react';
import styled, { css, withTheme } from 'styled-components';
import socketIO from 'socket.io-client';
import { EllipseIcon } from '..';

const SocketStatusCard = styled('div')`
  position: absolute;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 1.25rem;
  width: 8.125rem;
  bottom: 0;
  left: 0;
`;

const StatusColor = styled('div')`
  font-size: 0.5rem;
  font-family: ${props => props.theme.typography.primary.regular};
  ${props =>
    (props.socketStatus === 'CONNECTED' ||
      props.socketStatus === 'AUTHENTICATED') &&
    css`
      color: green;
    `}
  ${props =>
    props.socketStatus === 'Waiting for status' &&
    css`
      color: yellow;
    `}
    ${props =>
    (props.socketStatus === 'OFFLINE' ||
      props.socketStatus === 'UNAUTHORIZED') &&
    css`
      color: red;
    `};
`;

const WS_HOST = `http://localhost:3030/v1/ws`;
const transports = ['websocket', 'polling'];

let socket = socketIO(WS_HOST, {
  path: '/socket.io',
  transports,
});

const SocketStatusContainer = withTheme(({ socketStatus }) => {
  return (
    <SocketStatusCard>
      <StatusColor socketStatus={socketStatus}>
        {socket.id ? socket.id : 'Retrieving socket ID'}
      </StatusColor>
      {(socketStatus === 'CONNECTED' || socketStatus === 'AUTHENTICATED') && (
        <EllipseIcon height={'5'} width={'5'} fill={'green'} />
      )}
      {socketStatus === 'Waiting for status' && (
        <EllipseIcon height={'5'} width={'5'} fill={'yellow'} />
      )}
      {(socketStatus === 'OFFLINE' || socketStatus === 'UNAUTHORIZED') && (
        <EllipseIcon height={'5'} width={'5'} fill={'red'} />
      )}
    </SocketStatusCard>
  );
});

export { SocketStatusContainer };
