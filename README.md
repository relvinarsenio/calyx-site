# Calyx — Server Benchmark Utility

[![License: MPL-2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)
[![Svelte](https://img.shields.io/badge/Svelte-5-ff3e00?logo=svelte)](https://svelte.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38b2ac?logo=tailwind-css)](https://tailwindcss.com)

A modern alternative to `bench.sh`. **Calyx** runs directly in your terminal to check server specs, RAM usage, disk speed, and actual internet speed instantly.

## 🚀 Abstract

Calyx provides a sleek, terminal-inspired interface for monitoring and benchmarking Linux servers. It's built for speed, transparency, and aesthetics.

- **System Information**: Detailed CPU, RAM, and OS diagnostics.
- **Disk Benchmark**: Real-time I/O performance testing.
- **Network Speed**: Accurate bandwidth and latency measurements.

## 🛠️ Tech Stack

- **Framework**: [Svelte 5](https://svelte.dev) (Runes mode)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **Typography**: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) + [Space Mono](https://fonts.google.com/specimen/Space+Mono)
- **Icons**: [Lucide Svelte](https://lucide.dev)
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/)
- **Runtime**: [Cloudflare Workers](https://workers.cloudflare.com/) (via `@sveltejs/adapter-cloudflare`)

## 📦 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.1 or later) or [Node.js](https://nodejs.org/) (v20 or later)

### Installation & Development

1. **Clone the repository**:

   ```sh
   git clone https://github.com/relvinarsenio/calyx.git
   cd calyx/svelte-site
   ```

2. **Install dependencies**:

   ```sh
   bun install
   # or npm install / pnpm install
   ```

3. **Start development server**:
   ```sh
   bun run dev
   # or npm run dev
   ```

### Building for Production

To create a production version of the site optimized for Cloudflare:

```sh
bun run build
# or npm run build
```

## 🌐 Deployment

This project is configured to deploy seamlessly to **Cloudflare Pages**.

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
