import {
  Modal as FlowbiteModal,
  ModalBody as FlowbiteModalBody,
  ModalFooter as FlowbiteModalFooter,
  ModalHeader as FlowbiteModalHeader,
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
  return <FlowbiteModalBody {...props}>{children}</FlowbiteModalBody>;
}

function Header({ children, ...props }: ModalHeaderProps) {
  return <FlowbiteModalHeader {...props}>{children}</FlowbiteModalHeader>;
}

function Footer({ children, ...props }: ModalFooterProps) {
  return <FlowbiteModalFooter {...props}>{children}</FlowbiteModalFooter>;
}

Modal.Body = Body;
Modal.Header = Header;
Modal.Footer = Footer;

export { Modal };
