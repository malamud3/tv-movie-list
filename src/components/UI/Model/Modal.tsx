import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = dialog.current;
    if (!modal) return;

    if (!modal.open) {
      requestAnimationFrame(() => {
        modal.showModal();
      });
    }

    return () => {
      if (modal.open) modal.close();
    };
  }, []);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal') as HTMLElement
  );
}
