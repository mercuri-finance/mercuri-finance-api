import { PageFooterNav } from '@/app/components/PageFooterNav';

export default function WhatIsX402() {
  return (
    <>
      <h5>Introduction</h5>
      <h1>What is x402</h1>
      <p className="lead">
        x402 is an open web standard that extends the HTTP protocol to include
        native payment support. It’s designed to make APIs, digital products,
        and services directly monetizable without intermediaries.
      </p>
      <br />
      <h2 id="overview">Overview</h2>
      <p>
        <strong>x402</strong> is an open web standard for payments — designed to
        make APIs, digital products, and services monetizable natively through
        the web.
      </p>
      <br />
      <h2 id="how-it-works">How It Works</h2>
      <p>
        It builds on the <code>HTTP 402 Payment Required</code> status code to
        define a clear, interoperable payment layer for both on-chain and
        off-chain use cases. Instead of reinventing payments for every app or
        protocol, x402 makes monetization part of the HTTP layer itself.
      </p>
      <br />
      <h2 id="use-cases">Use Cases</h2>
      <p>
        Whether you're building a blockchain API, AI microservice, or digital
        marketplace, x402 lets you accept payments with minimal friction and
        full interoperability.
      </p>

      <PageFooterNav
        next={{
          title: 'Platform Overview',
          href: '/docs/introduction/platform-overview',
        }}
        nextGroup={{
          title: 'Getting Started',
          href: '/docs/getting-started/setup-guide',
        }}
      />
    </>
  );
}
