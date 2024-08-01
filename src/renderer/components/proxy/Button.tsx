import { Button as FlowbiteButton, ButtonGroupProps, ButtonProps } from 'flowbite-react';

function Button({ children, ...props }: ButtonProps) {
  return <FlowbiteButton {...props}>{children}</FlowbiteButton>;
}

function Group({ children, ...props }: ButtonGroupProps) {
  return <FlowbiteButton.Group {...props}>{children}</FlowbiteButton.Group>;
}

Button.Group = Group;

export { Button };
