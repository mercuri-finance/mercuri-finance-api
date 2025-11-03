import { PageFooterNav } from '@/app/components/PageFooterNav';
import { CodeBlock } from '@/app/components/CodeBlock';
import React from 'react';

export default function UsingFacilitatorService() {
  return (
    <>
      <h5>Integration Guides</h5>
      <h1>Using the Facilitator Service</h1>
      <p className="lead">
        The <strong>x402 Facilitator Service</strong> is the core component that
        coordinates payments between Buyers and Sellers. It handles session
        creation, transaction routing, and verification of successful
        settlements — allowing developers to add payments to any HTTP API
        without managing wallets or tokens directly.
      </p>

      <br />
      <h2 id="public-endpoint">Public Endpoint</h2>
      <p>
        The facilitator service is available for public use during this phase.
        No API key is required. You can start using the shared endpoint below:
      </p>
      <pre>
        <code>https://facilitator.x402.io/api/payment/session</code>
      </pre>
      <p>
        All requests are made using standard JSON payloads. The facilitator
        responds with session data that represents the pending transaction to be
        approved or signed.
      </p>

      <br />
      <h2 id="creating-a-payment-session">Creating a Payment Session</h2>
      <p>
        A <code>POST</code> request to <code>/api/payment/session</code> creates
        a new payment session. Include details such as the amount, currency, and
        destination service:
      </p>
      <CodeBlock language="http">{`POST https://facilitator.x402.io/api/payment/session
Content-Type: application/json

{
  "amount": "0.0025",
  "currency": "ETH",
  "to": "merchant.example.api",
  "description": "Access to premium resource"
}`}</CodeBlock>

      <p>The facilitator returns a response like this:</p>
      <CodeBlock language="json">{`{
  "sessionId": "sess_7f8b13f",
  "status": "pending",
  "chain": "ethereum",
  "amount": "0.0025",
  "currency": "ETH",
  "expiresIn": 600
}`}</CodeBlock>

      <br />
      <h2 id="checking-session-status">Checking Session Status</h2>
      <p>
        You can check the current status of a session using the{' '}
        <code>/api/payment/status</code> endpoint:
      </p>
      <pre>
        <code>
          GET
          https://facilitator.x402.io/api/payment/status?sessionId=sess_7f8b13f
        </code>
      </pre>

      <p>A completed transaction will return:</p>
      <CodeBlock language="json">{`{
  "status": "completed",
  "txHash": "0xabc123...",
  "payer": "0xBuyerAddress",
  "amount": "0.0025",
  "currency": "ETH"
}`}</CodeBlock>

      <br />
      <h2 id="verifying-a-payment">Verifying a Payment</h2>
      <p>
        Sellers can verify if a payment has been completed by calling the{' '}
        <code>/api/payment/verify</code> endpoint:
      </p>
      <pre>
        <code>
          GET
          https://facilitator.x402.io/api/payment/verify?sessionId=sess_7f8b13f
        </code>
      </pre>
      <p>
        The facilitator validates on-chain settlement and signature data before
        confirming payment. A verified response ensures the session has been
        securely settled.
      </p>

      <br />
      <h2 id="error-handling">Error Handling</h2>
      <p>The facilitator follows standard HTTP status codes for errors:</p>
      <ul>
        <li>
          <code>400</code> — Invalid request payload
        </li>
        <li>
          <code>404</code> — Unknown or expired session
        </li>
        <li>
          <code>500</code> — Internal error (retry or contact support)
        </li>
      </ul>
      <p>
        During public access, errors are non-fatal and primarily informative for
        testing or integration debugging.
      </p>

      <br />
      <h2 id="upcoming-features">Upcoming Features</h2>
      <ul>
        <li>
          <strong>API keys</strong> — required for production facilitator use
          (coming soon)
        </li>
        <li>
          <strong>Webhook callbacks</strong> — automatic notifications when
          payments are completed
        </li>
        <li>
          <strong>Custom routing</strong> — choose preferred network or token
          for each payment
        </li>
      </ul>

      <br />
      <h2 id="example-flow-summary">Example Flow Summary</h2>
      <CodeBlock language="txt">{`┌───────────┐       ┌──────────┐       ┌─────────────┐       ┌────────────┐
│   Buyer   │──────▶│  Seller  │──────▶│ Facilitator │──────▶│ Blockchain │
└───────────┘       └──────────┘       └─────────────┘       └────────────┘
       ▲                                                          │
       └──────────────────────────◀──────────-────────────────────┘
                  Payment Proof & Access Granted
`}</CodeBlock>

      <p>
        The facilitator abstracts away blockchain complexity, providing a simple
        REST-based interface for all sides of the transaction.
      </p>

      <PageFooterNav
        next={{
          title: 'SDK Integration (Client)',
          href: '/docs/integration/sdk-integration',
        }}
        prevGroup={{
          title: 'Core Concepts',
          href: '/docs/core-concepts/network-support',
        }}
      />
    </>
  );
}
