import { PageFooterNav } from '@/app/components/PageFooterNav';
import { CodeBlock } from '@/app/components/CodeBlock';
import React from 'react';

export default function APIIntegration() {
  return (
    <>
      <h5>Integration Guides</h5>
      <h1>API Integration (Server)</h1>
      <p className="lead">
        The <strong>x402 Facilitator</strong> can be integrated directly into
        backend APIs, microservices, or custom payment gateways. This enables
        server-to-server payments, verifications, and automated settlement
        confirmations without manual wallet interaction.
      </p>

      <br />
      <h2 id="direct-api-access">Direct API Access</h2>
      <p>
        The Facilitator exposes a REST interface suitable for direct HTTP
        integration. No authentication is required at this stage, and requests
        can be made from any backend service:
      </p>
      <CodeBlock language="http">{`POST https://facilitator.x402.io/api/payment/session
Content-Type: application/json

{
  "amount": "1.00",
  "currency": "USDC",
  "to": "merchant.example.api",
  "description": "Server API access fee"
}`}</CodeBlock>
      <p>
        The facilitator responds with a JSON payload containing the{' '}
        <code>sessionId</code>, payment status, and expiry time.
      </p>

      <br />
      <h2 id="typical-server-flow">Typical Server Flow</h2>
      <p>A backend integration usually follows these steps:</p>
      <ol>
        <li>Receive a client request for a paid resource.</li>
        <li>Create a payment session using the Facilitator API.</li>
        <li>Return the session details to the client (or SDK).</li>
        <li>
          Wait for verification via <code>/verify</code> endpoint or webhook.
        </li>
        <li>Unlock access when the payment is confirmed.</li>
      </ol>

      <br />
      <h2 id="expressjs-integration">Express.js Integration</h2>
      <CodeBlock language="ts">{`import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/api/premium", async (req, res) => {
  const session = await fetch("https://facilitator.x402.io/api/payment/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: "0.001",
      currency: "ETH",
      to: "merchant.api/premium",
      description: "Premium API Access",
    }),
  }).then((r) => r.json());

  // Return 402 if payment required
  return res.status(402).json(session);
});

app.listen(3000, () => console.log("Server running on port 3000"));`}</CodeBlock>

      <br />
      <h2 id="verifying-a-session">Verifying a Session</h2>
      <p>
        Once a client completes the transaction via the facilitator, the server
        should verify settlement using:
      </p>
      <pre>
        <code>
          GET
          https://facilitator.x402.io/api/payment/verify?sessionId=sess_abc123
        </code>
      </pre>
      <p>
        A valid response confirms on-chain finality or off-chain proof of
        payment. Invalid or pending sessions will return an informative status
        payload for retry handling.
      </p>

      <br />
      <h2 id="handling-expired-sessions">Handling Expired Sessions</h2>
      <p>
        Each session includes an <code>expiresIn</code> field (default: 10
        minutes). After expiration, Buyers must create a new payment session to
        retry. Attempting to verify an expired session will return:
      </p>
      <CodeBlock language="json">{`{
  "status": "expired",
  "message": "Payment session expired. Please create a new one."
}`}</CodeBlock>

      <br />
      <h2 id="webhooks">Webhooks (Coming Soon)</h2>
      <p>
        The Facilitator will soon support <strong>webhook callbacks</strong> for
        automatic payment confirmation. When enabled, your server can register a
        webhook endpoint like:
      </p>
      <pre>
        <code>POST https://merchant.example.com/webhooks/x402</code>
      </pre>
      <p>Each callback will include:</p>
      <CodeBlock language="json">{`{
  "event": "payment.completed",
  "sessionId": "sess_abc123",
  "txHash": "0xabc123...",
  "payer": "0xBuyerAddress",
  "amount": "1.00",
  "currency": "USDC"
}`}</CodeBlock>
      <p>
        Webhook delivery will include retry logic and signature headers for
        verification.
      </p>

      <br />
      <h2 id="api-keys">API Keys (Planned)</h2>
      <p>
        In the upcoming release, production facilitator instances will require
        <code>apiKey</code> authentication for security and quota management.
        Keys will be generated via the x402 Developer Dashboard (coming soon).
      </p>

      <PageFooterNav
        prev={{
          title: 'SDK Integration (Client)',
          href: '/docs/integration/sdk-integration',
        }}
        next={{
          title: 'Testing Sandbox',
          href: '/docs/integration/testing-sandbox',
        }}
        prevGroup={{
          title: 'Core Concepts',
          href: '/docs/core-concepts/network-support',
        }}
      />
    </>
  );
}
