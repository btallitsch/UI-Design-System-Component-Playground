// src/pages/TokensPage.jsx
import styles from './TokensPage.module.css';

const colorTokens = [
  { name: '--bg-page',        desc: 'Page background' },
  { name: '--bg-surface',     desc: 'Cards, panels' },
  { name: '--bg-elevated',    desc: 'Dropdowns, code blocks' },
  { name: '--border-color',   desc: 'Default borders' },
  { name: '--accent',         desc: 'Brand accent / interactive' },
  { name: '--text-primary',   desc: 'Primary text' },
  { name: '--text-secondary', desc: 'Secondary text' },
  { name: '--text-muted',     desc: 'Muted / hint text' },
  { name: '--color-success',  desc: 'Success state' },
  { name: '--color-warning',  desc: 'Warning state' },
  { name: '--color-danger',   desc: 'Error / danger state' },
  { name: '--color-info',     desc: 'Informational' },
];

const spacingTokens = [
  '--sp-1', '--sp-2', '--sp-3', '--sp-4',
  '--sp-5', '--sp-6', '--sp-8', '--sp-10', '--sp-12', '--sp-16',
];

const radiusTokens = [
  { name: '--radius-xs', label: '3px' },
  { name: '--radius-sm', label: '6px' },
  { name: '--radius-md', label: '10px' },
  { name: '--radius-lg', label: '14px' },
  { name: '--radius-xl', label: '20px' },
  { name: '--radius-pill', label: '999px' },
];

export function TokensPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Design Tokens</h1>
        <p className={styles.desc}>
          All visual values in this system are defined as CSS custom properties in <code>src/styles/tokens.css</code>. Changing a token value updates every component that references it.
        </p>
      </header>

      <section>
        <h2 className={styles.sectionTitle}>Color Tokens</h2>
        <div className={styles.colorGrid}>
          {colorTokens.map(t => (
            <div key={t.name} className={styles.colorSwatch}>
              <div
                className={styles.swatchBox}
                style={{ background: `var(${t.name})` }}
                aria-hidden="true"
              />
              <div className={styles.swatchMeta}>
                <code className={styles.tokenName}>{t.name}</code>
                <span className={styles.tokenDesc}>{t.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className={styles.sectionTitle}>Spacing Scale</h2>
        <div className={styles.spacingList}>
          {spacingTokens.map(t => (
            <div key={t} className={styles.spacingItem}>
              <div
                className={styles.spacingBar}
                style={{ width: `var(${t})`, minWidth: 4, height: 16, background: 'var(--accent-muted)', border: '1px solid var(--accent)' }}
                aria-hidden="true"
              />
              <code className={styles.tokenName}>{t}</code>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className={styles.sectionTitle}>Border Radius</h2>
        <div className={styles.radiusRow}>
          {radiusTokens.map(r => (
            <div key={r.name} className={styles.radiusItem}>
              <div
                className={styles.radiusBox}
                style={{ borderRadius: `var(${r.name})` }}
                aria-hidden="true"
              />
              <code className={styles.tokenName}>{r.name}</code>
              <span className={styles.tokenDesc}>{r.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className={styles.sectionTitle}>Typography</h2>
        <div className={styles.typeStack}>
          {[
            { label: '3xl — 44px', size: 'var(--text-3xl)', text: 'Display Heading' },
            { label: '2xl — 32px', size: 'var(--text-2xl)', text: 'Page Title' },
            { label: 'xl  — 24px', size: 'var(--text-xl)',  text: 'Section Header' },
            { label: 'lg  — 20px', size: 'var(--text-lg)',  text: 'Subsection' },
            { label: 'base — 15px',size: 'var(--text-base)','text': 'Body text for paragraphs and descriptions' },
            { label: 'sm  — 13px', size: 'var(--text-sm)',  text: 'UI labels and secondary text' },
            { label: 'xs  — 11px', size: 'var(--text-xs)',  text: 'Captions, tags, badges' },
          ].map(row => (
            <div key={row.label} className={styles.typeRow}>
              <code className={styles.typeLabel}>{row.label}</code>
              <span style={{ fontSize: row.size, fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>
                {row.text}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
