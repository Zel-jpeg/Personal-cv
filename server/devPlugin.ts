import type { Plugin } from 'vite';
import { handleZelRequest } from './zel.ts';

export function zelDevAPI(env: Record<string, string>): Plugin {
  return {
    name: 'zel-local-api',
    configureServer(server) {
      server.middlewares.use('/api/zel', async (req, res) => {
        try {
          const origin = `http://${req.headers.host ?? 'localhost:5173'}`;
          const chunks: Buffer[] = [];
          let size = 0;
          for await (const chunk of req) {
            const buffer = Buffer.from(chunk);
            size += buffer.length;
            if (size > 12_000) {
              res.writeHead(413, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'That message is too large.' }));
              return;
            }
            chunks.push(buffer);
          }
          const headers = new Headers();
          for (const [name, value] of Object.entries(req.headers))
            if (value)
              headers.set(
                name,
                Array.isArray(value) ? value.join(', ') : value,
              );
          const request = new Request(`${origin}/api/zel`, {
            method: req.method,
            headers,
            ...(req.method === 'POST' ? { body: Buffer.concat(chunks) } : {}),
          });
          const response = await handleZelRequest(request, env);
          res.writeHead(response.status, Object.fromEntries(response.headers));
          res.end(await response.text());
        } catch {
          res.writeHead(503, { 'Content-Type': 'application/json' });
          res.end(
            JSON.stringify({ error: 'Chat is temporarily unavailable.' }),
          );
        }
      });
    },
  };
}
