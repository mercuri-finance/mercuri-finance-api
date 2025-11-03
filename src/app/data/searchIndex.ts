export interface SearchEntry {
  title: string;
  description?: string;
  path: string;
  group?: string;
}

export const searchIndex: SearchEntry[] = [
  {
    title: 'Platform Overview',
    description: 'Overview of the x402 ecosystem and protocol layers.',
    path: '/docs/introduction/platform-overview',
    group: 'Introduction',
  },
  {
    title: 'Using the Facilitator Service',
    description: 'Guide to integrating payments via the x402 facilitator API.',
    path: '/docs/integration/using-facilitator-service',
    group: 'Integration Guides',
  },
  {
    title: 'SDK Integration (Client)',
    description:
      'Integrate payments with the x402 SDK for JavaScript or Python.',
    path: '/docs/integration/sdk-integration',
    group: 'Integration Guides',
  },
  {
    title: 'API Integration (Server)',
    description: 'Implement x402 facilitator payments in your backend API.',
    path: '/docs/integration/api-integration',
    group: 'Integration Guides',
  },
  {
    title: 'Changelog',
    description: 'Version history and updates across SDKs and APIs.',
    path: '/docs/changelog',
    group: 'Documentation',
  },
  // ...add more entries as needed
];
