import {
  Modal as FlowbiteModal,
  ModalBodyProps,
  ModalFooterProps,
  ModalHeaderProps,
  ModalProps as _ModalProps,
} from 'flowbite-react';

interface ModalProps extends _ModalProps {
  show?: boolean;
}

function Modal({ children, show = true, ...props }: ModalProps) {
  return (
    <FlowbiteModal show={show} {...props}>
      {children}
    </FlowbiteModal>
  );
}

function Body({ children, ...props }: ModalBodyProps) {
  return <FlowbiteModal.Body {...props}>{children}</FlowbiteModal.Body>;
}

function Header({ children, ...props }: ModalHeaderProps) {
  return <FlowbiteModal.Header {...props}>{children}</FlowbiteModal.Header>;
}

function Footer({ children, ...props }: ModalFooterProps) {
  return <FlowbiteModal.Footer {...props}>{children}</FlowbiteModal.Footer>;
}

Modal.Body = Body;
Modal.Header = Header;
Modal.Footer = Footer;

export { Modal };
