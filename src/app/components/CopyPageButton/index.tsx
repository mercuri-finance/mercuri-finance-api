import React, { useState } from 'react';
import styled from 'styled-components';
import { Copy } from 'lucide-react'; // simple icon (from lucide-react)

const Button = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: #10161d;
  border: 1px solid #1e252b;
  color: #e3ffc1;
  border-radius: 8px;
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #1a222c;
    border-color: #e3ffc1;
  }
`;

const CopiedMsg = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  transform: translateY(-120%);
  background: #0f1318;
  color: #9ca3af;
  font-size: 0.75rem;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  opacity: 0.9;
`;

export const CopyPageButton: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const content = document.querySelector('main')?.innerText;
    if (content) {
      navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <Button onClick={handleCopy}>
        <Copy size={16} /> Copy Page
      </Button>
      {copied && <CopiedMsg>Copied!</CopiedMsg>}
    </>
  );
};
