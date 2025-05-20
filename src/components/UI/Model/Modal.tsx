import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

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
    <dialog className={styles.modal} ref={dialog} onClose={onClose}>
      <button
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Close Modal"
      >
        &times;
      </button>
      <div className={styles.modalContent}>{children}</div>
    </dialog>,
    document.getElementById('modal') as HTMLElement
  );
}
