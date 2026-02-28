// src/config/componentConfigs.js
// Each config drives: PropsEditor controls, default props, and accessibility notes.

export const buttonConfig = {
  id: 'button',
  name: 'Button',
  description: 'The primary interactive element for triggering actions.',
  importLine: `import { Button } from '@/components/ui/Button/Button';`,
  defaultProps: {
    children: 'Click me',
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
  },
  props: [
    {
      key: 'children',
      label: 'Label',
      type: 'text',
      description: 'The visible text content of the button.',
    },
    {
      key: 'variant',
      label: 'Variant',
      type: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Visual style of the button.',
    },
    {
      key: 'size',
      label: 'Size',
      type: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Controls the height and padding.',
    },
    {
      key: 'disabled',
      label: 'Disabled',
      type: 'boolean',
      description: 'Prevents interaction and dims the button.',
    },
    {
      key: 'loading',
      label: 'Loading',
      type: 'boolean',
      description: 'Shows a spinner and sets aria-busy.',
    },
    {
      key: 'fullWidth',
      label: 'Full Width',
      type: 'boolean',
      description: 'Stretches button to fill its container.',
    },
  ],
  accessibility: [
    { rule: 'Role', note: 'Uses native <button> — role="button" is implicit.' },
    { rule: 'Keyboard', note: 'Activatable with Enter and Space keys natively.' },
    { rule: 'Disabled', note: 'aria-disabled is set; pointer-events removed via CSS.' },
    { rule: 'Loading', note: 'aria-busy="true" is set when loading=true.' },
    { rule: 'Focus', note: 'Custom :focus-visible ring — never remove default outlines without replacing them.' },
    { rule: 'Color', note: 'Danger and primary variants maintain 4.5:1 contrast ratio on both themes.' },
  ],
};

export const inputConfig = {
  id: 'input',
  name: 'Input',
  description: 'Single-line text entry with label, states, and helper messaging.',
  importLine: `import { Input } from '@/components/ui/Input/Input';`,
  defaultProps: {
    label: 'Email address',
    placeholder: 'you@example.com',
    type: 'text',
    state: 'default',
    helperText: '',
    disabled: false,
    required: false,
  },
  props: [
    { key: 'label', label: 'Label', type: 'text', description: 'Visible label linked via htmlFor.' },
    { key: 'placeholder', label: 'Placeholder', type: 'text', description: 'Hint text when the field is empty.' },
    {
      key: 'type',
      label: 'Type',
      type: 'select',
      options: ['text', 'email', 'password', 'number', 'search'],
      description: 'HTML input type attribute.',
    },
    {
      key: 'state',
      label: 'State',
      type: 'select',
      options: ['default', 'error', 'success'],
      description: 'Validation state changes border color and icon.',
    },
    { key: 'helperText', label: 'Helper Text', type: 'text', description: 'Contextual message below the input.' },
    { key: 'disabled', label: 'Disabled', type: 'boolean', description: 'Prevents user input.' },
    { key: 'required', label: 'Required', type: 'boolean', description: 'Shows asterisk and sets required attribute.' },
  ],
  accessibility: [
    { rule: 'Label', note: 'Every input must have a visible <label> linked via htmlFor / id pairing.' },
    { rule: 'Error', note: 'Error state sets aria-invalid="true" and error message uses role="alert".' },
    { rule: 'Helper Text', note: 'Linked to input via aria-describedby for screen reader announcement.' },
    { rule: 'Required', note: 'required attribute set natively; asterisk is aria-hidden.' },
    { rule: 'Placeholder', note: 'Never use placeholder as the only label — it disappears on input.' },
    { rule: 'Color', note: 'Validation states never rely on color alone — icons are also present.' },
  ],
};

export const badgeConfig = {
  id: 'badge',
  name: 'Badge',
  description: 'Compact status and label indicator for metadata display.',
  importLine: `import { Badge } from '@/components/ui/Badge/Badge';`,
  defaultProps: {
    children: 'Status',
    variant: 'default',
    size: 'md',
    dot: false,
  },
  props: [
    { key: 'children', label: 'Label', type: 'text', description: 'Text content of the badge.' },
    {
      key: 'variant',
      label: 'Variant',
      type: 'select',
      options: ['default', 'success', 'warning', 'danger', 'info'],
      description: 'Semantic color and meaning.',
    },
    {
      key: 'size',
      label: 'Size',
      type: 'select',
      options: ['sm', 'md'],
      description: 'Controls padding and font size.',
    },
    { key: 'dot', label: 'Show Dot', type: 'boolean', description: 'Animated status indicator dot.' },
  ],
  accessibility: [
    { rule: 'Role', note: 'Uses role="status" for non-critical live updates.' },
    { rule: 'Color', note: 'Semantic meaning is communicated via both color AND text label — never color alone.' },
    { rule: 'Animation', note: 'The pulsing dot uses CSS animation; respects prefers-reduced-motion.' },
    { rule: 'Contrast', note: 'All badge variants meet WCAG AA 4.5:1 text contrast in both themes.' },
  ],
};

