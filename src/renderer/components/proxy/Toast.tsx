import { Toast as FlowbiteToast, ToastProps } from 'flowbite-react';

function Toast({ children, ...props }: ToastProps) {
  return <FlowbiteToast {...props}>{children}</FlowbiteToast>;
}

export { Toast };
