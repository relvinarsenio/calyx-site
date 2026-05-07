# Calyx — Benchmark Utility

[![License: MPL-2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)
[![Svelte](https://img.shields.io/badge/Svelte-5-ff3e00?logo=svelte)](https://svelte.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38b2ac?logo=tailwind-css)](https://tailwindcss.com)

The modern alternative to `bench.sh`. **Calyx** is a high-performance CLI tool and landing page designed to check your server's specs and test exactly how fast your disk and internet are.

## 🚀 Abstract

Calyx provides a sleek, terminal-inspired interface for monitoring and benchmarking Linux servers. It's built for speed, transparency, and aesthetics.

- **System Information**: Detailed CPU, RAM, and OS diagnostics.
- **Disk Benchmark**: Real-time I/O performance testing.
- **Network Speed**: Accurate bandwidth and latency measurements.

## 🛠️ Tech Stack

- **Framework**: [Svelte 5](https://svelte.dev) (Runes mode)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **Icons**: [Lucide Svelte](https://lucide.dev)
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/)
- **Runtime**: [Cloudflare Workers](https://workers.cloudflare.com/) (via `@sveltejs/adapter-cloudflare`)

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later)
- [npm](https://www.npmjs.com/)

### Installation & Development

1. **Clone the repository**:
   ```sh
   git clone https://github.com/relvinarsenio/calyx.git
   cd calyx/svelte-site
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Start development server**:
   ```sh
   npm run dev
   ```

### Building for Production

To create a production version of the site optimized for Cloudflare:

```sh
npm run build
```

## 🌐 Deployment

This project is configured to deploy seamlessly to **Cloudflare Pages**.

### Environment Variables

Before deploying, ensure the following environment variables are set in the Cloudflare Pages dashboard:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `PUBLIC_SITE_URL` | The base URL of your deployment (used for SEO & commands). | `https://calyx.pages.dev` |

### Build Settings

1. Connect your GitHub repository to Cloudflare Pages.
2. Use the following build settings:
   - **Framework preset**: `SvelteKit`
   - **Build command**: `npm run build`
   - **Build output directory**: `.svelte-kit/cloudflare`
   - **Node.js version**: `20+`

## 📄 License

Distributed under the **Mozilla Public License 2.0**. See `LICENSE` for more information.

---

Built with precision by **Alfie Ardinata**.
