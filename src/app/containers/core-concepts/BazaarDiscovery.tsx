import { CodeBlock } from '@/app/components/CodeBlock';
import { PageFooterNav } from '@/app/components/PageFooterNav';
import React from 'react';

export default function BazaarDiscovery() {
  return (
    <>
      <h5>Core Concepts</h5>
      <h1>Bazaar (Discovery Layer)</h1>
      <p className="lead">
        The Bazaar is the discovery layer of x402 — a decentralized catalog that
        lists services, APIs, and endpoints with x402 pricing and access
        metadata.
      </p>
      <br />
      <h2 id="purpose">Purpose</h2>
      <p>
        The Bazaar helps developers find and integrate APIs that support x402
        payments. It also enables service providers to publish their endpoints
        with transparent pricing.
      </p>
      <br />
      <h2 id="example-listing">Example Listing</h2>
      <CodeBlock language="json">{`{
  "name": "AI Summarizer API",
  "endpoint": "https://api.example.com/summarize",
  "price": "0.0002 ETH per request",
  "facilitator": "https://facilitator.x402.dev"
}`}</CodeBlock>
      <PageFooterNav
        prev={{
          title: 'Wallet Integration',
          href: '/docs/core-concepts/wallet-integration',
        }}
        next={{
          title: 'Network & Token Support',
          href: '/docs/core-concepts/network-support',
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
