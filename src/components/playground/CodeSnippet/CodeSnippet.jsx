// src/components/playground/CodeSnippet/CodeSnippet.jsx
import { useState } from 'react';
import styles from './CodeSnippet.module.css';

/**
 * CodeSnippet — Displays a JSX code string with syntax tokens and copy button.
 */
export function CodeSnippet({ code = '', importLine = '' }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(`${importLine}\n\n${code}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <div className={styles.dots} aria-hidden="true">
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
        <span className={styles.filename}>component.jsx</span>
        <button
          className={[styles.copyBtn, copied && styles['copyBtn--copied']].filter(Boolean).join(' ')}
          onClick={handleCopy}
          aria-label={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? '✓ Copied' : '⎘ Copy'}
        </button>
      </div>

      <pre className={styles.pre}>
        <code>
          <TokenizedCode code={`${importLine}\n\n${code}`} />
        </code>
      </pre>
    </div>
  );
}

/**
 * Simple JSX tokenizer for syntax highlighting.
 * No dependencies required.
 */
function TokenizedCode({ code }) {
  const lines = code.split('\n');

  return (
    <>
      {lines.map((line, i) => (
        <div key={i} className={styles.line}>
          <span className={styles.lineNum}>{i + 1}</span>
          <span dangerouslySetInnerHTML={{ __html: tokenize(line) }} />
        </div>
      ))}
    </>
  );
}

function tokenize(line) {
  return line
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // JSX tags
    .replace(/(&lt;\/?)([\w.]+)/g, '<span class="tok-tag">$1<span class="tok-name">$2</span></span>')
    // Props (key=)
    .replace(/\s([\w]+)(=)/g, ' <span class="tok-prop">$1</span>$2')
    // Strings in quotes
    .replace(/"([^"]*)"/g, '"<span class="tok-string">$1</span>"')
    // {  booleans / expressions }
    .replace(/(\{)([^{}]*)(\})/g, '<span class="tok-brace">$1</span><span class="tok-expr">$2</span><span class="tok-brace">$3</span>')
    // import/export keywords
    .replace(/\b(import|export|from|const|let|var|function|return|default)\b/g, '<span class="tok-kw">$1</span>');
}
