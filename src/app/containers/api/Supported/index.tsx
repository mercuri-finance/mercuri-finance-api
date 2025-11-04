import React from 'react';
import styled from 'styled-components';

import { CodeBlock } from '../../../components/CodeBlock';
import { SchemaTable } from '../../../components/SchemaTable';
import { Label } from '@/app/components/Label';
import { Badge } from '@/app/components/Badge/styles';
import { PageFooterNav } from '@/app/components/PageFooterNav';

const Content = styled.div`
  overflow-y: auto;

  p {
    color: #aeb9c8;
    line-height: 1.5;
  }
`;

export const Supported = () => {
  return (
    <Content>
      <h5>Endpoints</h5>
      <h1>List Supported Payment Kinds</h1>
      <p>
        The <code>/v2/x402/supported</code> endpoint returns the list of payment
        kinds supported by the facilitator. Each kind specifies the protocol
        version, payment scheme, and blockchain network where X402 payments are
        currently accepted.
        <br />
        <br />
        Use this endpoint to dynamically determine which networks or schemes are
        available before initiating a payment flow.
      </p>

      <Badge method="GET">GET</Badge>
      <br />
      <br />
      <h3>Request</h3>
      <pre>
        <code>{`/v2/x402/supported`}</code>
      </pre>
      <br />

      <p>This endpoint does not require a request body.</p>

      <br />
      <br />
      <h3>Response</h3>

      <SchemaTable
        title="Response Fields"
        fields={[
          {
            name: 'kinds',
            type: 'X402Kind[]',
            required: true,
            description:
              'Array of supported payment kinds, each specifying version, scheme, and network.',
          },
        ]}
      />

      <SchemaTable
        title="X402Kind Object"
        fields={[
          {
            name: 'x402Version',
            type: 'number',
            required: true,
            description: 'Protocol version supported (e.g., 1).',
          },
          {
            name: 'scheme',
            type: 'string',
            required: true,
            description: 'Supported payment scheme (e.g., "exact").',
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
                for the complete list.
              </>
            ),
          },
        ]}
      />

      <br />
      <br />
      <Label>Example Response</Label>
      <CodeBlock language="json">{`{
  "kinds": [
    {
      "x402Version": 1,
      "scheme": "exact",
      "network": "cronos-testnet"
    }
  ]
}`}</CodeBlock>
      <PageFooterNav
        next={{
          title: 'Verify Payment',
          href: '/api/verify',
        }}
        prev={{
          title: 'Discover Facilitator',
          href: '/api/discover',
        }}
      />
    </Content>
  );
};
