import assert from 'node:assert/strict';
import test from 'node:test';
import { handleZelRequest } from './zel.ts';
import { getPreparedReply, getQuickReply } from '../src/data/chat.ts';
import {
  detectChatLanguage,
  personalTopic,
  needsAIReasoning,
} from '../src/data/chatLanguage.ts';
import { getRelevantProfileFacts } from './personalProfile.ts';
import type { ChatMessage } from '../src/data/chat.ts';

// Synthetic fixtures only: never copy the owner's real profile into tests.
const profile = {
  birthDate: '2000-11-05',
  unknownPrivateField: 'must-never-reach-a-provider',
  facts: [
    {
      id: 'focus',
      topic: 'workStyle',
      keywords: ['focus', 'focused', 'finish'],
      text: {
        en: 'I like to finish the task I focus on.',
        ceb: 'Ganahan ko nga mahuman ang task nga akong gi-focusan.',
        fil: 'Gusto kong matapos ang task na pinagtutuunan ko.',
      },
    },
    {
      id: 'games',
      topic: 'games',
      keywords: ['games', 'laro', 'duwa'],
      text: {
        en: 'I enjoy a synthetic sample game.',
        ceb: 'Ganahan ko sa usa ka pananglitan nga duwa.',
        fil: 'Gusto ko ang isang halimbawang laro.',
      },
    },
    {
      id: 'journey',
      topic: 'journey',
      keywords: ['coding journey', 'senior high'],
      text: {
        en: 'I discovered coding in senior high school.',
        ceb: 'Sa senior high nako nailhan ang coding.',
        fil: 'Noong senior high ko nakilala ang coding.',
      },
    },
    {
      id: 'role',
      topic: 'teamwork',
      keywords: ['team', 'role', 'leader'],
      text: {
        en: 'I contribute as a developer in a synthetic sample team.',
        ceb: 'Motabang ko isip developer sa pananglitan nga team.',
        fil: 'Tumutulong ako bilang developer sa halimbawang team.',
      },
    },
  ],
};
const env = {
  VERCEL: '1',
  CHAT_AI_ENABLED: 'true',
  CHAT_FREE_TIER_CONFIRMED: 'true',
  GEMINI_API_KEY: 'synthetic-provider-credential',
  CHAT_PERSONAL_PROFILE: JSON.stringify(profile),
};
function request(messages: ChatMessage[]) {
  return new Request('https://zeelll.vercel.app/api/zel', {
    method: 'POST',
    headers: {
      Origin: 'https://zeelll.vercel.app',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages }),
  });
}
const noFetch = async () => {
  assert.fail('Prepared answers must not consume provider quota');
};

test('language detection handles mixed phrasing, explicit switches and short follow-ups', () => {
  assert.equal(detectChatLanguage('Pila imong edad?'), 'ceb');
  assert.equal(detectChatLanguage('Ano ang hobbies mo?'), 'fil');
  assert.equal(detectChatLanguage('Unsa imong favorite framework?'), 'ceb');
  assert.equal(
    detectChatLanguage('Please answer in English', [
      { role: 'user', content: 'Unsa imong hilig?' },
    ]),
    'en',
  );
  assert.equal(
    detectChatLanguage('Financify?', [
      { role: 'user', content: 'Ano ang mga proyekto mo?' },
    ]),
    'fil',
  );
  assert.equal(personalTopic('When did you start coding?'), 'journey');
  assert.equal(personalTopic('Unsa imong role sa team?'), 'teamwork');
  assert.equal(
    needsAIReasoning('Do you play a game called Sample Impact?'),
    false,
  );
  assert.match(
    getQuickReply('Kasabot kag Bisaya?')!.text,
    /Pwede ka mangutana/,
  );
  assert.equal(
    personalTopic('English please', [
      { role: 'user', content: 'Ano ang role mo sa team?' },
      { role: 'assistant', content: 'Sample answer.' },
      { role: 'user', content: 'Sa Bisaya please' },
    ]),
    'teamwork',
  );
});

test('personal FAQs answer in English, Bisaya and Tagalog without AI', async () => {
  for (const [content, expected] of [
    ['How do you work?', /finish the task/],
    ['Unsa imong pamaagi sa pagtrabaho?', /Ganahan ko/],
    ['Paano ka magtrabaho?', /Gusto kong/],
    ['Unsa imong role sa team?', /Motabang ko isip developer/],
    ['Ano ang role mo sa team?', /Tumutulong ako bilang developer/],
    ['When did you start coding?', /senior high/],
    ['Kanus-a ka nagsugod og coding?', /senior high nako/],
    ['Kailan ka nagsimula sa coding?', /Noong senior high/],
  ] as const) {
    const response = await handleZelRequest(
      request([{ role: 'user', content }]),
      env,
      { fetcher: noFetch },
    );
    const reply = await response.json();
    assert.equal(reply.source, 'portfolio');
    assert.match(reply.text, expected);
    assert.doesNotMatch(reply.text, /2000-11-05|CHAT_PERSONAL_PROFILE/);
  }
});

