import { PageFooterNav } from '@/app/components/PageFooterNav';
import React from 'react';

export default function WalletIntegration() {
  return (
    <>
      <h5>Core Concepts</h5>
      <h1>Wallet Integration</h1>
      <p className="lead">
        Wallets are user-controlled interfaces for authorizing and executing
        payments in x402. They interact directly with facilitators or servers to
        sign and settle requests.
      </p>
      <br />
      <h2 id="supported-wallet-types">Supported Wallet Types</h2>
      <ul>
        <li>Browser-based (e.g., MetaMask, Coinbase Wallet)</li>
        <li>Mobile or native app wallets</li>
        <li>Custom SDK-based wallets for embedded experiences</li>
      </ul>
      <br />
      <h2 id="integration-points">Integration Points</h2>
      <ul>
        <li>Facilitator requests wallet connection</li>
        <li>Wallet signs transaction or authorization</li>
        <li>Proof is sent back to the API for validation</li>
      </ul>

      <PageFooterNav
        prev={{
          title: 'Facilitator',
          href: '/docs/core-concepts/facilitator',
        }}
        next={{
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
