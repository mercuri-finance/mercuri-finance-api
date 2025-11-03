import { PageFooterNav } from '@/app/components/PageFooterNav';
import React from 'react';

export default function SetupGuide() {
  return (
    <>
      <h5>Getting Started</h5>
      <h1>Setup Guide</h1>
      <p className="lead">
        The x402 Facilitator Service is publicly available — no API key
        required. You can start testing today by integrating directly with our
        HTTP endpoints or using our upcoming SDKs for JavaScript and Python.
      </p>
      <br />

      <h2 id="prerequisites">1. Prerequisites</h2>
      <p>
        Before you begin, ensure your application can send and receive standard
        HTTP requests. No authentication or onboarding is required during this
        public access phase.
      </p>
      <ul>
        <li>REST or GraphQL server capable of returning custom HTTP codes</li>
        <li>
          Ability to handle <code>HTTP 402 Payment Required</code> responses
        </li>
        <li>Basic JSON handling for facilitator messages</li>
      </ul>
      <br />

      <h2 id="using-the-public-facilitator">2. Using the Public Facilitator</h2>
      <p>
        The facilitator acts as the payment coordinator between your service and
        the user’s wallet or client. During early access, you can use the shared
        sandbox endpoint:
      </p>
      <pre>
        <code>{`POST https://facilitator.x402.io/api/payment/session`}</code>
      </pre>
      <p>
        This endpoint creates a temporary payment session for your test request
        and simulates the full x402 payment lifecycle.
      </p>
      <br />

      <h2 id="sdk-installation">3. SDK Installation (Coming Soon)</h2>
      <p>Official SDKs will make integration easier for popular languages:</p>
      <ul>
        <li>
          <code>npm install @x402/sdk</code> — JavaScript SDK (in development)
        </li>
        <li>
          <code>pip install x402-sdk</code> — Python SDK (in development)
        </li>
      </ul>
      <p>
        Once released, both SDKs will provide helper functions for creating
        payment sessions, verifying receipts, and handling facilitator
        callbacks.
      </p>
      <br />

      <h2 id="testing-mode">4. Testing Mode</h2>
      <p>
        By default, all transactions in this early release are processed in
        sandbox mode — no real funds are moved. You can inspect full request and
        response payloads to understand the protocol behavior.
      </p>
      <br />

      <h2 id="next-steps">Next Steps</h2>
      <p>
        Once setup is complete, proceed to integrate x402 into your app as a{' '}
        <a href="/docs/getting-started/integrate-buyer">Buyer</a> or{' '}
        <a href="/docs/getting-started/integrate-seller">Seller</a>.
      </p>

      <PageFooterNav
        prev={{
          title: 'Common Questions',
          href: '/docs/introduction/faq',
        }}
        next={{
          title: 'Integrate as a Buyer',
          href: '/docs/getting-started/integrate-buyer',
        }}
        prevGroup={{
          title: 'Introduction',
          href: '/docs/introduction/faq',
        }}
        nextGroup={{
          title: 'Core Concepts',
          href: '/docs/core-concepts/http-402',
        }}
      />
    </>
  );
}
