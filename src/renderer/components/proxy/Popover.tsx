import { Popover as FlowbitePopover, PopoverProps } from 'flowbite-react';

function Popover({ children, ...props }: PopoverProps) {
  return <FlowbitePopover {...props}>{children}</FlowbitePopover>;
}

export { Popover };
