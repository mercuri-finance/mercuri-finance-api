import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyles from './styles';
import { App } from './app';
import { Layout } from './app/components/Layout';
import { WalletProvider } from './app/context/WalletContext';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <WalletProvider>
      <BrowserRouter>
        <GlobalStyles />
        <Layout>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </WalletProvider>
  </React.StrictMode>
);
