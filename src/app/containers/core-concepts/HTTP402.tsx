import { PageFooterNav } from '@/app/components/PageFooterNav';
import { CodeBlock } from '@/app/components/CodeBlock';
import React from 'react';

export default function HTTP402() {
  return (
    <>
      <h5>Core Concepts</h5>
      <h1>HTTP 402 Explained</h1>
      <p className="lead">
        The <code>HTTP 402 Payment Required</code> status code was reserved in
        the original HTTP specification but never standardized — until now.{' '}
        <strong>x402</strong> revives it as the foundation for interoperable web
        payments.
      </p>

      <br />
      <h2 id="purpose">Purpose</h2>
      <p>
        The <code>402</code> status acts as a universal signal that a request
        requires payment before access can be granted. Instead of hardcoding
        billing logic, <strong>x402</strong> makes this response a first-class
        citizen of the web layer.
      </p>

      <br />
      <h2 id="response-example">Response Example</h2>

      <CodeBlock language="http">{`HTTP/1.1 402 Payment Required
Content-Type: application/json

{
  "payment_url": "https://facilitator.x402.dev/pay/123",
  "amount": "0.001 ETH",
  "currency": "ETH",
  "expiry": "2025-12-31T23:59:59Z"
}`}</CodeBlock>

      <br />
      <h2 id="benefits">Benefits</h2>
      <ul>
        <li>Unified payment signaling for web APIs</li>
        <li>Protocol-level standard, not app-specific logic</li>
        <li>Works across fiat, crypto, and hybrid models</li>
      </ul>

      <PageFooterNav
        prev={{
          title: 'Common Questions',
          href: '/docs/introduction/faq',
        }}
        next={{
          title: 'Client / Server Roles',
          href: '/docs/core-concepts/client-server-roles',
        }}
        prevGroup={{
          title: 'Getting Started',
          href: '/docs/getting-started/integrate-seller',
        }}
        nextGroup={{
          title: 'Integration Guides',
          href: '/docs/integration/using-facilitator-service',
        }}
      />
    </>
  );
}
