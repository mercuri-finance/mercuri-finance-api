import { CodeBlock } from '@/app/components/CodeBlock';
import { PageFooterNav } from '@/app/components/PageFooterNav';
import React from 'react';

export default function QuickDeployTemplate() {
  return (
    <>
      <h5>Introduction</h5>
      <h1>Quick Deploy Template</h1>
      <p>
        The <strong>x402 Starter Template</strong> is the fastest way to launch
        a production-ready project using x402 on Vercel. It includes a minimal
        API server, client SDK integration, and preconfigured environment
        variables.
      </p>
      <br />

      <h2 id="getting-started">Getting Started</h2>
      <CodeBlock language="sh">{`npx create-x402-app my-project
cd my-project
npm install
npm run dev`}</CodeBlock>

      <p>
        This template automatically provisions your app with test endpoints and
        example flows for both buyers and sellers. You can customize the
        environment variables to connect with live networks or your preferred
        payment facilitator.
      </p>
      <br />

      <h2 id="deploy-to-vercel">Deploy to Vercel</h2>
      <p>Once configured, deploy instantly using:</p>
      <pre>
        <code>vercel --prod</code>
      </pre>

      <PageFooterNav
        prev={{
          title: 'Open Source',
          href: '/docs/introduction/open-source',
        }}
        next={{
          title: 'Common Questions',
          href: '/docs/introduction/faq',
        }}
        nextGroup={{
          title: 'Getting Started',
          href: '/docs/getting-started/setup-guide',
        }}
      />
    </>
  );
}