export const modalConfig = {
  id: 'modal',
  name: 'Modal',
  description: 'An accessible dialog that traps focus and blocks page interaction.',
  importLine: `import { Modal } from '@/components/ui/Modal/Modal';`,
  defaultProps: {
    title: 'Confirm Action',
    size: 'md',
    showCloseButton: true,
  },
  props: [
    { key: 'title', label: 'Title', type: 'text', description: 'The dialog heading, linked to aria-labelledby.' },
    {
      key: 'size',
      label: 'Size',
      type: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Controls the max-width of the dialog.',
    },
    { key: 'showCloseButton', label: 'Close Button', type: 'boolean', description: 'Shows ✕ button in the header.' },
  ],
  accessibility: [
    { rule: 'Role', note: 'Uses role="dialog" and aria-modal="true" to inform AT it is a modal context.' },
    { rule: 'Focus Trap', note: 'Tab and Shift+Tab cycle only within the modal while open.' },
    { rule: 'Escape', note: 'Pressing Escape fires the onClose handler to dismiss.' },
    { rule: 'Labelling', note: 'Dialog title is connected via aria-labelledby for screen reader announcement.' },
    { rule: 'Backdrop click', note: 'Clicking the overlay dismisses the modal — a standard UX expectation.' },
    { rule: 'Scroll lock', note: 'Body scroll is locked while open to prevent background content confusion.' },
  ],
};

export const tableConfig = {
  id: 'table',
  name: 'Table',
  description: 'Accessible data grid for structured tabular information.',
  importLine: `import { Table } from '@/components/ui/Table/Table';`,
  defaultProps: {
    density: 'comfortable',
    striped: false,
    stickyHeader: false,
    caption: '',
  },
  props: [
    {
      key: 'density',
      label: 'Density',
      type: 'select',
      options: ['comfortable', 'compact'],
      description: 'Controls row padding.',
    },
    { key: 'striped', label: 'Striped', type: 'boolean', description: 'Alternating row background colors.' },
    { key: 'stickyHeader', label: 'Sticky Header', type: 'boolean', description: 'Header stays visible on scroll.' },
    { key: 'caption', label: 'Caption', type: 'text', description: 'Accessible summary of the table content.' },
  ],
  accessibility: [
    { rule: 'Markup', note: 'Uses proper <table>, <thead>, <tbody>, <th scope="col">, <td> elements.' },
    { rule: 'Caption', note: 'Provide a <caption> to give screen readers an overview of the table.' },
    { rule: 'Scope', note: 'th elements use scope="col" to associate headers with data columns.' },
    { rule: 'Region', note: 'Wrapper uses role="region" + aria-label for scrollable table navigation.' },
    { rule: 'Empty state', note: 'Empty state uses colspan and meaningful text, not just visual whitespace.' },
    { rule: 'Keyboard', note: 'Wrapper is focusable (tabIndex=0) to enable keyboard scrolling of overflow tables.' },
  ],
};

// Registry of all components for navigation
export const componentRegistry = [
  { id: 'overview', label: 'Overview', icon: '⬡', group: 'Introduction' },
  { id: 'button',   label: 'Button',   icon: '◻', group: 'Components' },
  { id: 'input',    label: 'Input',    icon: '▭', group: 'Components' },
  { id: 'select',   label: 'Select',   icon: '▾', group: 'Components' },
  { id: 'checkbox', label: 'Checkbox', icon: '☑', group: 'Components' },
  { id: 'badge',    label: 'Badge',    icon: '◉', group: 'Components' },
  { id: 'modal',    label: 'Modal',    icon: '⬜', group: 'Components' },
  { id: 'table',    label: 'Table',    icon: '⊞', group: 'Components' },
  { id: 'tokens',   label: 'Tokens',   icon: '◈', group: 'Foundation' },
];
