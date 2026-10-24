import { getPreparedReply } from '../src/data/chat.ts';
import {
  detectChatLanguage,
  localize,
  normalizeQuestion,
  personalTopic,
  resolveChatQuestion,
} from '../src/data/chatLanguage.ts';
import type { LocalizedText } from '../src/data/chatLanguage.ts';
import type { ChatMessage, ChatReply } from '../src/data/chat.ts';
import type { ServerEnv } from './providers.ts';

type ProfileFact = {
  id: string;
  topic: string;
  keywords: string[];
  text: LocalizedText;
};
type PersonalProfile = {
  birthDate?: string;
  birthplace?: string;
  hobbies: string[];
  goals: string[];
  workStyle?: string;
  facts: ProfileFact[];
};

// Raw configuration (including the full date) never enters prompts or responses.
// Only a small selection of approved answer text may be sent for AI synthesis.
function readProfile(env: ServerEnv): PersonalProfile {
  const empty = { hobbies: [], goals: [], facts: [] };
  try {
    if ((env.CHAT_PERSONAL_PROFILE?.length ?? 0) > 30000) return empty;
    const value = JSON.parse(env.CHAT_PERSONAL_PROFILE ?? '{}');
    if (!value || typeof value !== 'object' || Array.isArray(value))
      return empty;
    const short = (text: unknown, max = 700): string | undefined =>
      typeof text === 'string' && text.trim().length > 0 && text.length <= max
        ? text.trim()
        : undefined;
    const list = (items: unknown): string[] =>
      Array.isArray(items)
        ? items
            .filter(
              (item): item is string =>
                typeof item === 'string' && item.length <= 100,
            )
            .slice(0, 16)
        : [];
    const facts: ProfileFact[] = [];
    for (const entry of Array.isArray(value.facts)
      ? value.facts.slice(0, 24)
      : []) {
      if (!entry || typeof entry !== 'object') continue;
      const id = short(entry.id, 40);
      const en = short(entry.text?.en);
      if (!id || !en) continue;
      facts.push({
        id,
        topic: short(entry.topic, 40) ?? id,
        keywords: list(entry.keywords),
        text: {
          en,
          ceb: short(entry.text?.ceb) ?? en,
          fil: short(entry.text?.fil) ?? en,
        },
      });
    }
    return {
      birthDate: short(value.birthDate, 10),
      birthplace: short(value.birthplace),
      hobbies: list(value.hobbies),
      goals: list(value.goals),
      workStyle: short(value.workStyle),
      facts,
    };
  } catch {
    return empty;
  }
}

function ageAt(birthDate: string | undefined, now: Date) {
  const birth = /^(\d{4})-(\d{2})-(\d{2})$/.exec(birthDate ?? '');
  if (!birth) return undefined;
  const [, year, month, day] = birth.map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  )
    return undefined;
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Manila',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const current = (type: string) =>
    Number(parts.find((part) => part.type === type)?.value);
  const age =
    current('year') -
    year -
    (current('month') < month ||
    (current('month') === month && current('day') < day)
      ? 1
      : 0);
  return age >= 0 && age <= 120 ? age : undefined;
}

