import { Button as FlowbiteButton } from 'flowbite-react';

function Button({ children, ...props }) {
  return (
    <FlowbiteButton {...props}>{children}</FlowbiteButton>
  );
}

export {Button};