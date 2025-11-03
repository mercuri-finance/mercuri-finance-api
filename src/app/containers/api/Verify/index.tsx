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

export const Verify = () => {
  return (
    <Content>
      <h5>Endpoints</h5>
      <h1>Verify a Payment Session</h1>
      <p>
        The <code>/v2/x402/verify</code> endpoint validates a provided X402
        payment header and its associated requirements before settlement. It
        checks that the EIP-3009 (or Solana equivalent) signature is
        cryptographically valid, that the recipient, network, and asset match
        expectations, and that the payment has not expired.
      </p>
      <Badge method="POST">POST</Badge>
      <br />
      <br />
      <h3>Request</h3>
      <CodeBlock language="HTTPS">
        POST https://facilitator.mercuri.finance/v2/x402/verify
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
            description: 'Maximum expected payment amount as a string.',
          },
          {
            name: 'maxTimeoutSeconds',
            type: 'number',
            required: false,
            description: 'Maximum allowed timeout before expiry, in seconds.',
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
            name: 'isValid',
            type: 'boolean',
            required: true,
            description:
              'True if the payment header and requirements are valid and verified on-chain.',
          },
          {
            name: 'invalidReason',
            type: 'string | null',
            required: false,
            description:
              'Detailed reason for invalidity if verification fails, otherwise null.',
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
    "description": "USDC verification test",
    "mimeType": "application/json",
    "maxAmountRequired": "1000",
    "maxTimeoutSeconds": 300
  }
}`}</CodeBlock>
      <br />
      <br />
      <Label>Example Response</Label>
      <CodeBlock language="json">{`{
  "isValid": true,
  "invalidReason": null
}`}</CodeBlock>
      <br />
      <Label>Example Invalid Response</Label>
      <CodeBlock language="json">{`{
  "isValid": false,
  "invalidReason": "Invalid or unverifiable EIP-3009 signature"
}`}</CodeBlock>
      <PageFooterNav
        prev={{
          title: 'Get Kinds',
          href: '/api/supported',
        }}
        next={{
          title: 'Settle Payment',
          href: '/api/settle',
        }}
        nextGroup={{
          title: 'Schemas',
          href: '/schema/payment-session',
        }}
      />
    </Content>
  );
};
