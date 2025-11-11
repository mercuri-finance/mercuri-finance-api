import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { Navigation } from '../Navigation';
import { APISidebar } from '../Sidebar';
import { RequestPanel } from '../RequestPanel';

const Grid = styled.div`
  display: grid;
  padding-top: 64px;
  grid-template-columns: 280px 1fr 360px;
  background: #0a0e12;
  color: #fff;
  height: 100vh;
  overflow: hidden;

  @media (max-width: 1200px) {
    grid-template-columns: 240px 1fr;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Main = styled.main`
  overflow-y: auto;
  height: 100%;
  padding: 3rem 3rem;
  box-sizing: border-box;
  padding-bottom: 10rem;
`;

const RightPanel = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
`;

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props): JSX.Element {
  return (
    <>
      <Navigation />
      <Grid>
        <APISidebar />
        <Main>{children}</Main>
        <RightPanel>
          <RequestPanel />
        </RightPanel>
      </Grid>
    </>
  );
}
