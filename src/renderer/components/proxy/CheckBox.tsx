import { Checkbox as FlowbiteCheckBox, CheckboxProps } from 'flowbite-react';

function CheckBox({ children, ...props }: CheckboxProps) {
  return <FlowbiteCheckBox {...props}>{children}</FlowbiteCheckBox>;
}

export { CheckBox };
