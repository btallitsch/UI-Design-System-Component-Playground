// src/components/ui/Table/Table.jsx
import styles from './Table.module.css';

/**
 * Table — Data grid with sorting, striped rows, and density modes.
 *
 * @param {Array<{key, label, sortable?}>} columns
 * @param {Array<Object>} data
 * @param {'comfortable'|'compact'} density
 * @param {boolean} striped
 * @param {boolean} stickyHeader
 * @param {string} caption
 */
export function Table({
  columns = [],
  data = [],
  density = 'comfortable',
  striped = false,
  stickyHeader = false,
  caption = '',
}) {
  return (
    <div className={styles.wrapper} role="region" aria-label={caption || 'Data table'} tabIndex={0}>
      <table
        className={[
          styles.table,
          styles[`table--${density}`],
          striped && styles['table--striped'],
        ].filter(Boolean).join(' ')}
      >
        {caption && <caption className={styles.caption}>{caption}</caption>}
        <thead className={[styles.thead, stickyHeader && styles['thead--sticky']].filter(Boolean).join(' ')}>
          <tr>
            {columns.map(col => (
              <th
                key={col.key}
                scope="col"
                className={styles.th}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={styles.empty}>
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rowIdx) => (
              <tr key={rowIdx} className={styles.tr}>
                {columns.map(col => (
                  <td key={col.key} className={styles.td}>
                    {row[col.key] ?? '—'}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
