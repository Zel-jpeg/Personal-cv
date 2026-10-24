import { chatGreeting, getPreparedReply } from './chat.ts';
import type { ChatMessage, ChatReply } from './chat.ts';

export type ChatEntry = ChatMessage & {
  id: number;
  reply?: ChatReply;
  displayContent?: string;
  revealing?: boolean;
};
type SessionStorage = Pick<Storage, 'getItem' | 'setItem'>;
type Session = {
  messages: ChatEntry[];
  pendingQuestion: string;
  retryAt: number;
};
type SavedTurn = ChatMessage & { source?: 'ai' | 'portfolio' };
export const chatSessionKey = 'zel-chat-session-v1';
const greeting = (): ChatEntry => ({
  id: 0,
  role: 'assistant',
  content: chatGreeting,
});
const empty = (): Session => ({
  messages: [greeting()],
  pendingQuestion: '',
  retryAt: 0,
});

function browserStorage(): SessionStorage | undefined {
  try {
    return typeof window === 'undefined' ? undefined : window.sessionStorage;
  } catch {
    return undefined;
  }
}

// Only chat text/source are persisted. Contact fields, raw server profile,
// external links, animation state, and CAPTCHA tokens never enter this record.
export function readChatSession(
  storage: SessionStorage | undefined = browserStorage(),
): Session {
  try {
    const raw = storage?.getItem(chatSessionKey);
    if (!raw || raw.length > 100_000) return empty();
    const saved = JSON.parse(raw);
    if (
      saved?.version !== 1 ||
      !Array.isArray(saved.turns) ||
      saved.turns.length > 38 ||
      saved.turns.length % 2
    )
      return empty();
    const messages = [greeting()];
    const history: ChatMessage[] = [];
    for (let index = 0; index < saved.turns.length; index++) {
      const turn = saved.turns[index];
      const role = index % 2 ? 'assistant' : 'user';
      if (
        turn?.role !== role ||
        typeof turn.content !== 'string' ||
        !turn.content.trim() ||
        turn.content.length > (role === 'user' ? 600 : 1800)
      )
        return empty();
      if (
        role === 'assistant' &&
        turn.source !== 'ai' &&
        turn.source !== 'portfolio'
      )
        return empty();
      const reply: ChatReply | undefined =
        role === 'assistant'
          ? {
              ...(turn.source === 'portfolio'
                ? getPreparedReply(
                    history.at(-1)!.content,
                    history.slice(0, -1),
                  )
                : {}),
              text: turn.content,
              source: turn.source,
            }
          : undefined;
      messages.push({
        id: index + 1,
        role,
        content: turn.content,
        ...(reply ? { reply } : {}),
      });
      history.push({ role, content: turn.content });
    }
    return {
      messages,
      pendingQuestion:
        typeof saved.pendingQuestion === 'string' &&
        saved.pendingQuestion.length <= 600
          ? saved.pendingQuestion
          : '',
      retryAt:
        typeof saved.retryAt === 'number' && Number.isFinite(saved.retryAt)
          ? Math.max(0, Math.min(saved.retryAt, Date.now() + 60_000))
          : 0,
    };
  } catch {
    return empty();
  }
}

export function saveChatSession(
  messages: ChatEntry[],
  retryAt: number,
  storage: SessionStorage | undefined = browserStorage(),
) {
  const transcript = messages.filter((message) => message.id !== 0);
  const turns: SavedTurn[] = [];
  let pendingQuestion = '';
  for (let index = 0; index < transcript.length; index++) {
    const question = transcript[index];
    if (question.role !== 'user') continue;
    const answer = transcript[index + 1];
    if (answer?.role === 'assistant') {
      turns.push(
        { role: 'user', content: question.content.slice(0, 600) },
        {
          role: 'assistant',
          content: answer.content.slice(0, 1800),
          source: answer.reply?.source ?? 'portfolio',
        },
      );
      index++;
    } else pendingQuestion = question.content.slice(0, 600);
  }
  try {
    storage?.setItem(
      chatSessionKey,
      JSON.stringify({
        version: 1,
        turns: turns.slice(-38),
        pendingQuestion,
        retryAt,
      }),
    );
  } catch {
    /* Storage may be blocked/full; the live conversation still works. */
  }
}
