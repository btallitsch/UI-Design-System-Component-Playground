// src/components/ui/Checkbox/Checkbox.jsx
import styles from './Checkbox.module.css';

/**
 * Checkbox — Accessible checkbox with label and indeterminate support.
 *
 * @param {string} label
 * @param {boolean} checked
 * @param {boolean} indeterminate
 * @param {boolean} disabled
 * @param {function} onChange
 */
export function Checkbox({
  label = 'Checkbox label',
  checked = false,
  indeterminate = false,
  disabled = false,
  onChange,
  id,
  ...rest
}) {
  const checkId = id || `cb-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <label
      className={[styles.wrapper, disabled && styles['wrapper--disabled']].filter(Boolean).join(' ')}
      htmlFor={checkId}
    >
      <span className={styles.control}>
        <input
          id={checkId}
          type="checkbox"
          className={styles.input}
          checked={checked}
          disabled={disabled}
          ref={el => { if (el) el.indeterminate = indeterminate; }}
          onChange={onChange}
          {...rest}
        />
        <span className={styles.box} aria-hidden="true">
          {indeterminate ? '–' : checked ? '✓' : ''}
        </span>
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}
