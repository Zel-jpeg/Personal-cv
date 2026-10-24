import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseEnv } from 'node:util';

const privateName =
  /(?:api_?key|secret|token|password|private_?key|personal_?profile)/i;
const credentialPattern = /(?:AIza[\w-]{35}|gsk_[\w-]{20,})/;
const skipped = new Set(['.git', '.vercel', 'node_modules', 'dist']);
const required = ['GEMINI_API_KEY', 'GROQ_API_KEY', 'FORMSPREE_LINK'];
// This exact variable is a browser-facing widget identifier, not a credential.
const publicSiteKey = 'FORMSPREE_TURNSTILE_SITE_KEY';

function isEnvFile(name) {
  return (
    (name === '.env' || name.startsWith('.env.')) && name !== '.env.example'
  );
}

function filesUnder(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    // Do not follow symlinks or inspect the owner's private certificates.
    if (entry.isSymbolicLink() || skipped.has(entry.name)) return [];
    if (
      entry.name === 'local-certificates' &&
      basename(directory) === 'public'
    ) {
      return [];
    }
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(path) : [path];
  });
}

export function checkSecrets(
  root,
  { requireDist = false, env = process.env } = {},
) {
  const problems = new Set();
  const configurations = readdirSync(root)
    .filter(isEnvFile)
    .map((name) => parseEnv(readFileSync(join(root, name), 'utf8')));
  configurations.push(env);

  const secrets = new Set();
  for (const configuration of configurations) {
    for (const [name, value] of Object.entries(configuration)) {
      if (!value) continue;
      if (name.startsWith('VITE_') && privateName.test(name)) {
        problems.add(
          'An API key or other credential uses a public VITE_ name.',
        );
      }
      if (
        privateName.test(name) &&
        name !== publicSiteKey &&
        value.length >= 12
      )
        secrets.add(value);
    }
  }

  function containsSecret(contents) {
    const text = contents.toString('utf8');
    return (
      credentialPattern.test(text) ||
      [...secrets].some((secret) => contents.includes(Buffer.from(secret)))
    );
  }

  // Detect renamed public variables that contain a private key, too.
  for (const configuration of configurations) {
    for (const [name, value] of Object.entries(configuration)) {
      if (
        name.startsWith('VITE_') &&
        containsSecret(Buffer.from(value ?? ''))
      ) {
        problems.add('A public VITE_ variable contains a private credential.');
      }
    }
  }

  if (existsSync(join(root, '.git'))) {
    const tracked = execFileSync('git', ['ls-files', '-z'], {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    }).split('\0');
    if (tracked.some((path) => isEnvFile(basename(path)))) {
      problems.add('A private environment file is tracked by Git.');
    }
    try {
      execFileSync('git', ['check-ignore', '-q', '.env.local'], {
        cwd: root,
        stdio: 'ignore',
      });
    } catch {
      problems.add('.env.local must be ignored by Git.');
    }
  }

  for (const path of filesUnder(root)) {
    if (isEnvFile(basename(path))) {
      if (resolve(path, '..') !== resolve(root)) {
        problems.add('An environment file exists outside the project root.');
      }
      continue;
    }
    if (containsSecret(readFileSync(path))) {
      problems.add('A credential was found outside private environment files.');
    }
  }

  const dist = join(root, 'dist');
  if (requireDist && !existsSync(dist)) {
    problems.add(
      'The production output is missing; build it before auditing it.',
    );
  }
  for (const path of filesUnder(dist)) {
    if (isEnvFile(basename(path)) || containsSecret(readFileSync(path))) {
      problems.add(
        'The production output contains a private credential or env file.',
      );
    }
  }

  if (problems.size) {
    // Report categories only, never file contents or credential values.
    throw new Error([...problems].join('\n'));
  }
  return Object.fromEntries(
    required.map((name) => [
      name,
      configurations.some((configuration) =>
        Boolean(configuration[name]?.trim()),
      ),
    ]),
  );
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  try {
    const configured = checkSecrets(process.cwd(), {
      requireDist: process.argv.includes('--dist'),
    });
    console.log('Credential safety check passed. No API requests were made.');
    for (const [name, present] of Object.entries(configured)) {
      console.log(`${name}: ${present ? 'configured' : 'not configured'}`);
    }
  } catch {
    console.error(
      'Credential safety check failed. Check for public VITE_ credentials, tracked or misplaced env files, and credentials in source/build output. Values are never printed.',
    );
    process.exitCode = 1;
  }
}
