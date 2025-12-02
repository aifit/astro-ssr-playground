import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'https://minima.ltd/api/v1/openapi.public.json',
  output: 'src/sdk',
});
