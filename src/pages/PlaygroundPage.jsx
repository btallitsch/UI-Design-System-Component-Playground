// src/pages/PlaygroundPage.jsx
// Generic layout shell for any component's documentation page.

import { ComponentCanvas } from '../components/playground/ComponentCanvas/ComponentCanvas';
import { CodeSnippet }     from '../components/playground/CodeSnippet/CodeSnippet';
import { AccessibilityPanel } from '../components/playground/AccessibilityPanel/AccessibilityPanel';
import { generateCode }    from '../utils/generateCode';
import styles from './PlaygroundPage.module.css';

/**
 * PlaygroundPage — The documentation + live preview layout for a component.
 *
 * @param {Object} config - Component config from componentConfigs.js
 * @param {Object} liveProps - Current editable props state
 * @param {React.ReactNode} preview - The rendered component with live props
 * @param {React.ReactNode} variants - Optional variant showcase
 */
export function PlaygroundPage({ config, liveProps, preview, variants }) {
  const code = generateCode(config.name, liveProps, config.props);

  return (
    <div className={styles.page}>
      {/* ---- Component header ---- */}
      <header className={styles.header}>
        <h1 className={styles.title}>{config.name}</h1>
        <p className={styles.desc}>{config.description}</p>
        <div className={styles.meta}>
          <code className={styles.importLine}>{config.importLine}</code>
        </div>
      </header>

      {/* ---- Live playground ---- */}
      <section aria-label="Live playground">
        <h2 className={styles.sectionLabel}>
          <span>Playground</span>
          <span className={styles.sectionTag}>interactive</span>
        </h2>
        <ComponentCanvas label={config.name}>
          {preview}
        </ComponentCanvas>
      </section>

      {/* ---- Code output ---- */}
      <section aria-label="Code output">
        <h2 className={styles.sectionLabel}>
          <span>Code</span>
          <span className={styles.sectionTag}>generated</span>
        </h2>
        <CodeSnippet code={code} importLine={config.importLine} />
      </section>

      {/* ---- Variants ---- */}
      {variants && (
        <section aria-label="Component variants">
          <h2 className={styles.sectionLabel}>
            <span>Variants</span>
            <span className={styles.sectionTag}>all states</span>
          </h2>
          <div className={styles.variantsGrid}>
            {variants}
          </div>
        </section>
      )}

      {/* ---- Accessibility ---- */}
      <section aria-label="Accessibility guidelines">
        <h2 className={styles.sectionLabel}>
          <span>Accessibility</span>
          <span className={styles.sectionTag}>WCAG 2.1 AA</span>
        </h2>
        <AccessibilityPanel notes={config.accessibility} />
      </section>
    </div>
  );
}
