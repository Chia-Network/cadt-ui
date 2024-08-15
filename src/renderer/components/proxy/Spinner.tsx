import { Spinner as FlowbiteSpinner, SpinnerProps } from 'flowbite-react';

function Spinner({ children, ...props }: SpinnerProps) {
  return <FlowbiteSpinner {...props}>{children}</FlowbiteSpinner>;
}

export { Spinner };
