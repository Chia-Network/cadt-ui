import { TabItemProps, Tabs as FlowbiteTabs, TabsProps } from 'flowbite-react';

function Tabs({ children, ...props }: TabsProps) {
  return <FlowbiteTabs {...props}>{children}</FlowbiteTabs>;
}

function Item({ children, ...props }: TabItemProps) {
  return (
    <FlowbiteTabs.Item className="active:on:bg-gray-100 text-cyan-600 dark:bg-gray-800 dark:text-cyan-500" {...props}>
      {children}
    </FlowbiteTabs.Item>
  );
}

Tabs.Item = Item;

export { Tabs };
