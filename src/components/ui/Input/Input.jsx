// src/components/ui/Input/Input.jsx
import styles from './Input.module.css';

/**
 * Input — Text entry field with label, helper text, and validation states.
 *
 * @param {'text'|'email'|'password'|'number'|'search'} type
 * @param {string} label
 * @param {string} placeholder
 * @param {string} helperText
 * @param {'default'|'error'|'success'} state
 * @param {boolean} disabled
 * @param {boolean} required
 * @param {string} id
 */
export function Input({
  type = 'text',
  label = '',
  placeholder = 'Enter value…',
  helperText = '',
  state = 'default',
  disabled = false,
  required = false,
  id,
  value,
  onChange,
  ...rest
}) {
  const inputId = id || `input-${Math.random().toString(36).slice(2, 8)}`;
  const helperId = `${inputId}-helper`;

  return (
    <div className={[styles.wrapper, disabled && styles['wrapper--disabled']].filter(Boolean).join(' ')}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span className={styles.required} aria-hidden="true">*</span>}
        </label>
      )}
      <div className={[styles.inputWrapper, styles[`inputWrapper--${state}`]].join(' ')}>
        <input
          id={inputId}
          type={type}
          className={styles.input}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-describedby={helperText ? helperId : undefined}
          aria-invalid={state === 'error'}
          value={value}
          onChange={onChange}
          {...rest}
        />
        {state === 'error' && (
          <span className={styles.icon} aria-hidden="true">⚠</span>
        )}
        {state === 'success' && (
          <span className={styles.icon} aria-hidden="true">✓</span>
        )}
      </div>
      {helperText && (
        <p id={helperId} className={[styles.helper, styles[`helper--${state}`]].join(' ')} role={state === 'error' ? 'alert' : undefined}>
          {helperText}
        </p>
      )}
    </div>
  );
}
