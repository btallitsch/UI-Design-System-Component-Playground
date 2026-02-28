// src/components/ui/Select/Select.jsx
import styles from './Select.module.css';

/**
 * Select — Native dropdown with styled wrapper.
 *
 * @param {string} label
 * @param {Array<{value, label}>} options
 * @param {string} placeholder
 * @param {boolean} disabled
 * @param {'default'|'error'} state
 * @param {string} helperText
 */
export function Select({
  label = '',
  options = [],
  placeholder = 'Select an option',
  disabled = false,
  state = 'default',
  helperText = '',
  value,
  onChange,
  id,
  ...rest
}) {
  const selectId = id || `select-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <div className={[styles.wrapper, disabled && styles['wrapper--disabled']].filter(Boolean).join(' ')}>
      {label && (
        <label htmlFor={selectId} className={styles.label}>{label}</label>
      )}
      <div className={[styles.selectWrapper, styles[`selectWrapper--${state}`]].join(' ')}>
        <select
          id={selectId}
          className={styles.select}
          disabled={disabled}
          aria-invalid={state === 'error'}
          value={value}
          onChange={onChange}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>{placeholder}</option>
          )}
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <span className={styles.chevron} aria-hidden="true">▾</span>
      </div>
      {helperText && (
        <p className={[styles.helper, styles[`helper--${state}`]].join(' ')}>
          {helperText}
        </p>
      )}
    </div>
  );
}
