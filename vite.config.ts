import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { existsSync } from 'node:fs';
import { copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { zelDevAPI } from './server/devPlugin.ts';

export default defineConfig(({ command, mode }) => ({
  plugins: [
    react(),
    {
      name: 'portfolio-404-page',
      apply: 'build',
      async writeBundle(options) {
        const output = options.dir ?? 'dist';
        await copyFile(
          resolve(output, 'index.html'),
          resolve(output, '404.html'),
        );
      },
    },
    ...(command === 'serve'
      ? [zelDevAPI(loadEnv(mode, process.cwd(), ''))]
      : []),
  ],
  // Original certificate PDFs stay local; approved WebP previews are imported assets.
  publicDir: command === 'serve' ? 'public' : false,
  define: {
    'import.meta.env.VITE_LOCAL_CERTIFICATES': JSON.stringify(
      command === 'serve' &&
        existsSync(
          fileURLToPath(
            new URL(
              './public/local-certificates/ccna-srwe.pdf',
              import.meta.url,
            ),
          ),
        )
        ? 'true'
        : 'false',
    ),
  },
}));
