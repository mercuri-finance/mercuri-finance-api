import { PageFooterNav } from '@/app/components/PageFooterNav';
import React from 'react';

export default function ClientServerRoles() {
  return (
    <>
      <h5>Core Concepts</h5>
      <h1>Client / Server Roles</h1>
      <p className="lead">
        In x402, clients, servers, and facilitators each have defined roles that
        keep payment communication simple, secure, and interoperable.
      </p>
      <br />
      <h2 id="client">Client</h2>
      <p>
        The client (consumer) sends a standard HTTP request. If payment is
        required, it receives a <code>402</code> response with payment
        instructions from the facilitator or API.
      </p>
      <br />
      <h2 id="server">Server</h2>
      <p>
        The server (provider) issues the <code>402</code> response and defines
        payment conditions, pricing, and validity rules. It remains agnostic to
        payment networks.
      </p>
      <br />
      <h2 id="facilitator">Facilitator</h2>
      <p>
        The facilitator bridges the client and server — handling wallet
        verification, settlements, and token transfers. It abstracts payment
        logic, making the API developer’s job simpler.
      </p>

      <PageFooterNav
        prev={{
          title: 'HTTP 402 Explained',
          href: '/docs/core-concepts/http-402',
        }}
        next={{
          title: 'Facilitator',
          href: '/docs/core-concepts/facilitator',
        }}
        prevGroup={{
          title: 'Getting Started',
          href: '/docs/getting-started/Integrate-seller',
        }}
        nextGroup={{
          title: 'Integration Guides',
          href: '/docs/integration/using-facilitator-service',
        }}
      />
    </>
  );
}
