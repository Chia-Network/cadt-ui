import { HelperText as FlowbiteHelperText, HelperTextProps } from 'flowbite-react';

function HelperText({ children, ...props }: HelperTextProps) {
  return <FlowbiteHelperText {...props}>{children}</FlowbiteHelperText>;
}

export { HelperText };
