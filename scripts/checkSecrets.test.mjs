import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { checkSecrets } from './checkSecrets.mjs';

const fakeKey = ['gsk', '_', 'synthetic-test-credential-1234567890'].join('');

function fixture(t) {
  const prefix = join(tmpdir(), 'portfolio-secrets-');
  const root = mkdtempSync(prefix);
  assert.ok(root.startsWith(prefix));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  writeFileSync(join(root, '.env.local'), `GROQ_API_KEY=${fakeKey}\n`);
  return root;
}

test('private env values are accepted without changing or disclosing them', (t) => {
  const root = fixture(t);
  assert.equal(checkSecrets(root, { env: {} }).GROQ_API_KEY, true);
});

test('public aliases of a secret are blocked, regardless of variable name', (t) => {
  const root = fixture(t);
  assert.throws(() =>
    checkSecrets(root, { env: { VITE_INNOCENT_NAME: fakeKey } }),
  );
});

test('credentials embedded in source are blocked without echoing them', (t) => {
  const root = fixture(t);
  writeFileSync(join(root, 'leak.js'), JSON.stringify(fakeKey));
  assert.throws(
    () => checkSecrets(root, { env: {} }),
    (error) => !error.message.includes(fakeKey),
  );
});

test('built assets and public env copies are checked', (t) => {
  const root = fixture(t);
  mkdirSync(join(root, 'dist'));
  writeFileSync(join(root, 'dist', 'app.js'), JSON.stringify(fakeKey));
  assert.throws(() => checkSecrets(root, { env: {}, requireDist: true }));
  rmSync(join(root, 'dist', 'app.js'));
  mkdirSync(join(root, 'public'));
  writeFileSync(join(root, 'public', '.env.local'), 'GROQ_API_KEY=');
  assert.throws(() => checkSecrets(root, { env: {} }));
});

test('safe builds pass and missing required build output fails', (t) => {
  const root = fixture(t);
  assert.throws(() => checkSecrets(root, { env: {}, requireDist: true }));
  mkdirSync(join(root, 'dist'));
  writeFileSync(join(root, 'dist', 'index.html'), '<h1>Portfolio</h1>');
  assert.doesNotThrow(() => checkSecrets(root, { env: {}, requireDist: true }));
});

test('the exact public Turnstile site key may be published but CAPTCHA secrets may not', (t) => {
  const root = fixture(t);
  writeFileSync(join(root, 'widget.js'), 'public-widget-identifier');
  assert.doesNotThrow(() =>
    checkSecrets(root, {
      env: { FORMSPREE_TURNSTILE_SITE_KEY: 'public-widget-identifier' },
    }),
  );
  assert.throws(() =>
    checkSecrets(root, {
      env: { TURNSTILE_SECRET_KEY: 'public-widget-identifier' },
    }),
  );
});
