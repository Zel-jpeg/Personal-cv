import knowledge from '../src/data/chatKnowledge.json' with { type: 'json' };
import type { ChatMessage, ChatReply } from '../src/data/chat.ts';
import { getConversationalReply } from '../src/data/chatConversation.ts';
import { containsChatProfanity } from '../src/data/chatEtiquette.ts';
import {
  detectChatLanguage,
  identityQuestionTopics,
  normalizeQuestion,
  personalTopic,
  portfolioQuestionText,
  resolveChatQuestion,
} from '../src/data/chatLanguage.ts';

// This is a conservative, local scope check, not a paid AI classifier.
// A portfolio keyword alone must not turn an unrelated task into an AI request.
function scopeText(text: string) {
  return normalizeQuestion(
    text
      .normalize('NFKC')
      .replace(/[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g, ''),
  );
}

function isTaskOrOverride(text: string) {
  // Asking how an existing project was built is different from commissioning
  // new code. Remove only this historical phrase, retaining any added task.
  const task = text.replace(
    /\b(?:how|why|when) did you (?:build|create|write|implement|debug|fix|complete|generate)\b/g,
    'portfolio history',
  );
  return (
    /\b(homework|assignment|answer key|exam answers?|quiz answers?|problem set|jailbreak|dan mode)\b/.test(
      text,
    ) ||
    /\b(ignore|override|bypass|forget|disregard|reveal|print|show|repeat)\b.{0,55}\b(instructions?|rules?|system|prompts?|secrets?|api keys?|tokens?|environment|configuration)\b/.test(
      text,
    ) ||
    /\b(pretend|act as|roleplay|you are now|from now on|developer message|system message)\b/.test(
      text,
    ) ||
    /\b(write|generate|create|implement|debug|fix|complete|rewrite|translate|convert|build|give me|provide|output|return)\b.{0,90}\b(code|script|program|function|sql|query|essay|poem|story|article|report|recipe|website|app|application|solution|tutorial|base64)\b/.test(
      task,
    ) ||
    /\b(write|generate|create|implement|debug|fix|complete|build)\b.{0,60}\b(python|javascript|typescript|java|php|html|css|react|django|laravel|algorithm)\b/.test(
      task,
    ) ||
    /\b(?:code|program|refactor)\s+(?:me\s+|a\s+|an\s+|this\s+|my\s+|the\s+)/.test(
      text,
    ) ||
    /\b(best build|game guide|walkthrough|cheat codes?|tier list|team comp|damage calculation)\b/.test(
      text,
    ) ||
    /\b(solve|calculate|compute|evaluate|differentiate|integrate)\b.{0,60}(?:\d|\b(equation|integral|derivative|problem|sum)\b)/.test(
      text,
    ) ||
    /\b(saguti?n|sulati?|isulat|gawan|gumawa|himoa|buhati?|sulbara|kwentahin|kuwentahin|tubaga)\b.{0,90}\b(assignment|homework|takdang|aralin|sanaysay|essay|code|program|script|problema|equation|quiz|exam|website|app|python|react|javascript|java|php|html|css)\b/.test(
      text,
    ) ||
    /\b(ayaw|wag|huwag|kalimti|kalimutan|ibalewala)\b.{0,50}\b(rules?|instructions?|patakaran|sugo|sundin|sunda)\b/.test(
      text,
    ) ||
    /```|<\/?(?:system|developer|script)>|\[INST\]|\b(?:SELECT\s+.+\s+FROM|function\s*\w*\s*\(|def\s+\w+\s*\()/i.test(
      text,
    )
  );
}

const projectNames = knowledge.projects.map((project) =>
  normalizeQuestion(project.name).replace(' cafe kiosk', ''),
);
const escapePattern = (text: string) =>
  text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const projects = new RegExp(
  `\\b(?:${projectNames.map(escapePattern).join('|')})\\b`,
);
const technologies = new RegExp(
  `\\b(?:${knowledge.skillGroups
    .flatMap((group) => group.skills)
    .map((skill) => escapePattern(normalizeQuestion(skill)))
    .join('|')})\\b`,
);
const owner =
  /\b(you|your|yourself|zel|azel|imong|imohang|nimo|ikaw|iyong|mo|sarili|ka)\b/;
const portfolioTopics =
  /\b(portfolio|projects?|tech stack|technolog\w*|skills?|experience|academic|education|school|college|university|certificat\w*|ccna|community|events?|pitching|presentations?|github|repositories|repos?|capstone|ojt|internship|frontend|backend|full.?stack|ui\/?ux|career|coding|developer|software engineer|learning|work style|teamwork|personality|interests?|hobbies|role|proyekto|edukasyon|eskwela|paaralan|kurso|sertipiko|komunidad|kalihokan)\b/;
const followup =
  /^(?:(?:and|also|please|pls|can you|could you|sige|pwede|at|ug)\s+)*(?:why|how|more|why is that|why that choice|what do you mean(?: by that)?|(?:tell me|explain|elaborate)(?: more| further)?(?: about)?(?: it| that| this| those| these)?|(?:why did you|why do you) (?:choose|use|prefer|build) (?:it|that|this|them)|how (?:does|did|would) (?:it|that|this) (?:work|help|affect your work)|what (?:about|technologies are in) (?:it|that|this)|unsa pa|unsa imong pasabot|ngano(?: man| kana| ana)?|ipasabot pa|dugang pa|bakit(?: naman| iyan)?|anong ibig mong sabihin|paano(?: iyon| yun)?|paliwanag pa|dagdag pa)[.!?\s]*$/;

function directlyInScope(question: string) {
  const text = scopeText(question);
  if (isTaskOrOverride(text)) return false;
  if (identityQuestionTopics(question).length) return true;
  if (getConversationalReply(question)) return true;
  if (projects.test(text)) return true;
  if (
    /^(hi|hello|hey|yo|kumusta|kamusta|maayong (buntag|hapon|gabii)|magandang (umaga|hapon|gabi)|good (morning|afternoon|evening)|thanks|thank you|salamat(?: kaayo| po)?)[!.?\s]*$/.test(
      text,
    )
  )
    return true;
  if (
    /\b(contact|email|hire|hiring|collaborat\w*|reach you|send.*message|availability|rates|kontak|mensahe|makontak)\b/.test(
      text,
    )
  )
    return true;
  if (
    /\b(speak|understand|kasabot|makasabot|naiintindihan|marunong)\b.*\b(bisaya|cebuano|tagalog|filipino|english|languages?)\b/.test(
      text,
    )
  )
    return true;
  const topic = personalTopic(question);
  if (topic && owner.test(text)) return true;
  if (
    /^(?:your )?(?:age|birthday|birthplace|hobbies|goals|strengths?|weakness(?:es)?|interests|working style|coding journey|edad|hilig|pangandoy|pangarap)[!? .]*$/.test(
      text,
    )
  )
    return true;
  const portfolio = portfolioQuestionText(question);
  if (portfolioTopics.test(portfolio)) {
    // Requests about listed portfolio sections are fine; general tutorials are not.
    return (
      owner.test(text) ||
      /^(?:(?:show|list|browse|view|tell me about|what are|what is|whats|about|explore)\s+(?:(?:me|the|your|all|of)\s+)*)?(?:projects?|portfolio|tech stack|technologies|skills?|education|experience|certifications?|community|events?|github|repos?)[!? .]*$/.test(
        text,
      ) ||
      /\b(academic experience|your projects?|your work|mga proyekto|tech stack mo)\b/.test(
        portfolio,
      )
    );
  }
  return (
    technologies.test(text) &&
    owner.test(text) &&
    /\b(use|used|using|choose|chose|chosen|prefer|learn|learned|experience|work|projects?|gamit|gigamit|ginagamit|pinili|gipili|ganahan|gusto)\b/.test(
      text,
    )
  );
}

// Only contiguous, scoped user turns can supply context. Caller-provided
// assistant text cannot authorize a follow-up, and unrelated turns reset context.
export function scopedConversation(
  messages: ChatMessage[],
): ChatMessage[] | null {
  let scoped: ChatMessage[] = [];
  for (let index = 0; index < messages.length; index += 2) {
    const message = messages[index];
    const text = scopeText(message.content);
    const resolved = resolveChatQuestion(message.content, scoped);
    if (containsChatProfanity(resolved)) {
      scoped = [];
      if (index === messages.length - 1) return null;
      continue;
    }
    const inheritsTopic =
      scoped.length > 0 &&
      !isTaskOrOverride(text) &&
      (resolved !== message.content || followup.test(text));
    if (!directlyInScope(message.content) && !inheritsTopic) {
      scoped = [];
      if (index === messages.length - 1) return null;
      continue;
    }
    scoped.push(message);
    const assistant = messages[index + 1];
    if (assistant && !isTaskOrOverride(scopeText(assistant.content)))
      scoped.push(assistant);
    else if (assistant) scoped = [];
  }
  return scoped;
}

export function scopeReply(
  question: string,
  history: ChatMessage[],
): ChatReply {
  const language = detectChatLanguage(question, history);
  const text = {
    en: 'That’s a little outside what I can help with here. I’m happy to chat about my projects, how I work, or the things I enjoy. What would you like to know?',
    ceb: 'Medyo gawas na sa akong matabangan diri. Pero pwede ra ta magchika bahin sa akong mga proyekto, pamaagi sa pagtrabaho, o mga hilig. Unsa imong gustong mahibal-an?',
    fil: 'Medyo labas iyon sa matutulungan ko rito. Pero puwede tayong magkuwentuhan tungkol sa mga proyekto ko, paraan ng pagtatrabaho, o mga hilig. Ano ang gusto mong malaman?',
  }[language];
  return {
    text,
    source: 'portfolio',
    links: [{ label: 'Browse projects', href: '/projects' }],
  };
}
