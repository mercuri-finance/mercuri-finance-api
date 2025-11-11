import React from 'react';
import styled from 'styled-components';

import { Label } from '@/app/components/Label';
import { SchemaTable } from '@/app/components/SchemaTable';
import { CodeBlock } from '@/app/components/CodeBlock';
import { PageFooterNav } from '@/app/components/PageFooterNav';

const Content = styled.div`
  overflow-y: auto;

  p {
    color: #aeb9c8;
    line-height: 1.5;
  }
`;

export function PaymentSession(): JSX.Element {
  return (
    <Content>
      <h5>Schemas</h5>
      <h1>PaymentSession Schema</h1>
      <p>
        The <code>PaymentSession</code> object represents the complete lifecycle
        of a payment authorization, verification, and settlement event within
        the X402 protocol.
      </p>
      <br />

      <SchemaTable
        title="Fields"
        fields={[
          {
            name: 'sessionId',
            type: 'string',
            required: true,
            description: 'Unique identifier for the payment session.',
          },
          {
            name: 'status',
            type: '"pending" | "verified" | "settled" | "failed"',
            required: true,
            description: 'Current session state.',
          },
          {
            name: 'network',
            type: 'string',
            required: true,
            description:
              'Blockchain network used (e.g. base-sepolia, solana-devnet).',
          },
          {
            name: 'scheme',
            type: 'string',
            required: true,
            description: 'Payment scheme type (currently always "exact").',
          },
          {
            name: 'asset',
            type: 'string',
            required: true,
            description: 'Token address or mint used for payment (e.g. USDC).',
          },
          {
            name: 'from',
            type: 'string',
            required: false,
            description: 'Sender or payer wallet address.',
          },
          {
            name: 'to',
            type: 'string',
            required: false,
            description: 'Recipient wallet address.',
          },
          {
            name: 'value',
            type: 'string',
            required: false,
            description: 'Amount being transferred, in token units.',
          },
          {
            name: 'createdAt',
            type: 'string (ISO 8601)',
            required: true,
            description: 'Timestamp when the session was created.',
          },
          {
            name: 'updatedAt',
            type: 'string (ISO 8601)',
            required: false,
            description: 'Last modification timestamp.',
          },
        ]}
      />

      <br />
      <Label>Example</Label>
      <CodeBlock language="json">{`{
  "sessionId": "sess_01HE8G9T8WZ3A",
  "status": "verified",
  "network": "base-sepolia",
  "scheme": "exact",
  "asset": "0xUSDC...",
  "from": "0xSender...",
  "to": "0xRecipient...",
  "value": "1000000",
  "createdAt": "2025-10-31T09:00:00.000Z",
  "updatedAt": "2025-10-31T09:05:32.000Z"
}`}</CodeBlock>
      <PageFooterNav
        next={{
          title: 'Payment Response',
          href: '/schema/payment-response',
        }}
        prevGroup={{
          title: 'Endpoints',
          href: '/api/settle',
        }}
      />
    </Content>
  );
}
