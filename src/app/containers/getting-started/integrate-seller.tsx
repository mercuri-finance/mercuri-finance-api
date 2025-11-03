import { CodeBlock } from '@/app/components/CodeBlock';
import { PageFooterNav } from '@/app/components/PageFooterNav';
import React from 'react';

export default function IntegrateSeller() {
  return (
    <>
      <h5>Getting Started</h5>
      <h1>Integrate as a Seller</h1>
      <p className="lead">
        As a Seller, your API or backend uses x402 to signal that a payment is
        required before serving a resource. This is done through the standard{' '}
        <code>HTTP 402 Payment Required</code> status and a facilitator payload
        that defines how the payment should be made.
      </p>
      <br />

      <h2 id="understanding-the-seller-role">
        1. Understanding the Seller Role
      </h2>
      <p>
        A Seller is any API or web service that charges per request, per usage,
        or per access. Instead of using custom tokens or auth headers, Sellers
        use x402 to indicate payment requirements natively through HTTP.
      </p>
      <br />

      <h2 id="responding-with-http-402">2. Responding with HTTP 402</h2>
      <p>
        When a client requests a paid resource, your API should respond with{' '}
        <code>HTTP 402 Payment Required</code> and include a JSON payload
        describing the payment details.
      </p>

      <CodeBlock language="http">{`HTTP/1.1 402 Payment Required
Content-Type: application/json

{
  "payment_url": "https://facilitator.x402.dev/pay/123",
  "amount": "0.001 ETH",
  "currency": "ETH",
  "expiry": "2025-12-31T23:59:59Z"
}`}</CodeBlock>
      <p>
        The Buyer will use this information to contact the facilitator, complete
        payment, and retry the request automatically after settlement.
      </p>
      <br />

      <h2 id="verifying-payment">3. Verifying Payment</h2>
      <p>
        Once a Buyer retries the request, you can verify that the payment
        session has been settled using the facilitator’s verification endpoint:
      </p>
      <pre>
        <code>{`GET https://facilitator.x402.io/api/payment/verify?sessionId=abc123`}</code>
      </pre>
      <p>A successful verification returns:</p>
      <CodeBlock language="json">{`{
  "status": "completed",
  "txHash": "0xabc123...",
  "payer": "0xBuyerAddress",
  "amount": "0.001",
  "currency": "ETH"
}`}</CodeBlock>
      <p>
        You can then release the resource to the client, as the payment has been
        confirmed by the facilitator.
      </p>
      <br />

      <h2 id="minimal-example">4. Minimal Example (Express.js)</h2>
      <p>Here’s how a simple API might integrate x402 as a Seller:</p>
      <CodeBlock language="ts">{`app.get('/premium', async (req, res) => {
  const paid = await verifyPayment(req.query.sessionId);

  if (!paid) {
    return res.status(402).json({
      facilitator: 'https://facilitator.x402.io',
      amount: '0.001',
      currency: 'ETH',
      description: 'Access to premium endpoint',
    });
  }

  res.json({ message: 'Premium content unlocked!' });
});`}</CodeBlock>
      <br />

      <h2 id="verification-sdk">5. Verification SDK (Coming Soon)</h2>
      <p>
        Once SDKs are available, you’ll be able to verify payment sessions with
        one helper call:
      </p>
      <CodeBlock language="ts">{`import { verifyPayment } from "@x402/sdk";

const result = await verifyPayment(sessionId);

if (result.status === "completed") {
  // Serve content
}`}</CodeBlock>
      <br />

      <h2 id="testing-mode">6. Testing Mode</h2>
      <p>
        During early access, all facilitator endpoints operate in sandbox mode.
        Transactions are simulated and no real funds are moved — ideal for
        development and integration testing.
      </p>

      <PageFooterNav
        prev={{
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
