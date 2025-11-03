import React, { useEffect } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { WalletSelector } from '../WalletSelector';
import { Button } from '../Button';

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
  background: #11161d;
  color: #6c7a8e;
  font-size: 1rem;
  margin-bottom: 0;
  border-bottom: 1px solid #1a2230;
`;

const Content = styled.div`
  overflow-y: auto;
  flex: 1;
  padding: 1.5rem 2rem 2rem 2rem;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem 1.2rem;
  border-top: 1px solid #1a2230;
  background: #0d1117;
`;

export const WalletModal: React.FC<{
  onClose: () => void;
  onConnect: (address: string, type: string) => void;
}> = ({ onClose, onConnect }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return createPortal(
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Title>Select a Wallet</Title>

        <Content>
          <WalletSelector onConnected={onClose} />
        </Content>
      </Modal>
    </Overlay>,
    document.body
  );
};
