// src/components/ui/Badge/Badge.jsx
import styles from './Badge.module.css';

/**
 * Badge — Status and label indicator.
 *
 * @param {'default'|'success'|'warning'|'danger'|'info'} variant
 * @param {'sm'|'md'} size
 * @param {boolean} dot - Show status dot
 * @param {React.ReactNode} children
 */
export function Badge({
  variant = 'default',
  size = 'md',
  dot = false,
  children = 'Badge',
}) {
  return (
    <span
      className={[styles.badge, styles[`badge--${variant}`], styles[`badge--${size}`]].join(' ')}
      role="status"
    >
      {dot && <span className={styles.dot} aria-hidden="true" />}
      {children}
    </span>
  );
}
