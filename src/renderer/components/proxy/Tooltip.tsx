import { Tooltip as FlowbiteTooltip, TooltipProps } from 'flowbite-react';

function Tooltip({ children, ...props }: TooltipProps) {
  return <FlowbiteTooltip {...props}>{children}</FlowbiteTooltip>;
}

export { Tooltip };
