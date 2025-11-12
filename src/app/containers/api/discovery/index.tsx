// src/app/pages/api/Discover.tsx

import React from 'react';
import styled from 'styled-components';
import { CodeBlock } from '../../../components/CodeBlock';
import { SchemaTable } from '../../../components/SchemaTable';
import { Label } from '@/app/components/Label';
import { Badge } from '@/app/components/Badge/styles';
import { PageFooterNav } from '@/app/components/PageFooterNav';
import { Alert } from '@/app/components/Alert/styles';

const Content = styled.div`
  overflow-y: auto;

  p {
    color: #aeb9c8;
    line-height: 1.5;
  }
`;

export const Discover = () => {
  return (
    <Content>
      <h5>Endpoints</h5>
      <h1>Discover Facilitator</h1>
      <p>
        The <code>/v2/x402/discover</code> endpoint provides metadata about the
        Mercuri Finance facilitator, including supported networks, assets, and
        payment schemes. It enables discovery platforms such as{' '}
        <a href="https://www.x402scan.com" target="_blank" rel="noreferrer">
          X402Scan
        </a>{' '}
        to automatically list facilitator details and capabilities.
      </p>

      <Alert $variant="info">
        <strong>Info:</strong> The <code>/discover</code> endpoint is primarily
        used by explorers, wallets, and payment platforms to automatically
        identify this facilitator’s capabilities. You can also query it directly
        to confirm network and asset support without hardcoding configuration
        values.
      </Alert>
      <Badge method="GET">GET</Badge>
      <br />
      <br />
      <h3>Request</h3>

      <CodeBlock language="HTTPS">
        GET https://facilitator.mercuri.finance/v2/x402/disocver
      </CodeBlock>
      <br />
      <p>This endpoint does not require a request body.</p>
      <br />
      <h3>Response</h3>

      <SchemaTable
        title="Response Fields"
        fields={[
          {
            name: 'name',
            type: 'string',
            required: true,
            description: 'Facilitator name (e.g., "Mercuri Finance").',
          },
          {
            name: 'supported',
            type: 'object',
            required: true,
            description:
              'Lists supported networks, schemes, and assets by the facilitator.',
          },
          {
            name: 'contact',
            type: 'object',
            required: true,
            description:
              'Facilitator contact information and documentation URLs.',
          },
        ]}
      />
      <br />
      <Label>Example Response</Label>
      <CodeBlock language="json">{`{
  "name": "Mercuri Finance",
  "description": "Facilitator for on-chain payments across Base and Solana using the open x402 protocol.",
  "x402Version": 1,
  "supported": {
    "schemes": ["exact"],
    "networks": ["base", "solana-mainnet"],
    "assets": [
      "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
      "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
    ]
  }
}`}</CodeBlock>

      <PageFooterNav
        next={{
          title: 'List Supported Kinds',
          href: '/api/supported',
        }}
      />
    </Content>
  );
};
