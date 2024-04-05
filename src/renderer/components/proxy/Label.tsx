import { Label as FlowbiteLabel, LabelProps } from 'flowbite-react';

function Label({ children, ...props }: LabelProps) {
  return <FlowbiteLabel {...props}>{children}</FlowbiteLabel>;
}

export { Label };
