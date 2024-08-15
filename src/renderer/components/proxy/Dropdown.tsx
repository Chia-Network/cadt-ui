import { Dropdown as FlowbiteDropDown, DropdownItemProps, DropdownProps } from 'flowbite-react';

function Dropdown({ children, ...props }: DropdownProps) {
  return <FlowbiteDropDown {...props}>{children}</FlowbiteDropDown>;
}

function Item({ children, ...props }: DropdownItemProps) {
  return <FlowbiteDropDown.Item {...props}>{children}</FlowbiteDropDown.Item>;
}

Dropdown.Item = Item;

export { Dropdown };
