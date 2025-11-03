import styled from 'styled-components';

export const Badge = styled.span<{ method: 'GET' | 'POST' }>`
  display: inline-block;
  padding: 0.25rem 0.6rem;
  background: ${({ method }) => (method === 'GET' ? '#e3ffc1' : '#c7c0ff')};
  color: black;
  font-size: 0.75rem;
  border-radius: 6px;
`;
