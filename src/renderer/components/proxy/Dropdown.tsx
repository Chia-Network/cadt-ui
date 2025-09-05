import {
  Dropdown as FlowbiteDropDown,
  DropdownItem as FlowbiteDropdownItem,
  DropdownItemProps,
  DropdownProps,
} from 'flowbite-react';

function Dropdown({ children, ...props }: DropdownProps) {
  return <FlowbiteDropDown {...props}>{children}</FlowbiteDropDown>;
}

function Item({ children, ...props }: DropdownItemProps) {
  return <FlowbiteDropdownItem {...props}>{children}</FlowbiteDropdownItem>;
}

Dropdown.Item = Item;

export { Dropdown };
