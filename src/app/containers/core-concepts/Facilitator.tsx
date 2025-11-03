import { PageFooterNav } from '@/app/components/PageFooterNav';
import { CodeBlock } from '@/app/components/CodeBlock';
import React from 'react';

export default function Facilitator() {
  return (
    <>
      <h5>Core Concepts</h5>
      <h1>The Facilitator</h1>
      <p className="lead">
        The <strong>Facilitator</strong> is the backbone of the x402 ecosystem —
        managing payments, settlements, and authentication between clients and
        servers.
      </p>

      <br />
      <h2 id="what-it-does">What It Does</h2>
      <ul>
        <li>Receives 402 responses and guides users through payment</li>
        <li>Handles wallet authentication or fiat checkout</li>
        <li>Verifies transactions and returns payment proof</li>
      </ul>

      <br />
      <h2 id="deployment-models">Deployment Models</h2>
      <ul>
        <li>
          <strong>Self-Hosted:</strong> Run your own facilitator instance for
          full control and custom payment routing.
        </li>
        <li>
          <strong>Managed:</strong> Use the public x402 facilitator service —
          available today with no API key required.
        </li>
      </ul>

      <br />
      <h2 id="example-flow">Example Flow</h2>
      <CodeBlock language="txt">{`
┌────────────┐         ┌──────────────┐         ┌──────────────────┐
│   Client   │ ──────▶ │    Server    │ ──────▶ │   Facilitator    │
└────────────┘         └──────────────┘         └──────────────────┘
       │                        │                          │
       │      1. Request        │                          │
       │──────────────────────▶ │                          │
       │                        │                          │
       │      2. HTTP 402       │                          │
       │      + facilitator URL │                          │
       │ ◀──────────────────────│                          │
       │                        │                          │
       │──────────────▶ Payment flow via Facilitator ─────▶│
       │                        │                          │
       │      3. Proof / Token  │                          │
       │ ◀──────────────────────│                          │
       │                        │                          │
       │──────────────▶ Retry request with proof ─────────▶│
       │                        │                          │
       │      4. Access Granted │                          │
       │ ◀──────────────────────│                          │
       └───────────────────────────────────────────────────┘
`}</CodeBlock>

      <PageFooterNav
        prev={{
          title: 'Client / Server Roles',
          href: '/docs/core-concepts/client-server-roles',
        }}
        next={{
          title: 'Wallet Integration',
          href: '/docs/core-concepts/wallet-integration',
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
