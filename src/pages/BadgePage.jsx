// src/pages/BadgePage.jsx
import { Badge } from '../components/ui/Badge/Badge';
import { PlaygroundPage } from './PlaygroundPage';
import { badgeConfig } from '../config/componentConfigs';
import { usePropsEditor } from '../hooks/usePropsEditor';

export function BadgePage() {
  const { props, setProp, resetProps } = usePropsEditor(badgeConfig.defaultProps);

  const preview = <Badge {...props} />;

  const variants = (
    <>
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="success" dot>Online</Badge>
      <Badge variant="danger" dot>Offline</Badge>
      <Badge variant="success" size="sm">Compact</Badge>
    </>
  );

  return (
    <PlaygroundPage
      config={badgeConfig}
      liveProps={props}
      preview={preview}
      variants={variants}
      onPropChange={setProp}
      onReset={resetProps}
    />
  );
}

BadgePage.config = badgeConfig;
BadgePage.useEditorProps = () => {
  const { props, setProp, resetProps } = usePropsEditor(badgeConfig.defaultProps);
  return { props, setProp, resetProps };
};
