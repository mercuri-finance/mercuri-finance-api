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
    path: 'https://docs.mercuri.finance/docs/introduction/platform-overview',
    group: 'Introduction',
  },
  {
    title: 'Using the Facilitator Service',
    description: 'Guide to integrating payments via the x402 facilitator API.',
    path: 'https://docs.mercuri.finance/docs/introduction/platform-overview',
    group: 'Integration Guides',
  },
  {
    title: 'SDK Integration (Client)',
    description:
      'Integrate payments with the x402 SDK for JavaScript or Python.',
    path: 'https://docs.mercuri.finance/docs/introduction/platform-overview',
    group: 'Integration Guides',
  },
  {
    title: 'API Integration (Server)',
    description: 'Implement x402 facilitator payments in your backend API.',
    path: 'https://docs.mercuri.finance/docs/introduction/platform-overview',
    group: 'Integration Guides',
  },
  {
    title: 'Changelog',
    description: 'Version history and updates across SDKs and APIs.',
    path: 'https://docs.mercuri.finance/docs/introduction/platform-overview',
    group: 'Documentation',
  },
  // ...add more entries as needed
];
