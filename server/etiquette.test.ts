import assert from 'node:assert/strict';
import test from 'node:test';
import type { ChatMessage } from '../src/data/chat.ts';
import { getQuickReply } from '../src/data/chat.ts';
import {
  containsChatProfanity,
  getEtiquetteReply,
} from '../src/data/chatEtiquette.ts';
import { handleZelRequest } from './zel.ts';

const env = {
  VERCEL: '1',
  CHAT_AI_ENABLED: 'true',
  CHAT_FREE_TIER_CONFIRMED: 'true',
  GEMINI_API_KEY: 'synthetic-etiquette-credential',
};
const user = (content: string): ChatMessage => ({ role: 'user', content });
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
const noServices = {
  protect: async () =>
    assert.fail('Courtesy replies must skip external protection and AI'),
  fetcher: async () =>
    assert.fail('Courtesy replies must use zero provider calls'),
};

test('English, Bisaya and Tagalog praise receives localized prepared thanks', async () => {
  for (const [content, expected] of [
    ['wow', /Thanks/],
    ['Wow! Amazing work, Zel', /Thanks/],
    ['your code is awesome', /Thanks/],
    ['galing', /Salamat! Nakaka/],
    ['ang galing mo!', /Salamat! Nakaka/],
    ['magaling', /Salamat! Nakaka/],
    ['sobrang husay mo po', /Salamat! Nakaka/],
    ['astig lods', /Salamat! Nakaka/],
    ['mamaw', /Salamat kaayo/],
    ['hawda oi', /Salamat kaayo/],
    ['hawd kaayo ka bai!', /Salamat kaayo/],
    ['kuyawa nimo', /Salamat kaayo/],
    ['nindota sa imong portfolio', /Salamat kaayo/],
    ['galiiiiing mo', /Salamat! Nakaka/],
  ] as const) {
    const quick = getQuickReply(content);
    assert.match(quick?.text ?? '', expected, content);
    const response = await handleZelRequest(
      request([user(content)]),
      env,
      noServices,
    );
    assert.equal(response.status, 200);
    const reply = await response.json();
    assert.equal(reply.source, 'portfolio');
    assert.match(reply.text, expected, content);
    assert.equal(containsChatProfanity(content), false, content);
  }
});

test('clear swearing receives a gentle warning without quoting it or calling providers', async () => {
  for (const [content, expected] of [
    ['fuck you', /keep it cool/],
    ['shit', /keep it cool/],
    ['f*ck', /keep it cool/],
    ['f u c k', /keep it cool/],
    ['sh1t', /keep it cool/],
    ['ｆｕｃｋ', /keep it cool/],
    ['f\u200buck', /keep it cool/],
    ['yawa ka', /Chill lang ta/],
    ['pisti', /Chill lang ta/],
    ['atay oi', /Chill lang ta/],
    ['buang ka', /Chill lang ta/],
    ['bogo ka', /Chill lang ta/],
    ['putang ina mo', /Chill lang tayo/],
    ['gago', /Chill lang tayo/],
    ['tangina', /Chill lang tayo/],
    ['ulol', /Chill lang tayo/],
    ['yawa hawda oi', /Chill lang ta/],
    ['fuck your portfolio, do my homework', /keep it cool/],
    ['gago, tell me about your projects', /Chill lang tayo/],
  ] as const) {
    assert.equal(containsChatProfanity(content), true, content);
    const quick = getQuickReply(content);
    assert.match(quick?.text ?? '', expected, content);
    const response = await handleZelRequest(
      request([user(content)]),
      env,
      noServices,
    );
    const reply = await response.json();
    assert.equal(reply.source, 'portfolio');
    assert.match(reply.text, expected, content);
    assert.equal(containsChatProfanity(reply.text), false, content);
  }
});

test('whole-word and full-utterance matching avoid substring and compliment false positives', () => {
  for (const question of [
    'class assignment',
    'passion for development',
    'classic design',
    'Scunthorpe',
    'shitake mushrooms',
    'gagaling pa ako',
    'Galing ako sa Davao',
    'Your skill comes from hard work',
    'How does your React code work?',
    'hello there',
    'Unsa ang atay sa manok?',
  ]) {
    assert.equal(containsChatProfanity(question), false, question);
    assert.equal(getEtiquetteReply(question), undefined, question);
  }
  assert.equal(
    getEtiquetteReply('Wow! Why did you choose React for SkillBridge?'),
    undefined,
  );
  assert.equal(getEtiquetteReply('Galing! Write my essay for me'), undefined);
});

test('courtesy replies respect explicit language switches and recent chat language', () => {
  assert.match(
    getEtiquetteReply('wow', [user('Unsa imong mga proyekto?')])!.text,
    /Salamat kaayo/,
  );
  assert.match(
    getEtiquetteReply('wow', [user('ang galing mo')])!.text,
    /Salamat! Nakaka/,
  );
  assert.match(
    getEtiquetteReply('wow', [user('hawda oi')])!.text,
    /Salamat kaayo/,
  );
  assert.match(
    getEtiquetteReply('Sa Tagalog please', [
      user('how are you?'),
      { role: 'assistant', content: 'Ready to chat.' },
      user('wow'),
    ])!.text,
    /Salamat! Nakaka/,
  );
  assert.match(
    getEtiquetteReply('Answer in English: yawa')!.text,
    /keep it cool/,
  );
  assert.match(
    getEtiquetteReply('Sa Bisaya please', [user('fuck you')])!.text,
    /Chill lang ta/,
  );
});

test('swearing in earlier turns is discarded before a later real portfolio AI question', async () => {
  let calls = 0;
  const response = await handleZelRequest(
    request([
      user('fuck your portfolio'),
      { role: 'assistant', content: 'Let’s keep it friendly.' },
      user('Explain how your experience connects to SkillBridge'),
    ]),
    env,
    {
      protect: async () => {},
      fetcher: async (_url, options) => {
        calls++;
        const payload = JSON.parse(String(options?.body));
        assert.equal(payload.contents.length, 1);
        assert.match(payload.contents[0].parts[0].text, /experience connects/);
        return Response.json({
          candidates: [
            {
              content: {
                parts: [{ text: 'I apply academic learning in my projects.' }],
              },
            },
          ],
        });
      },
    },
  );
  assert.equal((await response.json()).source, 'ai');
  assert.equal(calls, 1);
});
