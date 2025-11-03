import React from 'react';
import styled from 'styled-components';
import { Badge } from '@/app/components/Badge/styles';
import { CodeBlock } from '../../../components/CodeBlock';
import { SchemaTable } from '../../../components/SchemaTable';
import { Label } from '@/app/components/Label';
import { PageFooterNav } from '@/app/components/PageFooterNav';

const Content = styled.div`
  overflow-y: auto;

  p {
    color: #aeb9c8;
    line-height: 1.5;
  }
`;

export const Settle = () => {
  return (
    <Content>
      <h5>Endpoints</h5>
      <h1>Settle a Verified Payment</h1>
      <p>
        The <code>/v2/x402/settle</code> endpoint finalizes a previously
        verified X402 payment session. It executes the EIP-3009 (or Solana
        equivalent) on-chain transfer using the provided payment header.
        <br />
        <br />
        On success, the facilitator returns a <code>payment.settled</code> event
        including transaction details. If settlement fails, a{' '}
        <code>payment.failed</code> event is returned with a descriptive error
        message.
      </p>

      <Badge method="POST">POST</Badge>
      <br />
      <br />
      <h3>Request</h3>
      <CodeBlock language="HTTPS">
        POST https://facilitator.mercuri.finance/v2/x402/settle
      </CodeBlock>
      <br />

      <SchemaTable
        title="Request Body"
        fields={[
          {
            name: 'x402Version',
            type: 'number',
            required: true,
            description: 'Protocol version (currently 1).',
          },
          {
            name: 'paymentHeader',
            type: 'string',
            required: true,
            description:
              'Base64-encoded X402 payment header containing the signed authorization payload (EIP-3009 or Solana transfer).',
          },
          {
            name: 'paymentRequirements',
            type: 'object',
            required: true,
            description:
              'Object describing the payment scheme, target network, and recipient configuration.',
          },
        ]}
      />
      <br />

      <SchemaTable
        title="Payment Requirements Fields"
        fields={[
          {
            name: 'scheme',
            type: '"exact"',
            required: true,
            description: 'Payment scheme type (currently always "exact").',
          },
          {
            name: 'network',
            type: 'string',
            required: true,
            description: (
              <>
                Blockchain network identifier supported by the facilitator. See{' '}
                <a href={`${import.meta.env.VITE_DOCS_URL!}/docs/networks`}>
                  Networks Reference
                </a>{' '}
                for details.
              </>
            ),
          },
          {
            name: 'payTo',
            type: 'string',
            required: true,
            description:
              'Recipient address expected to receive funds on-chain.',
          },
          {
            name: 'asset',
            type: 'string',
            required: true,
            description:
              'USDC token contract or mint address on the specified network.',
          },
          {
            name: 'description',
            type: 'string',
            required: false,
            description: 'Description or purpose of the payment.',
          },
          {
            name: 'mimeType',
            type: 'string',
            required: false,
            description: 'Payload MIME type, typically "application/json".',
          },
          {
            name: 'maxAmountRequired',
            type: 'string',
            required: false,
            description: 'Maximum allowed payment amount as a string.',
          },
          {
            name: 'maxTimeoutSeconds',
            type: 'number',
            required: false,
            description: 'Maximum timeout for payment validity in seconds.',
          },
          {
            name: 'resource',
            type: 'string',
            required: false,
            description: 'Optional linked resource or API endpoint reference.',
          },
          {
            name: 'extra',
            type: 'object',
            required: false,
            description:
              'Optional metadata or facilitator-specific parameters.',
          },
          {
            name: 'outputSchema',
            type: 'object',
            required: false,
            description:
              'Optional schema describing expected output or downstream usage.',
          },
        ]}
      />

      <br />
      <br />
      <h3>Response</h3>
      <SchemaTable
        title="Response Fields"
        fields={[
          {
            name: 'x402Version',
            type: 'number',
            required: true,
            description: 'Protocol version (currently 1).',
          },
          {
            name: 'event',
            type: '"payment.settled" | "payment.failed"',
            required: true,
            description:
              'Event type describing the result of the settlement attempt.',
          },
          {
            name: 'txHash',
            type: 'string',
            required: false,
            description:
              'Transaction hash of the settlement if executed on-chain.',
          },
          {
            name: 'from',
            type: 'string',
            required: false,
            description:
              'Address that authorized and sent the payment (present on success).',
          },
          {
            name: 'to',
            type: 'string',
            required: false,
            description:
              'Recipient address that received the payment (present on success).',
          },
          {
            name: 'value',
            type: 'string',
            required: false,
            description: 'Amount transferred in token units (e.g., "1000000").',
          },
          {
            name: 'blockNumber',
            type: 'number',
            required: false,
            description:
              'Block number where the transaction was confirmed (if applicable).',
          },
          {
            name: 'network',
            type: 'string',
            required: true,
            description: 'Blockchain network used for settlement.',
          },
          {
            name: 'timestamp',
            type: 'string (ISO 8601)',
            required: true,
            description:
              'Timestamp indicating when the event was emitted by the facilitator.',
          },
          {
            name: 'error',
            type: 'string',
            required: false,
            description:
              'Error message explaining the cause of failure (present if event = "payment.failed").',
          },
        ]}
      />

      <br />
      <br />
      <Label>Example Request</Label>
      <CodeBlock language="json">{`{
  "x402Version": 1,
  "paymentHeader": "eyJ...",
  "paymentRequirements": {
    "scheme": "exact",
    "network": "base",
    "payTo": "0xRecipient...",
    "asset": "0xAsset...",
    "description": "USDC settlement test",
    "mimeType": "application/json",
    "maxAmountRequired": "1000",
    "maxTimeoutSeconds": 300
  }
}`}</CodeBlock>

      <br />
      <br />
      <Label>Example Successful Response</Label>
      <CodeBlock language="json">{`{
  "x402Version": 1,
  "event": "payment.settled",
  "txHash": "0xTxHash...",
  "from": "0xSender...",
  "to": "0xRecipient...",
  "value": "1000000",
  "blockNumber": 16,
  "network": "base",
  "timestamp": "2025-10-31T09:00:32.280Z"
}`}</CodeBlock>

      <br />
      <Label>Example Failed Response</Label>
      <CodeBlock language="json">{`{
  "x402Version": 1,
  "event": "payment.failed",
  "network": "base",
  "timestamp": "2025-10-31T09:01:15.103Z",
  "error": "Transaction failed on-chain"
}`}</CodeBlock>
      <PageFooterNav
        prev={{
          title: 'Verify Payment',
          href: '/api/verify',
        }}
        nextGroup={{
          title: 'Schemas',
          href: '/schema/payment-session',
        }}
      />
    </Content>
  );
};
