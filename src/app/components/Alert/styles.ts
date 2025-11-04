// src/app/components/Alert.tsx
import styled, { css } from 'styled-components';

interface AlertProps {
  $variant?: 'info' | 'warning';
}

export const Alert = styled.div<AlertProps>`
  border-left: 4px solid;
  padding: 1rem 1.25rem;
  border-radius: 8px;
  margin: 2rem 0;
  line-height: 1.6;

  ${({ $variant }) =>
    $variant === 'warning'
      ? css`
          background: #1c262f;
          border-color: #f2b400;
          color: #fef9e7;
        `
      : css`
          background: #17222d;
          border-color: #58b4ff;
          color: #d8e4f0;
        `}

  strong {
    color: ${({ $variant }) =>
      $variant === 'warning' ? '#fff3b0' : '#a8dfff'};
    font-weight: 600;
  }

  a {
    color: ${({ $variant }) =>
      $variant === 'warning' ? '#ffe784' : '#80d2ff'};
    text-decoration: underline;
  }
`;
