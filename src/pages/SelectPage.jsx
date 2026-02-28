// src/pages/SelectPage.jsx
import { Select }       from '../components/ui/Select/Select';
import { PlaygroundPage } from './PlaygroundPage';
import { usePropsEditor } from '../hooks/usePropsEditor';

const selectConfig = {
  id: 'select',
  name: 'Select',
  description: 'A styled native dropdown for choosing from a list of options.',
  importLine: `import { Select } from '@/components/ui/Select/Select';`,
  defaultProps: {
    label: 'Framework',
    placeholder: 'Choose one…',
    state: 'default',
    disabled: false,
    helperText: '',
  },
  props: [
    { key: 'label',       label: 'Label',       type: 'text',   description: 'Visible label above the dropdown.' },
    { key: 'placeholder', label: 'Placeholder', type: 'text',   description: 'Default empty option text.' },
    { key: 'state',       label: 'State',       type: 'select', options: ['default', 'error'], description: 'Validation state.' },
    { key: 'helperText',  label: 'Helper Text', type: 'text',   description: 'Message below the dropdown.' },
    { key: 'disabled',    label: 'Disabled',    type: 'boolean',description: 'Prevents selection.' },
  ],
  accessibility: [
    { rule: 'Label',    note: 'Visible label linked to select via htmlFor / id.' },
    { rule: 'Native',   note: 'Uses native <select> for full keyboard & AT support out of the box.' },
    { rule: 'Styling',  note: 'Custom appearance via CSS; native behavior is preserved.' },
    { rule: 'Keyboard', note: 'Arrow keys, Enter, and Space work natively in all browsers and screen readers.' },
  ],
};

const OPTIONS = [
  { value: 'react',   label: 'React' },
  { value: 'vue',     label: 'Vue' },
  { value: 'svelte',  label: 'Svelte' },
  { value: 'angular', label: 'Angular' },
];

export function SelectPage() {
  const { props, setProp, resetProps } = usePropsEditor(selectConfig.defaultProps);

  const preview = (
    <Select
      {...props}
      options={OPTIONS}
      style={{ minWidth: '240px' }}
    />
  );

  const variants = (
    <>
      <Select label="Default" options={OPTIONS} placeholder="Select…" />
      <Select label="Error"   options={OPTIONS} state="error" helperText="Selection required." />
      <Select label="Disabled" options={OPTIONS} disabled />
    </>
  );

  return (
    <PlaygroundPage
      config={selectConfig}
      liveProps={props}
      preview={preview}
      variants={variants}
      onPropChange={setProp}
      onReset={resetProps}
    />
  );
}

SelectPage.config = selectConfig;
SelectPage.useEditorProps = () => {
  const { props, setProp, resetProps } = usePropsEditor(selectConfig.defaultProps);
  return { props, setProp, resetProps };
};
