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

export function PaymentResponse(): JSX.Element {
  return (
    <Content>
      <h5>Schemas</h5>
      <h1>PaymentResponse Schema</h1>
      <p>
        The <code>PaymentResponse</code> object represents the facilitator’s
        response to a verification or settlement request.
      </p>
      <br />

      <SchemaTable
        title="Fields"
        fields={[
          {
            name: 'x402Version',
            type: 'number',
            required: true,
            description: 'Protocol version (currently 1).',
          },
          {
            name: 'event',
            type: '"payment.verified" | "payment.settled" | "payment.failed"',
            required: true,
            description: 'Type of payment event returned by the facilitator.',
          },
          {
            name: 'sessionId',
            type: 'string',
            required: true,
            description: 'Linked payment session ID.',
          },
          {
            name: 'network',
            type: 'string',
            required: true,
            description: 'Blockchain network used for processing.',
          },
          {
            name: 'txHash',
            type: 'string',
            required: false,
            description:
              'Transaction hash if the transfer executed successfully.',
          },
          {
            name: 'timestamp',
            type: 'string (ISO 8601)',
            required: true,
            description: 'Event timestamp from the facilitator.',
          },
          {
            name: 'error',
            type: 'string',
            required: false,
            description: 'Error message (if event = payment.failed).',
          },
        ]}
      />

      <br />
      <Label>Example Successful Response</Label>
      <CodeBlock language="json">{`{
  "x402Version": 1,
  "event": "payment.settled",
  "sessionId": "sess_01HE8G9T8WZ3A",
  "network": "base-sepolia",
  "txHash": "0xabc123...",
  "timestamp": "2025-10-31T09:02:12.280Z"
}`}</CodeBlock>

      <br />
      <Label>Example Failed Response</Label>
      <CodeBlock language="json">{`{
  "x402Version": 1,
  "event": "payment.failed",
  "sessionId": "sess_01HE8G9T8WZ3A",
  "network": "solana-devnet",
  "timestamp": "2025-10-31T09:03:15.103Z",
  "error": "Invalid signature provided"
}`}</CodeBlock>
      <PageFooterNav
        next={{
          title: 'Token Info',
          href: '/schema/token-info',
        }}
        prev={{
          title: 'Payment Session',
          href: '/schema/payment-session',
        }}
        prevGroup={{
          title: 'Endpoints',
          href: '/api/settle',
        }}
      />
    </Content>
  );
}
