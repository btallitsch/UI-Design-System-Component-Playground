// src/components/ui/Modal/Modal.jsx
import { useEffect, useRef } from 'react';
import styles from './Modal.module.css';

/**
 * Modal — Accessible dialog overlay.
 *
 * @param {boolean} open
 * @param {function} onClose
 * @param {'sm'|'md'|'lg'} size
 * @param {string} title
 * @param {boolean} showCloseButton
 * @param {React.ReactNode} children
 * @param {React.ReactNode} footer
 */
export function Modal({
  open = false,
  onClose,
  size = 'md',
  title = 'Dialog Title',
  showCloseButton = true,
  children,
  footer,
}) {
  const dialogRef = useRef(null);
  const titleId = useRef(`modal-title-${Math.random().toString(36).slice(2, 8)}`).current;

  // Focus trap & keyboard handling
  useEffect(() => {
    if (!open) return;

    const el = dialogRef.current;
    if (!el) return;

    const focusable = el.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    function handleKeyDown(e) {
      if (e.key === 'Escape') { onClose?.(); return; }
      if (e.key !== 'Tab') return;
      if (focusable.length === 0) { e.preventDefault(); return; }
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className={styles.overlay}
      onClick={e => { if (e.target === e.currentTarget) onClose?.(); }}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={[styles.modal, styles[`modal--${size}`]].join(' ')}
      >
        <div className={styles.header}>
          <h2 id={titleId} className={styles.title}>{title}</h2>
          {showCloseButton && (
            <button
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close dialog"
            >
              ✕
            </button>
          )}
        </div>

        {children && (
          <div className={styles.body}>{children}</div>
        )}

        {footer && (
          <div className={styles.footer}>{footer}</div>
        )}
      </div>
    </div>
  );
}
