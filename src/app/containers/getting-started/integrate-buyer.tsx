import { PageFooterNav } from '@/app/components/PageFooterNav';
import { CodeBlock } from '@/app/components/CodeBlock';
import React from 'react';

export default function IntegrateBuyer() {
  return (
    <>
      <h5>Getting Started</h5>
      <h1>Integrate as a Buyer</h1>
      <p className="lead">
        As a Buyer, your application uses the x402 Facilitator to create and
        complete payment sessions. This guide shows how to request a payment,
        process an <code>HTTP 402</code> response, and confirm successful
        settlement.
      </p>
      <br />

      <h2 id="understanding-the-buyer-role">1. Understanding the Buyer Role</h2>
      <p>
        A Buyer is any client — such as an app, API consumer, or user wallet —
        that wants to access a paid service. When a server responds with{' '}
        <code>HTTP 402 Payment Required</code>, the Buyer uses the facilitator
        to complete payment and retry the request automatically.
      </p>
      <br />

      <h2 id="create-a-payment-session">2. Create a Payment Session</h2>
      <p>
        To start a transaction, the Buyer sends a request to the x402
        Facilitator’s session endpoint. The facilitator coordinates payment
        routing, handles wallet connections, and returns a session ID:
      </p>

      <CodeBlock language="http">{`POST https://facilitator.x402.io/api/payment/session
Content-Type: application/json

{
  "amount": "0.001",
  "currency": "ETH",
  "to": "merchant.example.api"
}`}</CodeBlock>

      <p>
        The facilitator responds with a <code>sessionId</code> and metadata the
        Buyer can use to continue payment in a connected wallet or directly
        through the SDK.
      </p>
      <br />

      <h2 id="completing-a-payment">3. Completing a Payment</h2>
      <p>
        Once a payment session is created, the Buyer’s wallet (or SDK) will
        handle signing and broadcasting the transaction. After successful
        settlement, the facilitator returns a confirmation payload similar to:
      </p>

      <CodeBlock language="json">{`{
  "status": "completed",
  "txHash": "0xabc123...",
  "amount": "0.001",
  "currency": "ETH"
}`}</CodeBlock>

      <p>
        The Buyer can then retry the original API request. The seller will
        detect the verified payment and respond with <code>HTTP 200</code> and
        the actual resource.
      </p>
      <br />

      <h2 id="using-the-sdk">4. Using the SDK (Coming Soon)</h2>
      <p>
        The upcoming SDKs will include a simple helper for initiating sessions:
      </p>

      <CodeBlock language="ts">{`import { createPayment } from "@x402/sdk";

const session = await createPayment({
  amount: "0.001",
  currency: "ETH",
  to: "merchant.example.api",
});`}</CodeBlock>

      <p>
        Once the SDKs are published, payments can be completed in one line using
        the built-in facilitator client.
      </p>
      <br />

      <h2 id="testing-flow">5. Testing Flow</h2>
      <p>
        You can test Buyer integrations entirely in sandbox mode using the
        public facilitator endpoint — no wallet or tokens required. The
        responses simulate real payment confirmations for your development
        environment.
      </p>

      <PageFooterNav
        prev={{
          title: 'Setup Guide',
          href: '/docs/getting-started/setup-guide',
        }}
        next={{
          title: 'Integrate as a Seller',
          href: '/docs/getting-started/integrate-seller',
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
