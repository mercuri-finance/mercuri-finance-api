import { PageFooterNav } from '@/app/components/PageFooterNav';

export default function PlatformOverview() {
  return (
    <>
      <h5>Introduction</h5>
      <h1>Platform Overview</h1>
      <p>
        The x402 ecosystem brings together multiple layers that enable seamless,
        instant, and programmable payments across web services and blockchain
        environments.
      </p>
      <br />

      <h2 id="core-layers">Core Layers</h2>
      <ul>
        <li>
          <strong>Protocol Layer:</strong> Defines the x402 HTTP response
          standard and message flow between clients, facilitators, and servers.
        </li>
        <li>
          <strong>Discovery Layer (Bazaar):</strong> Allows applications to
          advertise payment endpoints and capabilities in a decentralized
          catalog.
        </li>
        <li>
          <strong>Network Layer:</strong> Provides payment routing,
          verification, and settlement using supported blockchains and tokens.
        </li>
      </ul>
      <p>
        Together, these layers enable a universal pay-per-use model — from
        microtransactions to subscription billing — all through standard web
        requests.
      </p>
      <br />

      <h2 id="how-the-layers-work-together">How the Layers Work Together</h2>
      <p>
        Each layer in the x402 architecture is modular but interoperable. The
        protocol defines the language, the discovery layer enables visibility,
        and the network layer ensures trust and settlement — creating a complete
        and open payments framework for the web.
      </p>
      <br />

      <h2 id="benefits">Benefits</h2>
      <ul>
        <li>Universal monetization model for APIs and digital services.</li>
        <li>Cross-chain and cross-platform compatibility.</li>
        <li>Simple HTTP-based integration for developers.</li>
        <li>Transparent verification and settlement tracking.</li>
      </ul>

      <PageFooterNav
        prev={{
          title: 'What is x402',
          href: '/docs/introduction/what-is-x402',
        }}
        next={{
          title: 'Open Source',
          href: '/docs/introduction/open-source',
        }}
        nextGroup={{
          title: 'Getting Started',
          href: '/docs/getting-started/setup-guide',
        }}
      />
    </>
  );
}
