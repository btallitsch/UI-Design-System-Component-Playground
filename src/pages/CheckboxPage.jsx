// src/pages/CheckboxPage.jsx
import { Checkbox }     from '../components/ui/Checkbox/Checkbox';
import { PlaygroundPage } from './PlaygroundPage';
import { usePropsEditor } from '../hooks/usePropsEditor';
import { useState }       from 'react';

const checkboxConfig = {
  id: 'checkbox',
  name: 'Checkbox',
  description: 'An accessible binary toggle for boolean form inputs.',
  importLine: `import { Checkbox } from '@/components/ui/Checkbox/Checkbox';`,
  defaultProps: {
    label: 'Accept terms and conditions',
    checked: false,
    disabled: false,
    indeterminate: false,
  },
  props: [
    { key: 'label',         label: 'Label',         type: 'text',    description: 'Visible text next to the checkbox.' },
    { key: 'checked',       label: 'Checked',       type: 'boolean', description: 'Controlled checked state.' },
    { key: 'disabled',      label: 'Disabled',      type: 'boolean', description: 'Prevents toggling.' },
    { key: 'indeterminate', label: 'Indeterminate', type: 'boolean', description: 'Partial selection state (e.g. parent of mixed children).' },
  ],
  accessibility: [
    { rule: 'Labelling', note: 'Visible label linked to input via htmlFor — never use aria-label alone.' },
    { rule: 'Keyboard',  note: 'Space bar toggles the checkbox natively.' },
    { rule: 'State',     note: 'Indeterminate state is set via the DOM property (not an HTML attribute).' },
    { rule: 'Group',     note: 'When grouping checkboxes, wrap in <fieldset> with a <legend>.' },
    { rule: 'Focus',     note: 'Focus ring is on the hidden <input>, visible on the custom box via sibling CSS.' },
  ],
};

export function CheckboxPage() {
  const { props, setProp, resetProps } = usePropsEditor(checkboxConfig.defaultProps);

  const preview = (
    <Checkbox
      {...props}
      onChange={e => setProp('checked', e.target.checked)}
    />
  );

  const variants = (
    <>
      <Checkbox label="Unchecked" checked={false} readOnly />
      <Checkbox label="Checked"   checked={true}  readOnly />
      <Checkbox label="Indeterminate" indeterminate={true} readOnly />
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked"   disabled checked readOnly />
    </>
  );

  return (
    <PlaygroundPage
      config={checkboxConfig}
      liveProps={props}
      preview={preview}
      variants={variants}
      onPropChange={setProp}
      onReset={resetProps}
    />
  );
}

CheckboxPage.config = checkboxConfig;
CheckboxPage.useEditorProps = () => {
  const { props, setProp, resetProps } = usePropsEditor(checkboxConfig.defaultProps);
  return { props, setProp, resetProps };
};
