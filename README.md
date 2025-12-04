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
   git clone https://github.com/yja/astro-ssr.git
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
