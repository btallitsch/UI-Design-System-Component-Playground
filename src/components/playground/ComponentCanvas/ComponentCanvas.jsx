// src/components/playground/ComponentCanvas/ComponentCanvas.jsx
import styles from './ComponentCanvas.module.css';

/**
 * ComponentCanvas — The live preview stage for a rendered component.
 * Displays the component centered with a subtle dot-grid background.
 */
export function ComponentCanvas({ children, label = 'Preview' }) {
  return (
    <section className={styles.canvas} aria-label={`Live preview: ${label}`}>
      <div className={styles.badge}>
        <span className={styles.badgeDot} aria-hidden="true" />
        Live Preview
      </div>
      <div className={styles.stage}>
        {children}
      </div>
    </section>
  );
}
