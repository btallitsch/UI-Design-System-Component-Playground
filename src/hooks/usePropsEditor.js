// src/hooks/usePropsEditor.js
import { useState, useCallback } from 'react';

/**
 * Manages the live editable props state for the playground.
 * @param {Object} initialProps - Default prop values from a component config.
 */
export function usePropsEditor(initialProps = {}) {
  const [props, setProps] = useState(initialProps);

  const setProp = useCallback((key, value) => {
    setProps(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetProps = useCallback(() => {
    setProps(initialProps);
  }, [initialProps]);

  return { props, setProp, resetProps };
}
