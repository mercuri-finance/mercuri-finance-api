import styled, { css } from 'styled-components';

export const Input = styled.input<{ variant?: 'primary' | 'secondary' }>`
  width: 100%;
  font-size: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  background: #0a0e12;
  border: 1px solid #1e252b;
  color: #aeb9c8;
  transition: all 0.2s ease-in-out;

  &::placeholder {
    color: #657081;
  }

  &:focus {
    outline: none;
    border-color: #e3ffc1;
  }

  ${(props) =>
    props.variant === 'secondary' &&
    css`
      background: #202c38b3;
      color: #e3ffc1;
      border: 1px solid #e3ffc1;

      &::placeholder {
        color: #c5dca7;
      }

      &:focus {
        border-color: #e3ffc1;
      }
    `}
`;

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledSelect = styled.select`
  width: 100%;
  font-size: 1rem;
  padding: 0.75rem 1rem;
  padding-right: 2.5rem; /* space for the arrow */
  border-radius: 10px;
  background: #0a0e12;
  border: 1px solid #1e252b;
  color: #aeb9c8;
  transition: all 0.2s ease-in-out;
  appearance: none;
  cursor: pointer;

  &::placeholder {
    color: #657081;
  }

  &:focus {
    outline: none;
    border-color: #e3ffc1;
  }

  option {
    background: #0a0e12;
    color: #aeb9c8;
    font-size: 1rem;
  }
`;

export const SelectArrow = styled.div`
  position: absolute;
  top: 50%;
  right: 1rem;
  pointer-events: none;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 16px;
    height: 16px;
    color: #aeb9c8;
  }
`;
