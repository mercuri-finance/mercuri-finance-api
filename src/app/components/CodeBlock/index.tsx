import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { Copy } from 'lucide-react';
import Prism from 'prismjs';

// === Import only the grammars you need ===
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-http';

// === (Optional) Import base token classes (we override colors below) ===
import 'prismjs/themes/prism-tomorrow.css';

/* ------------------------------------------------------------------ */
/* ------------------------ Styled Components ----------------------- */
/* ------------------------------------------------------------------ */

const Wrapper = styled.div<{ isModal: boolean }>`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: ${({ isModal }) => (isModal ? '#0a0e12' : '#0f1318')};
  border: ${({ isModal }) =>
    isModal ? '1px solid #0a0e12' : '1px solid #1e252b'};
`;

const Header = styled.div<{ isModal: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ isModal }) => (isModal ? '#0a0e12' : '#0f1318')};
  padding: 0.5rem 0.75rem;
`;

const LangTag = styled.span`
  background: #1a1f26;
  color: #91a2c1;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  text-transform: uppercase;
`;

const CopyButton = styled.button<{ copied: boolean }>`
  background: transparent;
  color: ${({ copied }) => (copied ? '#e3ffc1' : '#a5afc0')};
  border: 1px solid #222a33;
  font-size: 0.75rem;
  padding: 0.25rem 0.55rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.3rem;

  &:hover {
    color: #e3ffc1;
    background: #1a1f26;
  }
`;

const StyledPre = styled.pre<{ isModal: boolean }>`
  display: block;
  background: ${({ isModal }) => (isModal ? '#0a0e12' : '#0f1318')} !important;
  padding: 1.25rem 1.5rem !important;
  overflow-x: auto;
  border-radius: 0 0 8px 8px;
  margin: 0 !important;

  code {
    all: unset;
    display: block;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9rem;
    line-height: 1.6;
    white-space: pre;
    word-break: break-word;
    color: #c9d1d9;
  }

  /* === PRISM TOKEN COLORS (custom palette) === */
  .token.comment {
    color: #6b7280;
    font-style: italic;
  }
  .token.keyword {
    color: #91cb91; /* green */
  }
  .token.string {
    color: #e3ffc1; /* soft yellow */
  }
  .token.number {
    color: #91cb91;
  }
  .token.boolean {
    color: #d199e7;
  }
  .token.null {
    color: #ef767a;
  }
  .token.function {
    color: #d199e7;
  }
  .token.operator,
  .token.punctuation {
    color: #c9d1d9; /* <-- pure white curly braces and punctuation */
  }
  .token.property,
  .token.key {
    color: #9ab4d0;
  }
`;

/* ------------------------------------------------------------------ */
/* ------------------------- Highlight Logic ------------------------ */
/* ------------------------------------------------------------------ */

const highlightCode = (language: string | undefined, text: string): string => {
  const lang = (language || '').toLowerCase();
  const grammar = Prism.languages[lang] || Prism.languages.javascript;
  return Prism.highlight(text, grammar, lang);
};

/* ------------------------------------------------------------------ */
/* --------------------------- Component ---------------------------- */
/* ------------------------------------------------------------------ */

export const CodeBlock: React.FC<{
  language?: string;
  isModal?: boolean;
  children: string;
}> = ({ language, isModal = false, children }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlighted = useMemo(
    () => highlightCode(language, children),
    [language, children]
  );

  return (
    <Wrapper isModal={isModal}>
      <Header isModal={isModal}>
        <LangTag>{language?.toUpperCase() || 'CODE'}</LangTag>
        <CopyButton onClick={handleCopy} copied={copied}>
          <Copy size={14} />
          {copied ? 'Copied' : 'Copy'}
        </CopyButton>
      </Header>
      <StyledPre isModal={isModal}>
        <code
          className={`language-${language?.toLowerCase() || 'none'}`}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </StyledPre>
    </Wrapper>
  );
};
