// src/pages/InputPage.jsx
import { Input } from '../components/ui/Input/Input';
import { PlaygroundPage } from './PlaygroundPage';
import { inputConfig } from '../config/componentConfigs';
import { usePropsEditor } from '../hooks/usePropsEditor';

export function InputPage() {
  const { props, setProp, resetProps } = usePropsEditor(inputConfig.defaultProps);

  const preview = <Input {...props} style={{ minWidth: '280px' }} />;

  const variants = (
    <>
      <Input label="Default" placeholder="Enter text…" />
      <Input label="With value" placeholder="Enter text…" value="john@example.com" readOnly />
      <Input label="Error state" state="error" helperText="This field is required." />
      <Input label="Success state" state="success" helperText="Looks good!" />
      <Input label="Disabled" disabled placeholder="Not editable" />
      <Input label="Required" required placeholder="Required field" />
    </>
  );

  return (
    <PlaygroundPage
      config={inputConfig}
      liveProps={props}
      preview={preview}
      variants={variants}
      onPropChange={setProp}
      onReset={resetProps}
    />
  );
}

InputPage.config = inputConfig;
InputPage.useEditorProps = () => {
  const { props, setProp, resetProps } = usePropsEditor(inputConfig.defaultProps);
  return { props, setProp, resetProps };
};
