import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Fuse from 'fuse.js';
import { searchIndex, SearchEntry } from '../../data/searchIndex';
import { createPortal } from 'react-dom';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 10vh;
  z-index: 2000;
`;

const Modal = styled.div`
  width: 600px;
  max-width: 90%;
  background: #0a0e12;
  border: 1px solid #1a2230;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.2rem;
  border: none;
  background: #11161d;
  color: #fff;
  font-size: 1rem;
  outline: none;

  &::placeholder {
    color: #6c7a8e; /* custom muted placeholder color */
  }
`;

const ResultList = styled.div`
  max-height: 60vh;
  overflow-y: auto;
  padding: 0.5rem 0;
`;

const ResultItem = styled.a`
  display: block;
  padding: 0.75rem 1.2rem;
  color: #c7d2e0;
  text-decoration: none;
  border-left: 3px solid transparent;
  transition: all 0.15s ease;

  &:hover {
    background: #141a22;
    border-left-color: #e3ffc1;
  }
`;

const GroupTitle = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  color: #6c7a8e;
  padding: 0.5rem 1.2rem;
  text-transform: uppercase;
`;

export const SearchModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchEntry[]>([]);
  const fuse = new Fuse(searchIndex, {
    keys: ['title', 'description', 'group'],
    threshold: 0.3,
  });

  // default set: Introduction articles
  const defaultResults = searchIndex.filter(
    (item) => item.group === 'Introduction'
  );

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults(defaultResults); // show intro articles by default
      return;
    }
    const found = fuse.search(query).map((res) => res.item);
    setResults(found);
  }, [query]);

  return createPortal(
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <SearchInput
          placeholder="Search documentation…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <ResultList>
          {results.length === 0 ? (
            <GroupTitle>No results found</GroupTitle>
          ) : (
            results.map((res, i) => (
              <React.Fragment key={i}>
                {i === 0 || results[i - 1].group !== res.group ? (
                  <GroupTitle>{res.group}</GroupTitle>
                ) : null}
                <ResultItem href={res.path}>
                  <strong>{res.title}</strong>
                  <div style={{ fontSize: '0.85rem', color: '#7a889b' }}>
                    {res.description}
                  </div>
                </ResultItem>
              </React.Fragment>
            ))
          )}
        </ResultList>
      </Modal>
    </Overlay>,
    document.body
  );
};
