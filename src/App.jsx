// src/App.jsx
// Architecture: Single props state at App level, shared between PropsEditor and page preview.
// Switching component pages resets props to that component's defaults.

import { useState, useCallback, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header }      from './components/playground/Header/Header';
import { Sidebar }     from './components/playground/Sidebar/Sidebar';
import { PropsEditor } from './components/playground/PropsEditor/PropsEditor';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { OverviewPage }   from './pages/OverviewPage';
import { TokensPage }     from './pages/TokensPage';

import { buttonConfig, modalConfig, inputConfig, badgeConfig, tableConfig } from './config/componentConfigs';
import { Button }   from './components/ui/Button/Button';
import { Input }    from './components/ui/Input/Input';
import { Badge }    from './components/ui/Badge/Badge';
import { Table }    from './components/ui/Table/Table';
import { Modal }    from './components/ui/Modal/Modal';
import { Select }   from './components/ui/Select/Select';
import { Checkbox } from './components/ui/Checkbox/Checkbox';

import styles from './App.module.css';

// ---- Configs for components without a dedicated page file ----
const selectConfig = {
  id: 'select', name: 'Select',
  description: 'A styled native dropdown for choosing from a list of options.',
  importLine: `import { Select } from '@/components/ui/Select/Select';`,
  defaultProps: { label: 'Framework', placeholder: 'Choose one…', state: 'default', disabled: false, helperText: '' },
  props: [
    { key: 'label',       label: 'Label',       type: 'text',   description: 'Visible label above the dropdown.' },
    { key: 'placeholder', label: 'Placeholder', type: 'text',   description: 'Default empty option text.' },
    { key: 'state',       label: 'State',       type: 'select', options: ['default', 'error'], description: 'Validation state.' },
    { key: 'helperText',  label: 'Helper Text', type: 'text',   description: 'Message below the dropdown.' },
    { key: 'disabled',    label: 'Disabled',    type: 'boolean', description: 'Prevents selection.' },
  ],
  accessibility: [
    { rule: 'Label',    note: 'Visible label linked to select via htmlFor / id.' },
    { rule: 'Native',   note: 'Uses native <select> for full keyboard & AT support out of the box.' },
    { rule: 'Keyboard', note: 'Arrow keys, Enter, and Space work natively in all browsers.' },
  ],
};

const checkboxConfig = {
  id: 'checkbox', name: 'Checkbox',
  description: 'An accessible binary toggle for boolean form inputs.',
  importLine: `import { Checkbox } from '@/components/ui/Checkbox/Checkbox';`,
  defaultProps: { label: 'Accept terms and conditions', checked: false, disabled: false, indeterminate: false },
  props: [
    { key: 'label',         label: 'Label',         type: 'text',    description: 'Visible text next to the checkbox.' },
    { key: 'checked',       label: 'Checked',       type: 'boolean', description: 'Controlled checked state.' },
    { key: 'disabled',      label: 'Disabled',      type: 'boolean', description: 'Prevents toggling.' },
    { key: 'indeterminate', label: 'Indeterminate', type: 'boolean', description: 'Partial selection state.' },
  ],
  accessibility: [
    { rule: 'Labelling', note: 'Visible label linked to input via htmlFor.' },
    { rule: 'Keyboard',  note: 'Space bar toggles the checkbox natively.' },
    { rule: 'State',     note: 'Indeterminate set via DOM property, not HTML attribute.' },
  ],
};

// ---- Sample data for Table ----
const TABLE_COLS = [
  { key: 'name', label: 'Component' }, { key: 'status', label: 'Status' },
  { key: 'version', label: 'Version' }, { key: 'a11y', label: 'A11y' },
];
const makeTableData = () => [
  { name: 'Button',   status: <Badge variant="success" dot>Stable</Badge>, version: '1.0.0', a11y: 'AA' },
  { name: 'Input',    status: <Badge variant="success" dot>Stable</Badge>, version: '1.0.0', a11y: 'AA' },
  { name: 'Badge',    status: <Badge variant="success" dot>Stable</Badge>, version: '1.0.0', a11y: 'AA' },
  { name: 'Modal',    status: <Badge variant="success" dot>Stable</Badge>, version: '1.0.0', a11y: 'AA' },
  { name: 'Select',   status: <Badge variant="warning">Beta</Badge>,       version: '0.9.0', a11y: 'AA' },
  { name: 'Checkbox', status: <Badge variant="success" dot>Stable</Badge>, version: '1.0.0', a11y: 'AA' },
];

