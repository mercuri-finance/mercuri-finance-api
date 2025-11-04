// src/app/pages/api/Funding.tsx

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

export const Funding = () => {
  return (
    <Content>
      <h5>Endpoints</h5>
      <h1>Facilitator Funding</h1>
      <p>
        Mercuri Finance’s x402 facilitator is <strong>free to use</strong> and
        provides an open-source SDK. To ensure uninterrupted operations, we
        personally cover the gas costs required to process and settle
        transactions on-chain.
        <br />
        <br />
        Community <strong>donations</strong> are welcome and help sustain gas,
        liquidity, and infrastructure expenses that keep the facilitator running
        for everyone.
      </p>

      <Alert $variant="warning">
        <strong>Warning:</strong> Always verify the funding address directly
        from the official Mercuri Finance domain before sending any funds. The
        facilitator will never request private keys, wallet access, or payments
        through any third-party channel.
      </Alert>

      <p>
        The <code>/funding</code> endpoint provides static facilitator addresses
        for operational gas top-ups and voluntary community donations. Use these
        addresses to contribute small amounts of USDC, ETH, or SOL to help keep
        Mercuri Finance’s x402 facilitator running.
      </p>

      <Badge method="GET">GET</Badge>
      <br />
      <br />
      <h3>Request</h3>
      <CodeBlock language="HTTPS">
        GET https://facilitator.mercuri.finance/funding
      </CodeBlock>
      <br />
      <p>This endpoint does not require a request body.</p>
      <br />
      <h3>Response</h3>

      <SchemaTable
        title="Response Fields"
        fields={[
          {
            name: 'facilitator',
            type: 'string',
            required: true,
            description: 'Name of the facilitator.',
          },
          {
            name: 'networks',
            type: 'object',
            required: true,
            description: 'Funding addresses per supported network.',
          },
          {
            name: 'contact',
            type: 'object',
            required: true,
            description: 'Contact information and donation links.',
          },
        ]}
      />
      <br />
      <Label>Example Response</Label>
      <CodeBlock language="json">{`{
  "x402Version": 1,
  "facilitator": "Mercuri Finance",
  "message": "Mainnet facilitator funding & donation addresses for operational gas, liquidity top-ups, or community support.",
  "networks": {
    "base": {
      "facilitatorAddress": "0x5AEd85f843496E0e034438a33B66025D8A319359",
      "asset": "USDC",
      "donation": {
        "enabled": true,
        "recommendedAmounts": ["1 USDC", "5 USDC", "10 USDC"]
      }
    },
    "solana-mainnet": {
      "facilitatorAddress": "2kQPdFFffYhskzSKX9uBYuDSWEuSphgJrVmcrofvVnMk",
      "asset": "USDC",
      "donation": {
        "enabled": true,
        "recommendedAmounts": ["1 USDC", "5 USDC", "10 USDC"]
      }
    }
  }
}`}</CodeBlock>

      <PageFooterNav
        prev={{
          title: 'Settle Payment',
          href: '/api/settle',
        }}
      />
    </Content>
  );
};
