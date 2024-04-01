import {
  Sidebar as FlowbiteSidebar,
  SidebarProps,
  SidebarItemProps,
  SidebarItemsProps,
  SidebarItemGroupProps
} from 'flowbite-react';

function Sidebar({ children, ...props }: SidebarProps) {
  return (
    <FlowbiteSidebar {...props}>{children}</FlowbiteSidebar>
  );
}

function Items({children, ...props}: SidebarItemsProps) {
  return (
    <FlowbiteSidebar.Items {...props}>{children}</FlowbiteSidebar.Items>
  );
}

function ItemGroup({children, ...props}: SidebarItemGroupProps) {
  return (
    <FlowbiteSidebar.ItemGroup {...props}>{children}</FlowbiteSidebar.ItemGroup>
  );
}

function Item({children, ...props}: SidebarItemProps) {
  return (
    <FlowbiteSidebar.Item {...props}>{children}</FlowbiteSidebar.Item>
  );
}

Sidebar.Item = Item;
Sidebar.Items = Items;
Sidebar.ItemGroup = ItemGroup;

export { Sidebar };