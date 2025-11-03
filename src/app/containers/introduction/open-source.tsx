import { PageFooterNav } from '@/app/components/PageFooterNav';
import React from 'react';

export default function OpenSource() {
  return (
    <>
      <h5>Introduction</h5>
      <h1>Open Source & Contributions</h1>
      <p>
        <strong>x402</strong> is a fully open-source initiative built by and for
        the web community. Its specification, SDKs, and example integrations are
        collaboratively developed to promote transparency, interoperability, and
        developer freedom.
      </p>
      <p>
        Every part of x402 — from the core protocol to example projects — is
        designed and maintained in the open. Developers are encouraged to
        contribute by improving documentation, fixing issues, or proposing new
        ideas for protocol evolution.
      </p>
      <br />

      <h2 id="repositories">Repositories</h2>
      <ul>
        <li>
          <a
            href="https://github.com/coinbase/x402"
            target="_blank"
            rel="noopener noreferrer"
          >
            x402 Repository (coinbase/x402)
          </a>{' '}
          — core protocol specification, SDKs, and implementation guides.
        </li>
        <li>
          <a
            href="https://github.com/coinbase/x402/tree/main/examples"
            target="_blank"
            rel="noopener noreferrer"
          >
            x402 Examples
          </a>{' '}
          — practical reference projects for clients, facilitators, and wallets.
        </li>
      </ul>
      <br />

      <h2 id="documentation">Documentation</h2>
      <ul>
        <li>
          <a
            href="https://x402.gitbook.io/x402"
            target="_blank"
            rel="noopener noreferrer"
          >
            x402 GitBook Documentation
          </a>{' '}
          — full user guide, protocol overview, and API documentation.
        </li>
        <li>
          <a
            href="https://github.com/coinbase/x402?tab=contributing-ov-file"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contributing Guidelines
          </a>{' '}
          — contribution workflow, code standards, and issue reporting process.
        </li>
      </ul>
      <br />

      <h2 id="contributing">Contributing</h2>
      <p>
        Contributions are welcome! To get started, check out the{' '}
        <code>CONTRIBUTING.md</code> and <code>CODE_OF_CONDUCT.md</code> files
        in the main repository. Whether you're fixing bugs, improving docs, or
        extending SDK support, your contributions help shape the x402 standard.
      </p>
      <p>
        Join discussions, propose improvements, or share ideas directly in the{' '}
        <a
          href="https://github.com/coinbase/x402/discussions"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Discussions
        </a>{' '}
        section.
      </p>

      <PageFooterNav
        prev={{
          title: 'Platform Overview',
          href: '/docs/introduction/platform-overview',
        }}
        next={{
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
