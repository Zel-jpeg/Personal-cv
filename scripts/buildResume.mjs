import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

// Rebuild explicitly after editing public CV content. Normal builds use the
// checked-in PDF, so deployment needs neither Python nor PDF libraries.
const server = await createServer({
  configFile: false,
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});
try {
  const { resume } = await server.ssrLoadModule('/src/data/resume.ts');
  const result = spawnSync(
    process.env.RESUME_PYTHON || 'python',
    [
      '-X',
      'utf8',
      fileURLToPath(new URL('./renderResume.py', import.meta.url)),
    ],
    {
      input: JSON.stringify(resume),
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    },
  );
  if (result.error) throw result.error;
  if (result.status !== 0)
    throw new Error(result.stderr || 'Resume generation failed');
  console.log(result.stdout.trim());
} finally {
  await server.close();
}
