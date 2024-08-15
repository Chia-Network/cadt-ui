import { Card as FlowbiteCard, CardProps } from 'flowbite-react';

function Card({ children, ...props }: CardProps) {
  return <FlowbiteCard {...props}>{children}</FlowbiteCard>;
}

export { Card };
