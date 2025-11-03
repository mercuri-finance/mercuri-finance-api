import { PageFooterNav } from '@/app/components/PageFooterNav';
import { CodeBlock } from '@/app/components/CodeBlock';
import React from 'react';

export default function SDKIntegration() {
  return (
    <>
      <h5>Integration Guides</h5>
      <h1>SDK Integration (Client)</h1>
      <p className="lead">
        The <strong>x402 SDKs</strong> provide a simple, high-level interface
        for integrating payments directly into your client or backend
        application. They wrap the HTTP facilitator endpoints with convenient
        helpers for creating, verifying, and tracking payment sessions.
      </p>

      <br />
      <h2 id="sdk-availability">SDK Availability</h2>
      <p>
        Official SDKs are currently in development and will be published to:
      </p>
      <ul>
        <li>
          <code>@x402/sdk</code> — JavaScript / TypeScript (NPM)
        </li>
        <li>
          <code>x402-sdk</code> — Python (PyPI)
        </li>
      </ul>
      <p>
        Both SDKs will expose identical core functionality, with syntax tailored
        to each language’s ecosystem.
      </p>

      <br />
      <h2 id="installation">Installation</h2>
      <CodeBlock language="bash">{`# JavaScript / TypeScript
npm install @x402/sdk

# or using yarn
yarn add @x402/sdk

# Python
pip install x402-sdk`}</CodeBlock>

      <br />
      <h2 id="javascript-example">JavaScript Example</h2>
      <p>
        The JavaScript SDK can be used in Node.js, browser-based clients, or
        edge runtimes like Vercel Functions:
      </p>
      <CodeBlock language="ts">{`import { X402 } from "@x402/sdk";

const client = new X402({
  baseUrl: "https://facilitator.x402.io",
});

const session = await client.createSession({
  amount: "0.0025",
  currency: "ETH",
  to: "merchant.example.api",
});

console.log("Session ID:", session.id);

const result = await client.verify(session.id);

if (result.status === "completed") {
  console.log("Payment verified!");
}`}</CodeBlock>
      <p>
        The SDK automatically handles session creation, retries, and error
        handling internally, reducing the need for custom facilitator logic.
      </p>

      <br />
      <h2 id="python-example">Python Example</h2>
      <p>
        The Python SDK is ideal for backend automation, serverless functions,
        and service integrations:
      </p>
      <CodeBlock language="py">{`from x402 import X402

client = X402(base_url="https://facilitator.x402.io")

session = client.create_session(
    amount="0.0025",
    currency="ETH",
    to="merchant.example.api",
)

print("Session:", session["sessionId"])

result = client.verify(session["sessionId"])

if result["status"] == "completed":
    print("Payment verified!")`}</CodeBlock>
      <p>
        Both SDKs follow the same flow: <code>create → verify → complete</code>.
        Once the SDK confirms completion, your app can safely deliver the
        requested resource.
      </p>

      <br />
      <h2 id="configuration-options">Configuration Options</h2>
      <p>SDK initialization supports custom configuration parameters:</p>
      <ul>
        <li>
          <code>baseUrl</code> — override the default facilitator endpoint
        </li>
        <li>
          <code>apiKey</code> — optional key (for private deployments)
        </li>
        <li>
          <code>network</code> — specify preferred blockchain (e.g.{' '}
          <code>base</code>, <code>polygon</code>)
        </li>
        <li>
          <code>autoRetry</code> — automatically retry failed session checks
        </li>
      </ul>

      <br />
      <h2 id="handling-errors">Handling Errors</h2>
      <p>
        The SDK provides consistent error responses via exceptions or structured
        results:
      </p>
      <CodeBlock language="ts">{`try {
  const result = await client.verify("sess_123");
} catch (err) {
  console.error("Payment failed:", err.message);
}`}</CodeBlock>
      <p>
        In Python, the SDK raises <code>X402Error</code> for invalid sessions or
        failed verifications.
      </p>

      <br />
      <h2 id="upcoming-features">Upcoming Features</h2>
      <ul>
        <li>TypeScript type definitions and VSCode IntelliSense</li>
        <li>Browser wallet adapter integration</li>
        <li>Automatic signature validation for EIP-712 tokens</li>
        <li>CLI tool for quick testing and debugging</li>
      </ul>

      <PageFooterNav
        prev={{
          title: 'Using the Facilitator Service',
          href: '/docs/integration/using-facilitator-service',
        }}
        next={{
          title: 'API Integration (Server)',
          href: '/docs/integration/api-integration',
        }}
        prevGroup={{
          title: 'Core Concepts',
          href: '/docs/core-concepts/network-support',
        }}
      />
    </>
  );
}
