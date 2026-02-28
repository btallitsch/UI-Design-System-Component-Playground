// src/pages/ModalPage.jsx
import { useState } from 'react';
import { Modal }  from '../components/ui/Modal/Modal';
import { Button } from '../components/ui/Button/Button';
import { PlaygroundPage } from './PlaygroundPage';
import { modalConfig } from '../config/componentConfigs';
import { usePropsEditor } from '../hooks/usePropsEditor';

export function ModalPage() {
  const { props, setProp, resetProps } = usePropsEditor(modalConfig.defaultProps);
  const [open, setOpen] = useState(false);

  const preview = (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal
        {...props}
        open={open}
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
          </>
        }
      >
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: '1.7' }}>
          This is an accessible modal dialog. It traps keyboard focus, announces itself to screen readers via <code>aria-modal</code>, and can be dismissed with the Escape key.
        </p>
      </Modal>
    </div>
  );

  return (
    <PlaygroundPage
      config={modalConfig}
      liveProps={props}
      preview={preview}
      onPropChange={setProp}
      onReset={resetProps}
    />
  );
}

ModalPage.config = modalConfig;
ModalPage.useEditorProps = () => {
  const { props, setProp, resetProps } = usePropsEditor(modalConfig.defaultProps);
  return { props, setProp, resetProps };
};
