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

export const TokenInfo = () => {
  return (
    <Content>
      <h5>Schemas</h5>
      <h1>TokenInfo Schema</h1>
      <p>
        The <code>TokenInfo</code> object describes metadata about a supported
        stablecoin or payment token across networks.
      </p>
      <br />

      <SchemaTable
        title="Fields"
        fields={[
          {
            name: 'symbol',
            type: 'string',
            required: true,
            description: 'Ticker symbol, e.g. USDC or USDT.',
          },
          {
            name: 'name',
            type: 'string',
            required: true,
            description: 'Full token name.',
          },
          {
            name: 'decimals',
            type: 'number',
            required: true,
            description: 'Number of decimal places used by the token.',
          },
          {
            name: 'contractAddress',
            type: 'string',
            required: false,
            description: 'EVM token contract address.',
          },
          {
            name: 'mintAddress',
            type: 'string',
            required: false,
            description: 'Solana mint address (if applicable).',
          },
          {
            name: 'network',
            type: 'string',
            required: true,
            description:
              'Blockchain network (base-sepolia, solana-devnet, etc.).',
          },
          {
            name: 'version',
            type: 'string',
            required: false,
            description: 'Token contract or mint version (e.g. "2").',
          },
        ]}
      />

      <br />
      <Label>Example</Label>
      <CodeBlock language="json">{`{
  "symbol": "USDC",
  "name": "USD Coin",
  "decimals": 6,
  "contractAddress": "0x1234...abcd",
  "network": "base-sepolia",
  "version": "2"
}`}</CodeBlock>
      <PageFooterNav
        prev={{
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
};
