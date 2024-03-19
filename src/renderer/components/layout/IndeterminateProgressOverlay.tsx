import styled from 'styled-components';
import { Spinner } from 'flowbite-react';

const Container = styled('div')`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IndeterminateProgressOverlay = ({ style = {} }) => (
  <div style={style}>
    <Container>
      <Spinner aria-label="Extra large spinner example" size="xl" />
    </Container>
  </div>
);

export { IndeterminateProgressOverlay };
