import {
  Button as FlowbiteButton,
  ButtonGroup as FlowbiteButtonGroup,
  ButtonGroupProps,
  Spinner,
  type ButtonProps,
  type ButtonTheme,
} from 'flowbite-react';

interface CustomButtonProps extends ButtonProps {
  isProcessing?: boolean;
  menuItem?: boolean; // opt-in for three-dot menu items
}

const menuOutlineTheme: Partial<ButtonTheme> = {
  color: {
    default: 'text-gray-700 border border-gray-300 hover:bg-blue-100 hover:text-gray-700',
    alternative: 'text-gray-700 border border-gray-300 hover:bg-blue-100 hover:text-gray-700',
    light: 'text-gray-700 border border-gray-300 hover:bg-blue-100 hover:text-gray-700',
    blue: 'text-blue-700 border border-blue-700 hover:bg-blue-100 hover:text-gray-700',
    red: 'text-red-700 border border-red-700 hover:bg-blue-100 hover:text-gray-700',
    gray: 'text-gray-700 border border-gray-300 hover:bg-blue-100 hover:text-gray-700',
  },
};

function Button({ children, isProcessing, disabled, menuItem, outline, className, ...props }: CustomButtonProps) {
  const theme = menuItem && outline ? menuOutlineTheme : undefined;

  // Add custom className for menu items
  const customClassName =
    menuItem && outline ? `${className || ''} hover:!bg-blue-100 hover:!text-gray-700`.trim() : className;

  return (
    <FlowbiteButton
      disabled={disabled || isProcessing}
      outline={outline}
      theme={theme}
      className={customClassName}
      {...props}
    >
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
