import styled, { css } from 'styled-components';
import { Variant } from '.';

export const StyledButton = styled.button<{ variant: Variant }>`
  font-size: 1rem;
  padding: 0.75rem 2rem;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid transparent;
  width: 100%;

  &:disabled {
    cursor: default;
    pointer-events: none;
    opacity: 0.9;
    background: #161b22;
    color: #4d5c6b;
    border: 1px solid #1b2027;

    &:hover {
      background: none;
    }
  }

  ${(props) =>
    props.variant === 'primary' &&
    css`
      background-color: #e3ffc1;
      color: #0a0e12;
      border: 1px solid #e3ffc1;

      &:hover {
        background-color: #c5dca7;
        border: 1px solid #c5dca7;
      }
    `}

  ${(props) =>
    props.variant === 'secondary' &&
    css`
      background-color: #202c38b3;
      color: #e3ffc1;
      border: 1px solid #e3ffc1;

      &:hover {
        color: #c5dca7;
        border: 1px solid #c5dca7;
      }
    `}
`;
