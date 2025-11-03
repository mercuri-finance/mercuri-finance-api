import React from 'react';
import styled from 'styled-components';
import { useLocation, Link as RouterLink } from 'react-router-dom';

const SidebarContainer = styled.aside`
  width: 280px;
  background: #0f1318;
  border-right: 1px solid #19242e;
  height: 100vh;
  padding: 2rem 2rem;
  color: #91a2c1;
  overflow-y: auto;
`;

const Section = styled.div`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h3`
  color: #ffffff;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  font-weight: 500;
`;
const StyledLink = styled(RouterLink)<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: ${({ $active }) => ($active ? '#e3ffc1' : '#a5afc0')};
  font-size: 0.9rem;
  font-weight: ${({ $active }) => ($active ? 500 : 400)};
  margin: 0.7rem 0;
  cursor: pointer;
  text-align: left;
  width: 100%;
  padding-left: 10px;

  span.method {
    font-family: 'Fira Code', monospace;
    font-size: 0.75rem;
    background: #141a22;
    padding: 0.15rem 0.35rem;
    border-radius: 4px;
    color: ${({ children }) =>
      // detect "POST" text content for color change
      React.Children.toArray(children).some(
        (child: any) =>
          child?.props?.className === 'method' &&
          child?.props?.children === 'POST'
      )
        ? '#c6bfff'
        : '#7de3c3'};
  }

  &:hover {
    color: #e3ffc1;
  }
`;

export const APISidebar: React.FC = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <SidebarContainer>
      <Section>
        <SectionTitle>Endpoints</SectionTitle>
        <StyledLink to="/api/supported" $active={pathname === '/api/supported'}>
          <span className="method">GET</span> Get Kinds
        </StyledLink>

        <StyledLink to="/api/verify" $active={pathname === '/api/verify'}>
          <span className="method">POST</span> Verify Payment
        </StyledLink>

        <StyledLink to="/api/settle" $active={pathname === '/api/settle'}>
          <span className="method">POST</span> Settle Payment
        </StyledLink>
      </Section>
    </SidebarContainer>
  );
};
