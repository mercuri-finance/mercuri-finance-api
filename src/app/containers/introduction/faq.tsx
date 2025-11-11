import { PageFooterNav } from '@/app/components/PageFooterNav';

export default function FAQ() {
  return (
    <>
      <h5>Introduction</h5>
      <h1>Common Questions</h1>
      <p className="lead">
        This section answers the most common questions developers have when
        getting started with x402 — from what it means, to how it integrates
        with existing APIs and payment systems.
      </p>
      <br />

      <h2 id="what-does-x402-mean">What does “x402” mean?</h2>
      <p>
        The name comes from the <code>HTTP 402 Payment Required</code> status
        code — a reserved but rarely used part of the web protocol. x402 revives
        it as a universal payment gateway for APIs and services.
      </p>
      <br />

      <h2 id="is-x402-blockchain-only">Is x402 blockchain-only?</h2>
      <p>
        No. x402 works across both blockchain and traditional payment networks.
        Its goal is to unify payment communication, not lock developers into one
        ecosystem.
      </p>
      <br />

      <h2 id="can-i-integrate-x402">
        Can I integrate x402 in my existing API?
      </h2>
      <p>
        Absolutely. You can add x402 support to any REST or GraphQL API with
        minimal changes. Simply return <code>HTTP 402</code> when a payment is
        required, and implement a compatible facilitator or wallet for
        settlement.
      </p>
      <br />

      <h2 id="where-can-i-test-it">Where can I test it?</h2>
      <p>
        Try the official sandbox available in the x402 SDK. It provides a
        simulated facilitator and wallet environment for local development and
        testing.
      </p>

      <PageFooterNav
        prev={{
          title: 'Quick Deploy Template',
          href: '/docs/introduction/quick-deploy-template',
        }}
        nextGroup={{
          title: 'Getting Started',
          href: '/docs/getting-started/setup-guide',
        }}
      />
    </>
  );
}