test('age, missing facts and birthday privacy stay deterministic in each language', async () => {
  for (const [content, expected] of [
    ['Pila imong edad?', /\d+ anyos ko/],
    ['Ilang taon ka na?', /\d+ taong gulang ako/],
    ['Kanus-a ka natawo?', /Pribado/],
    ['Kailan ka ipinanganak?', /Pribado/],
  ] as const) {
    const response = await handleZelRequest(
      request([{ role: 'user', content }]),
      env,
      { fetcher: noFetch },
    );
    assert.match((await response.json()).text, expected);
  }
  const missing = await handleZelRequest(
    request([{ role: 'user', content: 'Pila imong edad?' }]),
    { ...env, CHAT_PERSONAL_PROFILE: '{invalid' },
    { fetcher: noFetch },
  );
  assert.match((await missing.json()).text, /Wala pa/);
});

test('a language-switch follow-up reuses the prior private FAQ without provider calls', async () => {
  const response = await handleZelRequest(
    request([
      { role: 'user', content: 'What games do you enjoy?' },
      { role: 'assistant', content: 'I enjoy a sample game.' },
      { role: 'user', content: 'Sa Bisaya please' },
    ]),
    env,
    { fetcher: noFetch },
  );
  assert.match((await response.json()).text, /Ganahan ko/);
  assert.equal(
    getQuickReply('Sa Bisaya please', [
      { role: 'user', content: 'What games do you enjoy?' },
    ]),
    undefined,
  );
});

test('portfolio fallbacks and verified follow-up links work in Bisaya and Tagalog', () => {
  assert.match(
    getPreparedReply('Unsa imong mga proyekto?').text,
    /Ang akong mga proyekto/,
  );
  assert.match(
    getPreparedReply('Ano ang tech stack mo?').text,
    /Ito ang tech stack/,
  );
  assert.match(getPreparedReply('Asa ka nag-eskwela?').text, /student ko/);
  assert.match(getPreparedReply('Saan ka nag-aral?').text, /student ako/);
  assert.ok(
    getPreparedReply('Unsa ang technologies ana?', [
      { role: 'user', content: 'Unsa ang Financify?' },
    ]).links?.some((link) => link.href === '/projects/financify'),
  );
  assert.match(getQuickReply('Salamat kaayo')!.text, /Walay sapayan/);
});

test('protected dynamic replies receive only bounded relevant approved facts and the language instruction', async () => {
  let protectedCalls = 0;
  let providerCalls = 0;
  const response = await handleZelRequest(
    request([
      {
        role: 'user',
        content: 'Ngano makatabang ang imong focus sa pagtrabaho?',
      },
    ]),
    env,
    {
      protect: async () => {
        protectedCalls++;
      },
      fetcher: async (_url, options) => {
        providerCalls++;
        const payload = String(options?.body);
        assert.match(payload, /Cebuano/);
        assert.match(payload, /finish the task/);
        assert.doesNotMatch(
          payload,
          /synthetic sample game|2000-11-05|must-never-reach|CHAT_PERSONAL_PROFILE/,
        );
        return Response.json({
          candidates: [
            {
              content: {
                parts: [
                  {
                    text: 'Makatabang kini nako nga mapadayon ang usa ka task.',
                  },
                ],
              },
            },
          ],
        });
      },
    },
  );
  assert.equal((await response.json()).source, 'ai');
  assert.equal(protectedCalls, 1);
  assert.equal(providerCalls, 1);
  const facts = getRelevantProfileFacts('Explain my focus', env);
  assert.ok(facts.join('').length <= 1800);
  assert.equal(
    getRelevantProfileFacts('What is your birth date?', env).length,
    0,
  );
});

test('AI disabled keeps complex multilingual questions on translated prepared facts', async () => {
  const response = await handleZelRequest(
    request([{ role: 'user', content: 'Bakit ganito ang working style mo?' }]),
    { ...env, CHAT_AI_ENABLED: 'false' },
    { fetcher: noFetch },
  );
  const reply = await response.json();
  assert.equal(reply.source, 'portfolio');
  assert.match(reply.text, /Gusto kong/);
});
