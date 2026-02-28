// src/components/playground/AccessibilityPanel/AccessibilityPanel.jsx
import styles from './AccessibilityPanel.module.css';

/**
 * AccessibilityPanel — Displays WCAG notes and best practices for each component.
 */
export function AccessibilityPanel({ notes = [] }) {
  if (!notes.length) return null;

  return (
    <section className={styles.panel} aria-labelledby="a11y-heading">
      <h3 id="a11y-heading" className={styles.title}>
        <span className={styles.icon} aria-hidden="true">♿</span>
        Accessibility
      </h3>
      <ul className={styles.list} role="list">
        {notes.map(({ rule, note }) => (
          <li key={rule} className={styles.item}>
            <span className={styles.rule}>{rule}</span>
            <span className={styles.note}>{note}</span>
          </li>
        ))}
      </ul>
      <p className={styles.footer}>
        Targets WCAG 2.1 Level AA compliance.
      </p>
    </section>
  );
}
