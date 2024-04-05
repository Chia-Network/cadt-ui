import { FloatingLabel as FlowbiteFloatingLabel, FloatingLabelProps } from 'flowbite-react';

function FloatingLabel({ children, ...props }: FloatingLabelProps) {
  return <FlowbiteFloatingLabel {...props}>{children}</FlowbiteFloatingLabel>;
}

export { FloatingLabel };
