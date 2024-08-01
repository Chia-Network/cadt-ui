import { Badge as FlowbiteBadge, BadgeProps } from 'flowbite-react';

function Badge({ children, ...props }: BadgeProps) {
  return <FlowbiteBadge {...props}>{children}</FlowbiteBadge>;
}

export { Badge };
