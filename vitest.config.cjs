/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path, { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [
    dts({
      entryRoot: 'src',
      tsConfigFilePath: join(
        path.dirname(fileURLToPath(import.meta.url)),
        'tsconfig.json'
      ),
      skipDiagnostics: true,
    }),
    react(),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../../',
  //    }),
  //  ],
  // },


  test: {
    globals: true,
    cache: {
      dir: 'node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['./**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});