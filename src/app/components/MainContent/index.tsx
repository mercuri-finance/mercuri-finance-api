import React from 'react';
import styled from 'styled-components';

const MainWrapper = styled.main`
  flex: 1;
  max-width: 720px;
  margin: 6rem auto;
  padding: 0 2rem;
  color: #d1d5db;
  line-height: 1.75;
  font-size: 1rem;

  @media (max-width: 1024px) {
    max-width: 680px;
    margin: 5rem auto;
  }

  @media (max-width: 768px) {
    padding: 0 1.25rem;
    margin: 4.5rem auto;
  }

  h1,
  h2,
  h3 {
    color: #e3ffc1;
    font-weight: 700;
    line-height: 1.3;
    margin-top: 3.5rem;
    margin-bottom: 1.25rem;
  }

  h1 {
    font-size: 1.9rem;
    margin-top: 2.5rem;
  }

  h2 {
    font-size: 1.4rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  p {
    margin-bottom: 1.5rem;
    color: #c9d1d9;
  }

  ul {
    list-style-type: disc;
    margin-left: 1.5rem;
    margin-bottom: 1.5rem;
    color: #c9d1d9;
  }

  code {
    background: #11161b;
    border-radius: 6px;
    padding: 0.25rem 0.45rem;
    font-family: 'Source Code Pro', monospace;
    color: #e3ffc1;
    font-size: 0.95rem;
  }

  pre {
    background: #11161b;
    border-radius: 8px;
    padding: 1.25rem;
    overflow-x: auto;
    margin-bottom: 2rem;
    color: #e3ffc1;
    font-family: 'Source Code Pro', monospace;
    font-size: 0.95rem;
  }

  strong {
    color: #ffffff;
  }

  li {
    margin-bottom: 0.75rem;
  }
`;

export const MainContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <MainWrapper>{children}</MainWrapper>;