const SELECT_OPTIONS = [
  { value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' }, { value: 'angular', label: 'Angular' },
];

// ---- Registry: maps nav id → config + render functions ----
const REGISTRY = {
  button: {
    config: buttonConfig,
    preview: (props) => <Button {...props} />,
    variants: () => <>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </>,
  },
  input: {
    config: inputConfig,
    preview: (props) => <Input {...props} style={{ minWidth: 280 }} />,
    variants: () => <>
      <Input label="Default" placeholder="Enter text…" />
      <Input label="Error" state="error" helperText="This field is required." />
      <Input label="Success" state="success" helperText="Looks good!" />
      <Input label="Disabled" disabled placeholder="Not editable" />
    </>,
  },
  badge: {
    config: badgeConfig,
    preview: (props) => <Badge {...props} />,
    variants: () => <>
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="success" dot>Online</Badge>
      <Badge variant="danger" dot>Offline</Badge>
    </>,
  },
  modal: {
    config: modalConfig,
    preview: (props, { modalOpen, setModalOpen }) => (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <Button variant="primary" onClick={() => setModalOpen(true)}>Open Modal</Button>
        <Modal
          {...props}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          footer={<>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setModalOpen(false)}>Confirm</Button>
          </>}
        >
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>
            This modal traps focus and can be dismissed with the Escape key or by clicking the backdrop.
          </p>
        </Modal>
      </div>
    ),
  },
  table: {
    config: tableConfig,
    preview: (props) => (
      <div style={{ width: '100%', maxWidth: 640 }}>
        <Table columns={TABLE_COLS} data={makeTableData()} {...props} />
      </div>
    ),
  },
  select: {
    config: selectConfig,
    preview: (props) => <Select {...props} options={SELECT_OPTIONS} style={{ minWidth: 240 }} />,
    variants: () => <>
      <Select label="Default" options={SELECT_OPTIONS} placeholder="Select…" />
      <Select label="Error" options={SELECT_OPTIONS} state="error" helperText="Required." />
      <Select label="Disabled" options={SELECT_OPTIONS} disabled />
    </>,
  },
  checkbox: {
    config: checkboxConfig,
    preview: (props, _, setProp) => (
      <Checkbox {...props} onChange={e => setProp('checked', e.target.checked)} />
    ),
    variants: () => <>
      <Checkbox label="Unchecked" checked={false} onChange={() => {}} />
      <Checkbox label="Checked" checked={true} onChange={() => {}} />
      <Checkbox label="Indeterminate" indeterminate onChange={() => {}} />
      <Checkbox label="Disabled" disabled onChange={() => {}} />
    </>,
  },
};

// ---- APP ----
export function App() {
  const [activeId, setActiveId] = useState('overview');
  const [liveProps, setLiveProps] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const entry  = REGISTRY[activeId];
  const config = entry?.config ?? null;

  // Reset props whenever the active component changes
  useEffect(() => {
    setLiveProps(config ? { ...config.defaultProps } : {});
    setModalOpen(false);
  }, [activeId]); // eslint-disable-line react-hooks/exhaustive-deps

  const setProp    = useCallback((key, val) => setLiveProps(p => ({ ...p, [key]: val })), []);
  const resetProps = useCallback(() => config && setLiveProps({ ...config.defaultProps }), [config]);

  let content;
  if (activeId === 'overview') {
    content = <OverviewPage />;
  } else if (activeId === 'tokens') {
    content = <TokensPage />;
  } else if (entry) {
    content = (
      <PlaygroundPage
        config={config}
        liveProps={liveProps}
        preview={entry.preview(liveProps, { modalOpen, setModalOpen }, setProp)}
        variants={entry.variants?.()}
      />
    );
  } else {
    content = <OverviewPage />;
  }

  return (
    <ThemeProvider>
      <div className={styles.shell}>
        <Header activeComponent={config?.name} />

        <Sidebar activeId={activeId} onNavigate={setActiveId} />

        <main className={styles.main} id="main-content">
          {content}
        </main>

        {config ? (
          <PropsEditor
            config={config}
            props={liveProps}
            onPropChange={setProp}
            onReset={resetProps}
          />
        ) : (
          <aside className={styles.emptyPanel} aria-label="Props editor — no component selected">
            <div className={styles.emptyInner}>
              <span className={styles.emptyIcon} aria-hidden="true">◈</span>
              <p className={styles.emptyText}>Select a component to edit its props live.</p>
            </div>
          </aside>
        )}
      </div>
    </ThemeProvider>
  );
}
