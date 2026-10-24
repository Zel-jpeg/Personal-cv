import { getPreparedReply, getQuickReply } from '../src/data/chat.ts';
import type { ChatMessage } from '../src/data/chat.ts';
import { getAIReply } from './providers.ts';
import type { ServerEnv, Fetcher } from './providers.ts';
import { protectPublicChat, RequestError } from './protection.ts';

const maxBodyBytes = 12_000;
const localRequests: number[] = [];
const json = (data: unknown, status = 200) =>
  Response.json(data, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...(status === 429 ? { 'Retry-After': '60' } : {}),
    },
  });

export function formEndpoint(env: ServerEnv): string | null {
  const endpoint = env.FORMSPREE_LINK?.trim() ?? '';
  return /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint)
    ? endpoint
    : null;
}

export function validateMessages(body: unknown): ChatMessage[] {
  if (
    !body ||
    typeof body !== 'object' ||
    !('messages' in body) ||
    !Array.isArray(body.messages)
  )
    throw new RequestError(400, 'Please send a chat message.');
  if (Object.keys(body).some((name) => name !== 'messages'))
    throw new RequestError(400, 'Unsupported chat request.');
  const messages = body.messages as unknown[];
  if (!messages.length || messages.length > 7 || messages.length % 2 !== 1)
    throw new RequestError(400, 'Please start a new chat and try again.');
  let total = 0;
  return messages.map((item, index) => {
    const expectedRole = index % 2 === 0 ? 'user' : 'assistant';
    if (
      !item ||
      typeof item !== 'object' ||
      !('role' in item) ||
      !('content' in item) ||
      typeof item.content !== 'string' ||
      item.role !== (index % 2 === 0 ? 'user' : 'assistant')
    )
      throw new RequestError(400, 'Invalid conversation.');
    const content = item.content.trim();
    if (!content || content.length > (item.role === 'user' ? 600 : 1800))
      throw new RequestError(
        400,
        'Please keep questions under 600 characters.',
      );
    total += content.length;
    if (total > 6500)
      throw new RequestError(400, 'Please start a new chat and try again.');
    return { role: expectedRole, content };
  });
}

async function readBody(request: Request) {
  if (Number(request.headers.get('content-length') ?? 0) > maxBodyBytes)
    throw new RequestError(413, 'That message is too large.');
  const reader = request.body?.getReader();
  if (!reader) throw new RequestError(400, 'A message is required.');
  let bytes = 0;
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > maxBodyBytes) {
      await reader.cancel();
      throw new RequestError(413, 'That message is too large.');
    }
    chunks.push(value);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    throw new RequestError(400, 'Invalid message format.');
  }
}

type Dependencies = {
  protect?: (request: Request) => Promise<void>;
  fetcher?: Fetcher;
};

export async function handleZelRequest(
  request: Request,
  env: ServerEnv = process.env,
  dependencies: Dependencies = {},
): Promise<Response> {
  try {
    const url = new URL(request.url);
    const isLocal =
      env.VERCEL !== '1' &&
      ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
    if (request.method === 'GET')
      return json({ contactEndpoint: formEndpoint(env) });
    if (request.method !== 'POST')
      return json({ error: 'Method not allowed.' }, 405);
    const allowed = new Set([
      env.CHAT_ALLOWED_ORIGIN || 'https://zeelll.vercel.app',
    ]);
    if (env.VERCEL_URL) allowed.add(`https://${env.VERCEL_URL}`);
    if (isLocal) allowed.add(url.origin);
    const origin = request.headers.get('origin');
    if (!origin || !allowed.has(origin) || origin !== url.origin)
      throw new RequestError(403, 'Please use the chat on my portfolio.');
    if (request.headers.get('sec-fetch-site') === 'cross-site')
      throw new RequestError(403, 'Please use the chat on my portfolio.');
    if (
      request.headers.get('content-type')?.split(';')[0].trim() !==
      'application/json'
    )
      throw new RequestError(415, 'Please use the chat on my portfolio.');
    const messages = validateMessages(await readBody(request));
    const question = messages[messages.length - 1].content;
    const prepared = getPreparedReply(question, messages.slice(0, -1));
    if (
      env.CHAT_AI_ENABLED !== 'true' ||
      env.CHAT_FREE_TIER_CONFIRMED !== 'true'
    )
      return json(prepared);
    const quick = getQuickReply(question);
    if (quick) return json(quick);
    if (isLocal) {
      const now = Date.now();
      while (localRequests.length && localRequests[0] < now - 60_000)
        localRequests.shift();
      if (localRequests.length >= 8)
        throw new RequestError(
          429,
          'Please wait a minute before asking again.',
        );
      localRequests.push(now);
    } else {
      await (dependencies.protect ?? protectPublicChat)(request);
    }
    const text = await getAIReply(messages, env, dependencies.fetcher);
    return json(text ? { text, source: 'ai' } : prepared);
  } catch (error) {
    if (error instanceof RequestError)
      return json({ error: error.message }, error.status);
    return json(
      {
        error:
          'Chat is temporarily unavailable. You can still browse my portfolio or email me.',
      },
      503,
    );
  }
}
