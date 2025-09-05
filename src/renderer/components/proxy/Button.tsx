import {
  Button as FlowbiteButton,
  ButtonGroup as FlowbiteButtonGroup,
  ButtonGroupProps,
  ButtonProps,
  Spinner,
} from 'flowbite-react';

interface CustomButtonProps extends ButtonProps {
  isProcessing?: boolean;
}

function Button({ children, isProcessing, disabled, ...props }: CustomButtonProps) {
  return (
    <FlowbiteButton disabled={disabled || isProcessing} {...props}>
      {isProcessing && <Spinner size="sm" className="mr-2" />}
      {children}
    </FlowbiteButton>
  );
}

function Group({ children, ...props }: ButtonGroupProps) {
  return <FlowbiteButtonGroup {...props}>{children}</FlowbiteButtonGroup>;
}

Button.Group = Group;

export { Button };
