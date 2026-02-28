// src/utils/generateCode.js

/**
 * Generates a JSX code snippet string from a component name and its current props.
 * Handles booleans, strings, numbers, and functions gracefully.
 */
export function generateCode(componentName, props, config) {
  const lines = [];
  const propStrings = [];

  for (const [key, value] of Object.entries(props)) {
    const field = config?.find(c => c.key === key);

    // Skip internal/callback props from snippet
    if (field?.type === 'callback') {
      propStrings.push(`  ${key}={() => console.log('${key} fired')}`);
      continue;
    }

    if (typeof value === 'boolean') {
      if (value) propStrings.push(`  ${key}`);
      // false booleans are omitted (React default)
    } else if (typeof value === 'number') {
      propStrings.push(`  ${key}={${value}}`);
    } else if (typeof value === 'string' && value !== '') {
      propStrings.push(`  ${key}="${value}"`);
    }
  }

  const propsBlock =
    propStrings.length > 0 ? '\n' + propStrings.join('\n') + '\n' : '';

  // Determine if component is self-closing or has children
  const childrenProp = props.children;
  if (childrenProp) {
    lines.push(`<${componentName}${propsBlock}>`);
    lines.push(`  ${childrenProp}`);
    lines.push(`</${componentName}>`);
  } else {
    lines.push(`<${componentName}${propsBlock}/>`);
  }

  return lines.join('\n');
}
