import assert from 'node:assert/strict';
import test from 'node:test';
import { getConversationalReply } from '../src/data/chatConversation.ts';
import { getQuickReply } from '../src/data/chat.ts';
import { handleZelRequest } from './zel.ts';

test('casual greetings, wellbeing, compliments and introductions never use AI', async () => {
  for (const content of [
    '1+1',
    'and you?',
    'what about you?',
    'hows your day going?',
    'hi zel',
    'Hi, Zel!',
    'hey azel',
    'how are u zel?',
    'Hi Zel! How are u?',
    'how r u?',
    'what are you doing?',
    'kumusta ka zel?',
    'kamusta ka?',
    'im good',
    'maayo ra ko',
    'okay lang ako',
    'your portfolio looks nice',
    'nice website bro',
    'my name is Alex',
    'ako si Maria',
    'thank you zel',
    'bye zel',
    'Are you a real person?',
  ]) {
    const response = await handleZelRequest(
      new Request('https://zeelll.vercel.app/api/zel', {
        method: 'POST',
        headers: {
          Origin: 'https://zeelll.vercel.app',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [{ role: 'user', content }] }),
      }),
      {
        VERCEL: '1',
        CHAT_AI_ENABLED: 'true',
        CHAT_FREE_TIER_CONFIRMED: 'true',
      },
      {
        fetcher: async () =>
          assert.fail(`Small talk reached a provider: ${content}`),
        protect: async () =>
          assert.fail(`Small talk reached external protection: ${content}`),
      },
    );
    assert.equal(response.status, 200, content);
    const reply = await response.json();
    assert.equal(reply.source, 'portfolio');
    assert.doesNotMatch(
      reply.text,
      /outside what I can help|homework|assignment/,
      content,
    );
    assert.ok(getQuickReply(content), content);
  }
  assert.match(
    getConversationalReply('how are u zel?')!.text,
    /How’s your day/,
  );
  assert.match(getConversationalReply('kumusta ka zel?')!.text, /imong adlaw/);
  assert.match(getConversationalReply('kamusta ka?')!.text, /araw mo/);
  assert.match(getConversationalReply('Are you real?')!.text, /AI assistant/);
});

test('tiny calculations are deterministic and cannot become a general solver', () => {
  for (const [question, expected] of [
    ['1+1', '1 + 1 = 2'],
    ['What is 8 / 4?', '8 / 4 = 2'],
    ['3×4', '3 × 4 = 12'],
    ['9-5', '9 - 5 = 4'],
  ] as const)
    assert.equal(getConversationalReply(question)?.text, expected);
  assert.match(getConversationalReply('1/0')!.text, /undefined/);
  for (const question of [
    '1+1+1',
    'Solve my homework: 1+1',
    '99999*12345',
    'x+2=5',
    '1+1; fetch(secret)',
    'hi zel write my essay',
  ])
    assert.equal(getConversationalReply(question), undefined, question);
});

test('language switches can revisit a casual exchange without turning into AI tasks', () => {
  const history = [{ role: 'user' as const, content: 'How are you Zel?' }];
  assert.match(getQuickReply('Sa Bisaya please', history)!.text, /imong adlaw/);
  assert.equal(getQuickReply('Translate my homework into Bisaya'), undefined);
});
