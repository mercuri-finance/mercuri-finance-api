import { PageFooterNav } from '@/app/components/PageFooterNav';
import { CodeBlock } from '@/app/components/CodeBlock';
import React from 'react';

export default function Changelog() {
  return (
    <>
      <h5>Documentation</h5>
      <h1>Changelog</h1>
      <p className="lead">
        The <strong>x402 Changelog</strong> provides an overview of recent
        updates, improvements, and planned features across the x402 protocol,
        SDKs, and facilitator services.
      </p>

      <br />
      <h2 id="v1-3-0">v1.3.0 — October 30, 2025</h2>
      <p>
        This release focuses on improving developer experience and expanding
        sandbox capabilities for testing integrations.
      </p>
      <ul>
        <li>Added sandbox mode with simulated settlements and verification</li>
        <li>
          Added new SDK configuration options for <code>autoRetry</code> and{' '}
          <code>network</code>
        </li>
        <li>Improved logging and error responses in facilitator API</li>
        <li>Updated documentation for clarity and visual consistency</li>
      </ul>

      <br />
      <h2 id="v1-2-0">v1.2.0 — September 15, 2025</h2>
      <p>Key infrastructure and SDK updates improving stability and UX.</p>
      <ul>
        <li>
          Introduced <code>/verify</code> endpoint for direct payment checks
        </li>
        <li>Enhanced facilitator status responses with expiry details</li>
        <li>
          Added Python SDK initial release (<code>x402-sdk</code>)
        </li>
        <li>Refactored JavaScript SDK for modular imports</li>
      </ul>

      <br />
      <h2 id="v1-1-0">v1.1.0 — August 2, 2025</h2>
      <p>Focused on security and standardization updates.</p>
      <ul>
        <li>Added facilitator signature validation for receipts</li>
        <li>Improved on-chain verification reliability</li>
        <li>
          Introduced structured receipt format with <code>signature</code>
        </li>
        <li>Added experimental webhook callback support (beta)</li>
      </ul>

      <br />
      <h2 id="v1-0-0">v1.0.0 — July 10, 2025</h2>
      <p>
        The first stable release of the <strong>x402 protocol</strong> and
        <strong> Facilitator API</strong>.
      </p>
      <CodeBlock language="json">{`{
  "version": "1.0.0",
  "protocol": "x402",
  "features": [
    "HTTP 402 payment support",
    "Facilitator payment routing",
    "Receipt verification",
    "Basic SDKs for JS and Python"
  ]
}`}</CodeBlock>
      <p>
        This release established the foundation of x402’s open monetization
        framework, introducing the facilitator service and SDK for developers.
      </p>

      <br />
      <h2 id="coming-soon">Coming Soon</h2>
      <ul>
        <li>API key authentication for production facilitators</li>
        <li>Webhook event subscriptions for real-time updates</li>
        <li>Developer dashboard for key management and analytics</li>
        <li>Cross-chain payment support (Base, Polygon, Arbitrum)</li>
      </ul>

      <PageFooterNav
        prev={{
          title: 'Platform Overview',
          href: '/docs/introduction/platform-overview',
        }}
        next={{
          title: 'Using the Facilitator Service',
          href: '/docs/integration/using-facilitator-service',
        }}
        nextGroup={{
          title: 'Integration Guides',
          href: '/docs/integration/sdk-integration',
        }}
      />
    </>
  );
}
