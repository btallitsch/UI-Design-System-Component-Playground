// src/pages/TablePage.jsx
import { Table } from '../components/ui/Table/Table';
import { Badge } from '../components/ui/Badge/Badge';
import { PlaygroundPage } from './PlaygroundPage';
import { tableConfig } from '../config/componentConfigs';
import { usePropsEditor } from '../hooks/usePropsEditor';

const COLUMNS = [
  { key: 'name',   label: 'Component' },
  { key: 'status', label: 'Status' },
  { key: 'version',label: 'Version' },
  { key: 'a11y',   label: 'A11y' },
];

const DATA = [
  { name: 'Button',   status: <Badge variant="success" dot>Stable</Badge>,  version: '1.0.0', a11y: 'AA' },
  { name: 'Input',    status: <Badge variant="success" dot>Stable</Badge>,  version: '1.0.0', a11y: 'AA' },
  { name: 'Badge',    status: <Badge variant="success" dot>Stable</Badge>,  version: '1.0.0', a11y: 'AA' },
  { name: 'Modal',    status: <Badge variant="success" dot>Stable</Badge>,  version: '1.0.0', a11y: 'AA' },
  { name: 'Select',   status: <Badge variant="warning">Beta</Badge>,         version: '0.9.0', a11y: 'AA' },
  { name: 'Checkbox', status: <Badge variant="success" dot>Stable</Badge>,  version: '1.0.0', a11y: 'AA' },
  { name: 'Table',    status: <Badge variant="success" dot>Stable</Badge>,  version: '1.0.0', a11y: 'AA' },
];

export function TablePage() {
  const { props, setProp, resetProps } = usePropsEditor(tableConfig.defaultProps);

  const preview = (
    <div style={{ width: '100%', maxWidth: '640px' }}>
      <Table columns={COLUMNS} data={DATA} {...props} />
    </div>
  );

  return (
    <PlaygroundPage
      config={tableConfig}
      liveProps={props}
      preview={preview}
      onPropChange={setProp}
      onReset={resetProps}
    />
  );
}

TablePage.config = tableConfig;
TablePage.useEditorProps = () => {
  const { props, setProp, resetProps } = usePropsEditor(tableConfig.defaultProps);
  return { props, setProp, resetProps };
};
