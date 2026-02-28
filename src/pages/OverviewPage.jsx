// src/pages/OverviewPage.jsx
import styles from './OverviewPage.module.css';

const stats = [
  { value: '7',        label: 'Components' },
  { value: 'WCAG AA', label: 'Compliance' },
  { value: 'Dark+',   label: 'Theme modes' },
  { value: '0',       label: 'Dependencies' },
];

const features = [
  { icon: '◈', title: 'Design Tokens', desc: 'All values live in CSS custom properties — color, spacing, typography, motion, and shadow, all in one source of truth.' },
  { icon: '♿', title: 'Accessibility First', desc: 'Every component ships with correct ARIA roles, focus management, keyboard navigation, and WCAG 2.1 AA contrast.' },
  { icon: '⚡', title: 'Live Props Editor', desc: 'Edit any component prop in real time from the right-hand panel and see the change instantly — no refresh needed.' },
  { icon: '◻', title: 'Code Generation', desc: 'The live JSX snippet updates as you edit props, so you can copy production-ready code directly from the playground.' },
  { icon: '☽', title: 'Dark / Light Mode', desc: 'Full theme support with semantic token overrides. Switch with the button in the header and watch every surface update.' },
  { icon: '⊞', title: 'CSS Modules', desc: 'Each component has a scoped CSS module — no global side-effects, easy to override, and zero runtime overhead.' },
];

export function OverviewPage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroBadge}>UI Design System</div>
        <h1 className={styles.heroTitle}>
          Build with<br />
          <span className={styles.heroAccent}>confidence.</span>
        </h1>
        <p className={styles.heroSubtitle}>
          A production-ready component library with live editing, accessibility documentation, and code generation. Built with React, CSS Modules, and zero external dependencies.
        </p>

        <div className={styles.stats}>
          {stats.map(s => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {features.map(f => (
          <div key={f.title} className={styles.card}>
            <span className={styles.cardIcon} aria-hidden="true">{f.icon}</span>
            <h3 className={styles.cardTitle}>{f.title}</h3>
            <p className={styles.cardDesc}>{f.desc}</p>
          </div>
        ))}
      </div>

      <div className={styles.stack}>
        <h2 className={styles.stackTitle}>Tech Stack</h2>
        <div className={styles.stackTags}>
          {['React 18', 'Vite 5', 'CSS Modules', 'CSS Custom Properties', 'No UI libraries', 'WCAG 2.1 AA'].map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
