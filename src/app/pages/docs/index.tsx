import React from 'react';
import { Layout } from '../../components/Layout';

export default function DocsPage() {
  return (
    <>
      <h1 id="intro">Introduction</h1>
      <p>
        Welcome to the <strong>Mercuri API Documentation</strong>. Here you'll
        learn how to query blockchain data instantly using SQL or REST.
      </p>

      <h2 id="installation">Installation</h2>
      <p>Install the SDK using npm:</p>
      <pre>
        <code>npm install @mercuri/sdk</code>
      </pre>

      <h2 id="quickstart">Quickstart</h2>
      <p>Example query to fetch the last 10 Ethereum blocks:</p>
      <pre>
        <code>{`import Mercuri from '@mercuri/sdk';

const client = new Mercuri({ apiKey: 'YOUR_API_KEY' });
const data = await client.query('SELECT * FROM ethereum.blocks LIMIT 10;');
console.log(data);`}</code>
      </pre>

      <h2 id="endpoints">Endpoints</h2>
      <p>
        Use the <code>/query</code> endpoint to run SQL queries or{' '}
        <code>/rest</code> to fetch via REST.
      </p>

      <h2 id="examples">Examples</h2>
      <ul>
        <li>Fetch ERC20 transfers by address</li>
        <li>List transactions in a block</li>
        <li>Decode event logs automatically</li>
      </ul>
    </>
  );
}
