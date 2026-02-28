// src/components/playground/PropsEditor/PropsEditor.jsx
import styles from './PropsEditor.module.css';

/**
 * PropsEditor — Right-hand panel for live prop manipulation.
 * Renders appropriate controls based on prop type (text, boolean, select).
 */
export function PropsEditor({ config, props, onPropChange, onReset }) {
  if (!config) return null;

  return (
    <aside className={styles.panel} aria-label="Props editor">
      <div className={styles.header}>
        <span className={styles.headerTitle}>Props</span>
        <button className={styles.resetBtn} onClick={onReset} title="Reset to defaults">
          ↺ Reset
        </button>
      </div>

      <div className={styles.body}>
        {config.props.map(field => (
          <PropField
            key={field.key}
            field={field}
            value={props[field.key]}
            onChange={val => onPropChange(field.key, val)}
          />
        ))}
      </div>
    </aside>
  );
}

function PropField({ field, value, onChange }) {
  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel} htmlFor={`prop-${field.key}`}>
        <span>{field.label}</span>
        <span className={styles.fieldType}>{field.type}</span>
      </label>

      {field.type === 'boolean' && (
        <button
          id={`prop-${field.key}`}
          role="switch"
          aria-checked={value}
          className={[styles.toggle, value && styles['toggle--on']].filter(Boolean).join(' ')}
          onClick={() => onChange(!value)}
        >
          <span className={styles.toggleThumb} />
        </button>
      )}

      {field.type === 'text' && (
        <input
          id={`prop-${field.key}`}
          className={styles.textInput}
          type="text"
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          aria-label={field.label}
        />
      )}

      {field.type === 'select' && (
        <select
          id={`prop-${field.key}`}
          className={styles.select}
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          aria-label={field.label}
        >
          {field.options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      )}

      {field.description && (
        <p className={styles.fieldDesc}>{field.description}</p>
      )}
    </div>
  );
}