function rankedFacts(
  question: string,
  profile: PersonalProfile,
  history: ChatMessage[],
) {
  const effective = resolveChatQuestion(question, history);
  const topic = personalTopic(question, history);
  let search = normalizeQuestion(effective).replace(/[^\p{L}\p{N}]+/gu, ' ');
  if (/\b(it|that|this|ana|kana|nito|yun|iyon|also|pud)\b/i.test(question))
    search +=
      ' ' +
      history
        .filter((item) => item.role === 'user')
        .slice(-2)
        .map((item) => normalizeQuestion(item.content))
        .join(' ');
  return profile.facts
    .map((fact) => ({
      fact,
      score:
        (fact.topic === topic ? 6 : 0) +
        fact.keywords.reduce(
          (score, keyword) =>
            score +
            (` ${search} `.includes(` ${normalizeQuestion(keyword)} `) ? 3 : 0),
          0,
        ),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.fact);
}

export function getPersonalProfileReply(
  question: string,
  env: ServerEnv,
  now = new Date(),
  history: ChatMessage[] = [],
): ChatReply | undefined {
  const profile = readProfile(env);
  const topic = personalTopic(question, history);
  const matches = rankedFacts(question, profile, history);
  if (!topic && !matches.length) return undefined;
  const language = detectChatLanguage(question, history);
  const say = (en: string, ceb: string, fil: string) =>
    localize({ en, ceb, fil }, language);
  const answer = (text: string): ChatReply => ({ text, source: 'portfolio' });
  if (topic === 'birthday')
    return answer(
      say(
        'I keep my full birth date private, but you can ask about my age or where I was born.',
        'Pribado nako ang kompleto nakong petsa sa pagkatawo, pero pwede ka mangutana sa akong edad o asa ko natawo.',
        'Pribado ang buong petsa ng kapanganakan ko, pero pwede kang magtanong tungkol sa edad ko o kung saan ako ipinanganak.',
      ),
    );
  if (topic === 'age') {
    const age = ageAt(profile.birthDate, now);
    return age === undefined
      ? getPreparedReply(question, history)
      : answer(
          say(
            `I'm ${age} years old.`,
            `${age} anyos ko.`,
            `${age} taong gulang ako.`,
          ),
        );
  }
  if (topic === 'birthplace')
    return profile.birthplace
      ? answer(
          say(
            `I was born in ${profile.birthplace}.`,
            `Natawo ko sa ${profile.birthplace}.`,
            `Ipinanganak ako sa ${profile.birthplace}.`,
          ),
        )
      : getPreparedReply(question, history);
  if (matches.length) return answer(matches[0].text[language]);
  if ((topic === 'hobbies' || topic === 'games') && profile.hobbies.length)
    return answer(
      say(
        `In my free time, I enjoy ${profile.hobbies.join(' and ')}.`,
        `Sa akong bakanteng oras, ganahan ko sa ${profile.hobbies.join(' ug ')}.`,
        `Sa bakanteng oras ko, gusto ko ang ${profile.hobbies.join(' at ')}.`,
      ),
    );
  if (topic === 'goals' && profile.goals.length)
    return answer(
      say(
        `My goal is to become ${profile.goals.join(' or ')}.`,
        `Tumong nako nga mahimong ${profile.goals.join(' o ')}.`,
        `Pangarap kong maging ${profile.goals.join(' o ')}.`,
      ),
    );
  if (topic === 'workStyle' && profile.workStyle)
    return answer(profile.workStyle);
  return getPreparedReply(question, history);
}

// No raw birth dates, environment names, unknown keys, or entire-profile dump.
// Each fact is an owner-approved public answer, not confidential information.
export function getRelevantProfileFacts(
  question: string,
  env: ServerEnv,
  history: ChatMessage[] = [],
  now = new Date(),
): string[] {
  if (personalTopic(question, history) === 'birthday') return [];
  const profile = readProfile(env);
  const facts = rankedFacts(question, profile, history)
    .slice(0, 3)
    .map((fact) => fact.text.en);
  const direct = getPersonalProfileReply(question, env, now, history);
  if (direct && !facts.length && personalTopic(question, history)) {
    const englishHistory = [
      ...history,
      {
        role: 'user' as const,
        content: resolveChatQuestion(question, history),
      },
    ];
    const english = getPersonalProfileReply(
      'English please',
      env,
      now,
      englishHistory,
    );
    if (english) facts.push(english.text);
  }
  let length = 0;
  return facts.filter((fact) => {
    if (profile.birthDate && fact.includes(profile.birthDate)) return false;
    length += fact.length;
    return length <= 1800;
  });
}
