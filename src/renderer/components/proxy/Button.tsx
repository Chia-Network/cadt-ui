import {Button as FlowbiteButton, ButtonProps} from 'flowbite-react';

function Button({ children, ...props }: ButtonProps) {
  return (
    <FlowbiteButton {...props}>{children}</FlowbiteButton>
  );
}

export {Button};