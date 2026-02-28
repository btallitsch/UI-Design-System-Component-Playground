// src/components/playground/Header/Header.jsx
import { useTheme } from '../../../context/ThemeContext';
import styles from './Header.module.css';

export function Header({ activeComponent }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className={styles.header} role="banner">
      <div className={styles.left}>
        <div className={styles.logoMark} aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="currentColor">
            <rect x="1" y="1" width="6" height="6" rx="1.5" />
            <rect x="9" y="1" width="6" height="6" rx="1.5" />
            <rect x="1" y="9" width="6" height="6" rx="1.5" />
            <rect x="9" y="9" width="6" height="6" rx="1.5" />
          </svg>
        </div>
        <span className={styles.logoName}>DS<span className={styles.logoAccent}>•</span>Playground</span>
        <span className={styles.version}>v1.0.0</span>
      </div>

      <div className={styles.center}>
        {activeComponent && (
          <nav aria-label="breadcrumb">
            <ol className={styles.breadcrumb}>
              <li className={styles.breadcrumbItem}>Components</li>
              <li className={styles.breadcrumbSep} aria-hidden="true">/</li>
              <li className={styles.breadcrumbItem} aria-current="page">{activeComponent}</li>
            </ol>
          </nav>
        )}
      </div>

      <div className={styles.right}>
        <button
          className={styles.themeBtn}
          onClick={toggleTheme}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
          title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          {isDark ? (
            <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 1.78a1 1 0 011.415 1.415l-.707.707a1 1 0 11-1.414-1.414l.707-.708zm-9.85.001l.708.707A1 1 0 015.664 5.9l-.708-.707a1 1 0 011.415-1.414zM10 5a5 5 0 100 10A5 5 0 0010 5zm8 4a1 1 0 110 2h-1a1 1 0 110-2h1zM3 9a1 1 0 110 2H2a1 1 0 110-2h1zm13.95 4.95a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 011.414-1.414l.707.707zM5.664 14.1a1 1 0 01-1.415 1.414l-.707-.707a1 1 0 011.414-1.414l.708.707zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z" />
            </svg>
          ) : (
            <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>

        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ghLink}
          aria-label="View on GitHub"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
      </div>
    </header>
  );
}
