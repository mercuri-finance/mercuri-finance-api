# Mercuri Facilitator SDK (React + Vite)

This project provides the **front-end interface and developer SDK documentation** for integrating with **Mercuri Finance’s Facilitator** — a lightweight agent that enables seamless interaction between decentralized finance (DeFi) protocols and AI-driven decision layers.

Built using **React**, **Vite**, and **TypeScript**, it offers a modern developer experience for embedding facilitator capabilities in any web application.

---

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Build](#build)
- [Features](#features)
- [Development](#development)
- [License](#license)

---

## Overview

The **Mercuri Facilitator SDK** enables developers to:

- Interact with the **Mercuri Protocol** via a clean TypeScript API.
- Integrate **AI-assisted DeFi workflows** directly into React apps.
- Support **wallet-based authentication**, **task orchestration**, and **message streaming** with minimal setup.

It includes:

- A floating facilitator UI (optional)
- SDK modules for session, task, and message handling
- Support for A2A protocol (Agent-to-Agent standard v0.3.0)

---

## Installation

To get started, clone the repository and install dependencies:

```bash
git clone https://github.com/mercuri-finance/mercuri-facilitator-sdk-js.git
cd mercuri-facilitator-sdk-js
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FACILITATOR_SERVER_BASE_URL=https://api.mercuri.finance
VITE_PROJECT_ID=your_project_id_here
```

### Description

| Variable                           | Description                                  |
| ---------------------------------- | -------------------------------------------- |
| `VITE_FACILITATOR_SERVER_BASE_URL` | Base URL for the Mercuri Facilitator backend |
| `VITE_PROJECT_ID`                  | Your project identifier for API access       |

---

## Usage

Run the SDK locally in development mode:

```bash
npm run dev
```

Then open your browser at:
👉 **[http://localhost:5173](http://localhost:5173)**

### Example Import

```ts
import { FacilitatorClient } from '@mercuri/finance-facilitator';

const client = new FacilitatorClient({
  baseUrl: import.meta.env.VITE_FACILITATOR_SERVER_BASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
});

await client.startSession({ userId: '0x123...' });
```

---

## Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## Features

- **AI-driven facilitator** for DeFi task execution
- **Lightweight SDK** for React + TypeScript
- **A2A Protocol support** (message send, stream, and task management)
- **Floating facilitator widget** with Markdown + dark theme
- **Vite-powered fast builds and HMR**
- **Secure environment configuration** with project-based isolation

---

## Development

The project uses:

- **React 18** for UI
- **Vite** for fast bundling
- **TypeScript** for safety and clarity
- **Styled Components** for modular UI design

### Run Lint Checks

```bash
npm run lint
```

### Format Code

```bash
npm run format
```

---

## License

This project is licensed under the **MIT License**.
See the [LICENSE](./LICENSE) file for full details.
