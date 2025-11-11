import React, { useEffect } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { CodeBlock } from '../CodeBlock';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
`;

const Modal = styled.div`
  width: 700px;
  max-width: 90%;
  max-height: 80vh;
  background: #0a0e12;
  border: 1px solid #1a2230;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
`;

const Title = styled.h4`
  width: 100%;
  padding: 1rem 1.2rem;
  border: none;
  background: #11161d;
  color: #6c7a8e;
  font-size: 1rem;
  outline: none;
  margin-bottom: 0;
`;

const Content = styled.div`
  overflow-y: auto;
  flex: 1;
`;

interface Props {
  response: string;
  onClose: () => void;
}

export function ResponseModal({ response, onClose }: Props): JSX.Element {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return createPortal(
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Title>API Response</Title>

        <Content>
          <CodeBlock isModal language="json">
            {response}
          </CodeBlock>
        </Content>
      </Modal>
    </Overlay>,
    document.body
  );
}
