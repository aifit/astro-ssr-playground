# Astro SSR Playground with Minima CMS

This document provides context for AI assistants to understand the architecture and integration of Minima CMS within this Astro SSR project.

## Project Overview

This is an **Astro SSR (Server-Side Rendering)** application serving as a playground to explore the **Minima Headless CMS**.

- **Framework**: Astro (SSR mode with Cloudflare adapter).
- **CMS**: Minima (Headless CMS).
- **SDK**: Auto-generated TypeScript SDK from Minima's OpenAPI spec.

## Minima CMS Integration

The integration logic is centralized to handle the evolving nature of the Minima SDK.

### 1. SDK Generation

The SDK is **automatically generated** using `@hey-api/openapi-ts`. This ensures type safety and alignment with the latest API changes.

- **Configuration File**: `openapi-ts.config.ts`
- **OpenAPI Source**: `https://minima.ltd/api/v1/openapi.public.json`
- **Output Directory**: `src/sdk`
- **How to Update**: Run the generation command (e.g., `npx openapi-ts`) to pull the latest spec and regenerate types.

### 2. Client Wrapper (`src/lib/minima.ts`)

To simplify usage and avoid repetitive configuration, the raw SDK is wrapped in a helper library.

- **Location**: `src/lib/minima.ts`
- **Purpose**:
  - Configures the `client` with the `X-Api-Key`.
  - Pre-fills the `siteId` for every request (path parameter).
  - Exports a simplified `minima` object with methods like `getPublicArticles`, `getPublicEntities`, etc.

**Key Environment Variables:**

- `PUBLIC_MINIMA_API_KEY`: The API key for authentication.
- `PUBLIC_MINIMA_SITE_ID`: The specific Site ID to fetch content for.

### 3. Usage Pattern

Pages fetch data server-side (in the Astro frontmatter) using the wrapper.

```typescript
// Example: src/pages/index.astro
import { minima } from "../lib/minima";

// Fetch data during SSR
const response = await minima.getPublicArticles({ limit: 10 });
const articles = response.data?.data || [];
```

## Directory Structure

- **`src/sdk`**: Contains the _generated_ SDK code. **Do not edit manually.**
- **`src/lib/minima.ts`**: The bridge/wrapper between the app and the SDK. Edit this if the SDK signature changes or to add new convenience methods.
- **`src/pages`**: Astro pages implementing SSR data fetching.

## Maintenance Notes

Since Minima is "still in development and SDK changes frequently":

1.  **If the API changes**: Run the openapi-ts generator to update `src/sdk`.
2.  **If the SDK methods change**: Update `src/lib/minima.ts` to fallback or adapt to the new signatures.
3.  **Type Safety**: Rely on `src/sdk/types.gen.ts` for response types.
