// src/pages/ButtonPage.jsx
import { Button } from '../components/ui/Button/Button';
import { PlaygroundPage } from './PlaygroundPage';
import { buttonConfig } from '../config/componentConfigs';
import { usePropsEditor } from '../hooks/usePropsEditor';

export function ButtonPage() {
  const { props, setProp, resetProps } = usePropsEditor(buttonConfig.defaultProps);

  const preview = <Button {...props} />;

  const variants = (
    <>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary" size="lg">Large</Button>
      <Button variant="primary" disabled>Disabled</Button>
      <Button variant="primary" loading>Loading</Button>
    </>
  );

  return (
    <PlaygroundPage
      config={buttonConfig}
      liveProps={props}
      preview={preview}
      variants={variants}
      onPropChange={setProp}
      onReset={resetProps}
    />
  );
}

// Export props editor bindings for the shell to use
ButtonPage.config = buttonConfig;
ButtonPage.useEditorProps = () => {
  const { props, setProp, resetProps } = usePropsEditor(buttonConfig.defaultProps);
  return { props, setProp, resetProps };
};
