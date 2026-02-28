// src/components/ui/Button/Button.jsx
import styles from './Button.module.css';

/**
 * Button — Core interactive element.
 *
 * @param {'primary'|'secondary'|'ghost'|'danger'} variant
 * @param {'sm'|'md'|'lg'} size
 * @param {boolean} disabled
 * @param {boolean} loading
 * @param {boolean} fullWidth
 * @param {string} leftIcon - SVG string or emoji for left icon slot
 * @param {React.ReactNode} children
 * @param {function} onClick
 */
export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  children = 'Button',
  onClick,
  type = 'button',
  ...rest
}) {
  const classes = [
    styles.btn,
    styles[`btn--${variant}`],
    styles[`btn--${size}`],
    loading && styles['btn--loading'],
    fullWidth && styles['btn--full'],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      {...rest}
    >
      {loading && (
        <span className={styles.spinner} aria-hidden="true" />
      )}
      <span className={styles.label}>{children}</span>
    </button>
  );
}
