import { CodeBlock } from '@/app/components/CodeBlock';
import { PageFooterNav } from '@/app/components/PageFooterNav';
import React from 'react';

export default function TestingSandbox() {
  return (
    <>
      <h5>Integration Guides</h5>
      <h1>Testing Sandbox</h1>
      <p className="lead">
        The <strong>x402 Sandbox</strong> lets developers test integrations
        without handling real payments or tokens. It simulates the full
        facilitator lifecycle — from session creation to settlement — using safe
        mock transactions and predictable responses.
      </p>

      <br />
      <h2 id="sandbox-mode-overview">Sandbox Mode Overview</h2>
      <p>
        All public facilitator endpoints currently operate in{' '}
        <code>testing</code> (sandbox) mode by default. This means:
      </p>
      <ul>
        <li>No on-chain transactions are broadcast.</li>
        <li>No real tokens or wallets are required.</li>
        <li>All responses emulate production behavior deterministically.</li>
      </ul>

      <br />
      <h2 id="sandbox-endpoint">Sandbox Endpoint</h2>
      <p>
        The main facilitator API automatically routes to a simulated settlement
        environment:
      </p>
      <pre>
        <code>{`https://facilitator.x402.io/api/payment/session`}</code>
      </pre>
      <p>
        The same endpoint will later serve both sandbox and production networks,
        differentiated by your facilitator configuration or API key scope.
      </p>

      <br />
      <h2 id="simulated-flow">Simulated Flow</h2>
      <p>
        The sandbox mimics a complete Buyer → Facilitator → Seller lifecycle:
      </p>
      <ol>
        <li>Buyer requests a session from the facilitator.</li>
        <li>
          The facilitator returns a mock <code>sessionId</code>.
        </li>
        <li>A delayed (mock) “settlement” is simulated internally.</li>
        <li>Verification endpoints confirm payment as completed.</li>
      </ol>
      <CodeBlock language="json">{`{
  "sessionId": "sandbox_sess_12345",
  "status": "completed",
  "txHash": "0xsandboxmocktx123",
  "payer": "0x0000000000000000000000000000000000000000",
  "amount": "0.001",
  "currency": "ETH"
}`}</CodeBlock>

      <br />
      <h2 id="triggering-test-responses">Triggering Test Responses</h2>
      <p>
        You can trigger specific outcomes by setting the <code>amount</code>{' '}
        field in your session payload:
      </p>
      <table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Simulated Response</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>0.001</code>
            </td>
            <td>Payment completed successfully</td>
          </tr>
          <tr>
            <td>
              <code>0.002</code>
            </td>
            <td>Pending confirmation</td>
          </tr>
          <tr>
            <td>
              <code>0.003</code>
            </td>
            <td>Expired session</td>
          </tr>
          <tr>
            <td>
              <code>0.004</code>
            </td>
            <td>Invalid request (400 error)</td>
          </tr>
        </tbody>
      </table>
      <p>
        This approach makes automated testing and CI integration straightforward
        without deploying custom mocks.
      </p>

      <br />
      <h2 id="verifying-sandbox-transactions">
        Verifying Sandbox Transactions
      </h2>
      <p>Once a sandbox session is created, you can verify it via:</p>
      <pre>
        <code>{`GET https://facilitator.x402.io/api/payment/verify?sessionId=sandbox_sess_12345`}</code>
      </pre>
      <p>
        The facilitator will respond with a static settlement result
        corresponding to the simulated outcome.
      </p>

      <br />
      <h2 id="debugging-and-logging">Debugging and Logging</h2>
      <p>The sandbox supports verbose logging and debugging through headers:</p>
      <pre>
        <code>{`X-Debug: true`}</code>
      </pre>
      <p>
        Adding this header to your request will include detailed timing,
        validation, and mock transaction metadata in the response — ideal for
        SDK testing or integration diagnostics.
      </p>

      <br />
      <h2 id="limitations">Limitations</h2>
      <ul>
        <li>No persistent session storage — sandbox data resets daily.</li>
        <li>No cross-chain simulations yet (EVM-only for now).</li>
        <li>Webhook delivery is stubbed but logged for preview.</li>
      </ul>

      <br />
      <h2 id="transitioning-to-production">Transitioning to Production</h2>
      <p>
        Once API keys and production facilitators become available, you’ll be
        able to switch environments simply by changing your base URL or SDK
        configuration:
      </p>
      <CodeBlock language="ts">{`// Sandbox
const client = new X402({ baseUrl: "https://facilitator.x402.io" });

// Production (coming soon)
const client = new X402({ baseUrl: "https://api.x402.io", apiKey: "your-key" });`}</CodeBlock>

      <PageFooterNav
        prev={{
          title: 'API Integration (Server)',
          href: '/docs/integration/api-integration',
        }}
        next={{
          title: 'Settlements & Receipts',
          href: '/docs/integration/settlements-receipts',
        }}
        prevGroup={{
          title: 'Core Concepts',
          href: '/docs/core-concepts/network-support',
        }}
      />
    </>
  );
}
