import { PageFooterNav } from '@/app/components/PageFooterNav';
import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  border: 1px solid #1e252b;
  border-radius: 8px;
  overflow: hidden;

  th,
  td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #1e252b;
    text-align: left;
  }

  th {
    background: #11161c;
    color: #e3ffc1;
    font-weight: 500;
    font-size: 0.9rem;
    letter-spacing: 0.03em;
  }

  td {
    color: #a5afc0;
    font-size: 0.9rem;
  }

  tr:last-child td {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    th,
    td {
      font-size: 0.85rem;
      padding: 0.6rem;
    }
  }
`;

export default function NetworkSupport() {
  return (
    <>
      <h5>Core Concepts</h5>
      <h1>Network & Token Support</h1>
      <p className="lead">
        x402 is designed to be <strong>network-agnostic</strong> — supporting
        multiple blockchains and payment systems — but currently focuses on
        EVM-based chains and tokens that comply with secure transaction
        standards.
      </p>

      <br />
      <h2 id="supported-networks">Supported Networks</h2>
      <p>
        The facilitator and SDK currently support the following networks for
        on-chain payments and signature-based authorization:
      </p>

      <Table>
        <thead>
          <tr>
            <th>Network</th>
            <th>Chain ID</th>
            <th>Status</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ethereum Mainnet</td>
            <td>1</td>
            <td>Supported</td>
            <td>Primary reference network for settlement and testing.</td>
          </tr>
          <tr>
            <td>Base Mainnet</td>
            <td>8453</td>
            <td>Supported</td>
            <td>Optimized for fast, low-cost transactions.</td>
          </tr>
          <tr>
            <td>Polygon (PoS)</td>
            <td>137</td>
            <td>Supported</td>
            <td>Compatible with EIP-3009 & EIP-712 signature flow.</td>
          </tr>
          <tr>
            <td>Ethereum Sepolia</td>
            <td>11155111</td>
            <td>Sandbox</td>
            <td>Used for testing and simulated payment sessions.</td>
          </tr>
          <tr>
            <td>Arbitrum One</td>
            <td>42161</td>
            <td>Planned</td>
            <td>Integration in progress for next release.</td>
          </tr>
          <tr>
            <td>Solana</td>
            <td>—</td>
            <td>Planned</td>
            <td>Future multi-chain bridge support via facilitator adapters.</td>
          </tr>
        </tbody>
      </Table>

      <br />
      <h2 id="token-standards">Token Standards</h2>
      <p>
        At this stage, <strong>x402</strong> supports <code>ERC20</code> tokens
        that follow secure transfer and authorization flows. Specifically:
      </p>
      <ul>
        <li>
          <strong>EIP-3009:</strong> Enables meta-transactions and{' '}
          <code>transferWithAuthorization</code> for gasless payments.
        </li>
        <li>
          <strong>EIP-712:</strong> Provides structured message signing for
          secure and verifiable off-chain payment approvals.
        </li>
      </ul>
      <p>
        Tokens that do not implement these standards may not be compatible with
        the current facilitator flow.
      </p>

      <br />
      <h2 id="stablecoins">Stablecoins</h2>
      <ul>
        <li>USDC (EIP-3009 compatible)</li>
        <li>DAI (limited EIP-712 support)</li>
        <li>Other ERC-20 stablecoins with proper signature support</li>
      </ul>

      <br />
      <h2 id="fiat-bridges">Fiat Bridges</h2>
      <p>
        The facilitator can optionally route payments through fiat providers
        using card or bank APIs. These integrations are modular and can coexist
        with on-chain settlement, enabling hybrid crypto-fiat payment workflows.
      </p>

      <PageFooterNav
        prev={{
          title: 'Bazaar (Discovery Layer)',
          href: '/docs/core-concepts/bazaar-discovery',
        }}
        prevGroup={{
          title: 'Getting Started',
          href: '/docs/getting-started/Integrate-seller',
        }}
        nextGroup={{
          title: 'Integration Guides',
          href: '/docs/integration/using-facilitator-service',
        }}
      />
    </>
  );
}
