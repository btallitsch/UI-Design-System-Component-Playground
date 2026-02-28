// src/components/playground/Sidebar/Sidebar.jsx
import { componentRegistry } from '../../../config/componentConfigs';
import styles from './Sidebar.module.css';

export function Sidebar({ activeId, onNavigate }) {
  // Group components
  const groups = componentRegistry.reduce((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {});

  return (
    <aside className={styles.sidebar} aria-label="Component navigation">
      <nav>
        {Object.entries(groups).map(([group, items]) => (
          <div key={group} className={styles.group}>
            <p className={styles.groupLabel}>{group}</p>
            <ul role="list">
              {items.map(item => (
                <li key={item.id}>
                  <button
                    className={[
                      styles.navItem,
                      activeId === item.id && styles['navItem--active'],
                    ].filter(Boolean).join(' ')}
                    onClick={() => onNavigate(item.id)}
                    aria-current={activeId === item.id ? 'page' : undefined}
                  >
                    <span className={styles.navIcon} aria-hidden="true">{item.icon}</span>
                    <span className={styles.navLabel}>{item.label}</span>
                    {activeId === item.id && (
                      <span className={styles.activePip} aria-hidden="true" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className={styles.footer}>
        <p className={styles.footerText}>7 Components</p>
        <p className={styles.footerText}>WCAG 2.1 AA</p>
      </div>
    </aside>
  );
}
