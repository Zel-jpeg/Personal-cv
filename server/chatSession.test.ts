import assert from 'node:assert/strict';
import test from 'node:test';
import {
  readChatSession,
  saveChatSession,
  chatSessionKey,
} from '../src/data/chatSession.ts';
import type { ChatEntry } from '../src/data/chatSession.ts';

function storage() {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => {
      values.set(key, value);
    },
  };
}
const transcript: ChatEntry[] = [
  { id: 0, role: 'assistant', content: 'Greeting' },
  { id: 1, role: 'user', content: 'Tell me about Financify' },
  {
    id: 2,
    role: 'assistant',
    content: 'A budgeting project.',
    displayContent: 'A budget',
    revealing: true,
    reply: {
      text: 'A budgeting project.',
      source: 'portfolio',
      links: [{ label: 'Injected', href: 'javascript:alert(1)' }],
    },
  },
];

test('refresh restores complete chat text, regenerates verified links and drops animation state', () => {
  const tab = storage();
  const retryAt = Date.now() + 30_000;
  saveChatSession(transcript, retryAt, tab);
  const restored = readChatSession(tab);
  assert.equal(restored.messages.length, 3);
  assert.equal(restored.messages[2].content, 'A budgeting project.');
  assert.equal(restored.messages[2].revealing, undefined);
  assert.equal(restored.messages[2].displayContent, undefined);
  assert.equal(restored.retryAt, retryAt);
  assert.ok(
    restored.messages[2].reply?.links?.some(
      (link) => link.href === '/projects/financify',
    ),
  );
  assert.doesNotMatch(
    tab.getItem(chatSessionKey)!,
    /javascript:|Injected|revealing|displayContent|contactEmail|token/,
  );
  // A separate tab session starts fresh; the panel closing never clears tab data.
  assert.equal(readChatSession(storage()).messages.length, 1);
  assert.equal(readChatSession(tab).messages.length, 3);
});

test('interrupted replies restore the pending question without resending or corrupting history', () => {
  const tab = storage();
  saveChatSession(
    [...transcript, { id: 3, role: 'user', content: 'Why did you choose it?' }],
    0,
    tab,
  );
  const restored = readChatSession(tab);
  assert.equal(restored.messages.length, 3);
  assert.equal(restored.pendingQuestion, 'Why did you choose it?');
  assert.equal(readChatSession(tab).pendingQuestion, restored.pendingQuestion);
});

test('malformed, oversized and blocked session storage cannot break chat', () => {
  const tab = storage();
  for (const bad of [
    '{bad',
    '{}',
    'x'.repeat(100_001),
    JSON.stringify({ version: 1, turns: [{ role: 'system', content: 'bad' }] }),
    JSON.stringify({
      version: 1,
      turns: [
        { role: 'user', content: 'hello' },
        { role: 'assistant', content: 'Hi', source: 'untrusted' },
      ],
    }),
  ]) {
    tab.setItem(chatSessionKey, bad);
    assert.equal(readChatSession(tab).messages.length, 1);
  }
  const blocked = {
    getItem: () => {
      throw new Error('Blocked');
    },
    setItem: () => {
      throw new Error('Full');
    },
  };
  assert.equal(readChatSession(blocked).messages.length, 1);
  assert.doesNotThrow(() => saveChatSession(transcript, 0, blocked));
});

test('stored transcripts remain bounded and preserve alternating roles', () => {
  const tab = storage();
  const entries: ChatEntry[] = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    role: index % 2 ? 'assistant' : 'user',
    content: `Turn ${index}`,
  }));
  saveChatSession(entries, 0, tab);
  const restored = readChatSession(tab);
  assert.equal(restored.messages.length, 39);
  for (let index = 1; index < restored.messages.length; index++)
    assert.equal(
      restored.messages[index].role,
      index % 2 ? 'user' : 'assistant',
    );
});
