# Astro SSR Playground

This repository is a small playground for exploring Astro Server Side Rendering with Minima CMS.

Nothing here is final - it's just a space to try SSR with Astro.

## Headless CMS

[![minima.ltd](https://img.shields.io/badge/minima.ltd-Headless%20CMS-blue)](https://minima.ltd)

## Live Demo

[Live Demo](https://astro-ssr-playground.pages.dev/)

## Stack

- Astro
- Tailwind CSS
- Minima CMS

## Installation

1. **Clone the repository**

   ```bash
   git clone git@github.com:aifit/astro-ssr-playground.git
   cd astro-ssr
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Setup environment variables**

   Create a `.env` file in the root directory:

   ```bash
   PUBLIC_MINIMA_API_KEY=your_api_key_here
   PUBLIC_MINIMA_SITE_ID=your_site_id_here
   ```

4. **Run development server**
   ```bash
   pnpm dev
   ```

## Scripts

```bash
pnpm dev      # Start dev server at http://localhost:4321
pnpm build    # Build for production
```

## SDK Generation

This project uses [@hey-api/openapi-ts](https://github.com/hey-api/openapi-ts) to generate TypeScript SDK from Minima's OpenAPI specification.

The SDK is already included in the repository (`src/sdk/`), but you can regenerate it if needed:

```bash
npx @hey-api/openapi-ts
```

Configuration is in `openapi-ts.config.ts`:

- **Input**: `https://minima.ltd/api/v1/openapi.public.json`
- **Output**: `src/sdk/`

For more information, see [Minima API Documentation](https://docs.minima.ltd/developers/openapi).

## AI Context

Detailed documentation is maintained in `/docs/project-context.md` specifically created for AI assistants to understand this project's architecture and SDK integration.

### Example: Maintenance Prompt

When updating the SDK, copy-paste this prompt to your AI assistant:

```
Read `/docs/project-context.md` to understand the Minima SDK integration. Then:
1. Regenerate the SDK client to fetch the latest types.
2. Check if `/src/lib/minima.ts` or `/src/pages/sdk-explorer.astro` needs updates.
3. **Crucial:** Run a full project type check (or scan usages) to identify and fix any breaking type errors in all `.astro` and `.ts` files caused by the SDK update.
```

You can see a demo of this prompt in action in the following pull request: [PR #11](https://github.com/aifit/astro-ssr-playground/pull/11)
