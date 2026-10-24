import type { ChatMessage } from './chat.ts';

export type ChatLanguage = 'en' | 'ceb' | 'fil';
export type LocalizedText = Record<ChatLanguage, string>;
export type PersonalTopic =
  | 'age'
  | 'birthday'
  | 'birthplace'
  | 'name'
  | 'location'
  | 'hobbies'
  | 'goals'
  | 'workStyle'
  | 'bio'
  | 'interests'
  | 'journey'
  | 'inspiration'
  | 'games'
  | 'design'
  | 'learning'
  | 'constraints'
  | 'teamwork'
  | 'strengths'
  | 'weaknesses'
  | 'strengthsAndWeaknesses';

export function normalizeQuestion(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’']/g, '')
    .replace(/\bu\b/g, 'you')
    .replace(/\bur\b/g, 'your')
    .replace(/\br\b/g, 'are')
    .replace(/\s+/g, ' ')
    .trim();
}

function explicitLanguage(text: string): ChatLanguage | undefined {
  const normalized = normalizeQuestion(text);
  const request =
    normalized.match(
      /(?:reply|respond|answer|speak|use|in|sa|mag|pag|tubag|sagot|please|pls)\s*(?:in |sa |lang |og |ug )?(english|bisaya|cebuano|tagalog|filipino|taglish)\b/,
    ) ??
    normalized.match(
      /^(english|bisaya|cebuano|tagalog|filipino|taglish)(?:\s+(?:please|pls|lang))?[.!?]*$/,
    );
  if (!request) return undefined;
  return /bisaya|cebuano/.test(request[1])
    ? 'ceb'
    : /tagalog|filipino|taglish/.test(request[1])
      ? 'fil'
      : 'en';
}

export function detectChatLanguage(
  question: string,
  history: ChatMessage[] = [],
): ChatLanguage {
  const explicit = explicitLanguage(question);
  if (explicit) return explicit;
  const text = normalizeQuestion(question);
  if (
    /\b(unsa|unsay|unsang|pila|kinsa|kanus.a|nagsugod|kasabot|makasabot|ngano|nganong|asa|imong|imohang|nimo|kaayo|gihimo|ganahan|kumusta|maayong|salamat kaayo|nindota?|hawd[ao]?|kuyawa?|ngilngig|payter|yawa|pist[ei]|buang|boang|bogo|amaw|ataya?|bilat|iyot|trabaho nimo)\b/.test(
      text,
    )
  )
    return 'ceb';
  if (
    /\b(ano|anong|ilang|sino|kailan|nagsimula\w*|naiintindihan|marunong|bakit|paano|saan|saang|iyong|mo|ikaw|kamusta|pangarap|salamat po|ginawa|gusto mong|galing|magaling|husay|mahusay|astig|angas|lupit|malupit|putang\s*ina|tang\s*ina|gago|gaga|tanga|ulol|tarantado|bw[ei]sit)\b/.test(
      text,
    )
  )
    return 'fil';
  if (
    /\b(what|whats|how|why|where|who|your|you|tell|show|thanks|hello|hey|hi)\b/.test(
      text,
    )
  )
    return 'en';
  for (const message of history
    .filter((item) => item.role === 'user')
    .slice()
    .reverse()) {
    if (explicitLanguage(message.content))
      return explicitLanguage(message.content)!;
    const prior = normalizeQuestion(message.content);
    if (
      /\b(unsa|pila|imong|nimo|bisaya|cebuano|ganahan|hawd[ao]?|kuyawa?|nindota?|kaayo)\b/.test(
        prior,
      )
    )
      return 'ceb';
    if (
      /\b(ano|anong|ilang|mo|tagalog|filipino|taglish|galing|magaling|husay|astig|angas|lupit)\b/.test(
        prior,
      )
    )
      return 'fil';
    if (/\b(what|how|your|you|english)\b/.test(prior)) return 'en';
  }
  return 'en';
}

export function localize(text: LocalizedText, language: ChatLanguage) {
  return text[language];
}

export function resolveChatQuestion(
  question: string,
  history: ChatMessage[] = [],
) {
  const languageOnly =
    /^(?:(?:please|pls|sa|in|tubag sa|answer in|respond in|reply in|sagot sa|mag)\s+)?(?:english|bisaya|cebuano|tagalog|filipino|taglish)(?:\s+(?:please|pls|lang|pud|po))?[.!?]*$/i;
  if (languageOnly.test(question.trim()))
    return (
      history
        .filter((item) => item.role === 'user')
        .slice()
        .reverse()
        .find((item) => !languageOnly.test(item.content.trim()))?.content ??
      question
    );
  return question;
}

export function personalTopic(
  question: string,
  history: ChatMessage[] = [],
): PersonalTopic | undefined {
  const text = normalizeQuestion(question);
  const strength =
    /\b(strengths?|strong points?|kusog|kalig.on|lakas|kalakasan)\b/.test(text);
  const weakness =
    /\b(weakness(?:es)?|weak points?|kahuyang|kahinaan|kahina(?:an)?|kakulangan)\b/.test(
      text,
    );
  if (strength && weakness) return 'strengthsAndWeaknesses';
  if (strength) return 'strengths';
  if (weakness) return 'weaknesses';
  if (
    /\b(birth ?date|date of birth|birth year|when were you born|birthday|kaarawan|adlaw.*natawo|kanus.a.*natawo|kailan.*ipinanganak|petsa.*kapanganakan)\b/.test(
      text,
    )
  )
    return 'birthday';
  if (
    /\b(how old|age|edad|anyos|taong gulang|ilang taon|pila ka tuig)\b/.test(
      text,
    )
  )
    return 'age';
  if (/\b(born|birthplace|natawo|ipinanganak|pinanganak)\b/.test(text))
    return 'birthplace';
  if (
    /\b(your name|your nickname|who are you|whore you|who you|hu are you|call you|ngalan|pangalan|kinsa ka|sino ka)\b/.test(
      text,
    )
  )
    return 'name';
  if (
    /\b(where.*(based|from|live)|your (location|hometown)|asa.*(taga|puyo|gikan)|taga asa|taga saan|saan.*(nakatira|galing)|lokasyon)\b/.test(
      text,
    )
  )
    return 'location';
  if (
    /\b(favou?rite games?|what games|paborito.*(duwa|game)|paboritong.*(laro|game)|anong.*(nilalaro|games)|unsang.*(duwa|games))\b/.test(
      text,
    )
  )
    return 'games';
  if (
    /\b(start.*cod\w*|coding journey|discover.*cod\w*|nagsugod.*(cod|develop)\w*|nagsimula\w*.*(cod|develop)\w*|unang.*cod\w*|elementary|senior high)\b/.test(
      text,
    )
  )
    return 'journey';
  if (
    /\b(inspir\w*|social media|why.*(cod|develop)\w*|ngano.*(cod|develop)\w*|bakit.*(cod|develop)\w*)\b/.test(
      text,
    )
  )
    return 'inspiration';
  if (/\b(your interests|interested in|interesado)\b/.test(text))
    return 'interests';
  if (
    /\b(design preferences|ui details|animations?|disenyo|user experience)\b/.test(
      text,
    )
  )
    return 'design';
  if (
    /\b(learning style|how do you learn|unsaon.*kat.on|paano.*matuto)\b/.test(
      text,
    )
  )
    return 'learning';
  if (/\b(free tools|costs?|budget|gasto|libre.*tools)\b/.test(text))
    return 'constraints';
  if (
    /\b(role.*team|team.*role|leadership|leader|lead.*capstone|capstone.*role|behind.the.scenes|background.*work|lider|pamuno|sa grupo)\b/.test(
      text,
    )
  )
    return 'teamwork';
  if (
    /\b(hobbies|hobby|free time|outside.*(coding|work)|do you (enjoy|like|love|play)|games do you|lingaw|libangan|bakanteng oras|bakante|hilig|duwa|laro)\b/.test(
      text,
    )
  )
    return 'hobbies';
  if (
    /\b(goals?|ambitions?|dream|career goals|hope.*become|want.*become|pangandoy|pangarap|tumong|gusto.*(maging|mahimong))\b/.test(
      text,
    )
  )
    return 'goals';
  if (
    /\b(how do you work|work(ing)? style|approach|overthink|focused|focus|personality|motivates?|plan.*features?|pamaagi|pagtrabaho|magtrabaho|paano.*trabaho|unsa ka.*trabaho|isip.*feature|thinking.*features)\b/.test(
      text,
    )
  )
    return 'workStyle';
  if (
    /\b(about (you|yourself)|introduce yourself|describe yourself|tungkol.*(iyo|sayo)|tungod.*nimo|bahin.*nimo|pakilala|pag.ila)\b/.test(
      text,
    )
  )
    return 'bio';
  // A language-only follow-up reuses the previous question's topic.
  if (resolveChatQuestion(question, history) !== question) {
    return personalTopic(resolveChatQuestion(question, history));
  }
  return undefined;
}

export function isSimplePersonalQuestion(
  question: string,
  history: ChatMessage[] = [],
) {
  return !!personalTopic(question, history) && !needsAIReasoning(question);
}

export function needsAIReasoning(question: string) {
  const topics = question
    .split(/\b(?:and|ug|at)\b/i)
    .map((part) => personalTopic(part))
    .filter(Boolean);
  const pairedTraits =
    topics.length > 1 &&
    topics.every(
      (topic) =>
        topic === 'strengths' ||
        topic === 'weaknesses' ||
        topic === 'strengthsAndWeaknesses',
    );
  return (
    question.length > 140 ||
    /\b(explain|compare|why|ngano|nganong|bakit|how would|paano.*(makatulong|nakatulong)|unsaon.*(makatabang|nakatabang)|relate|connect|impact (?:on|of)|affect|influence)\b/i.test(
      question,
    ) ||
    (question.match(/\?/g)?.length ?? 0) > 1 ||
    (!pairedTraits && new Set(topics).size > 1)
  );
}

// Aliases help prepared portfolio answers recognize Cebuano/Tagalog without AI.
export function portfolioQuestionText(question: string) {
  let text = normalizeQuestion(question);
  for (const [pattern, keyword] of [
    [/\b(proyekto|gibuhat|ginawa|nahimo|gihimo)\b/, 'projects'],
    [
      /\b(teknolohiya|teknolohiyang|teknolohiyang|ginagamit|gamit.*(code|coding|develop))\b/,
      'technologies',
    ],
    [
      /\b(eskwela|eskwelahan|skwelahan|iskul|paaralan|kolehiyo|kurso|nagtuon|nag.aral|estudyante)\b/,
      'education',
    ],
    [/\b(sertipiko|sertipikasyon)\b/, 'certifications'],
    [/\b(komunidad|kalihokan|kaganapan|mga litrato)\b/, 'community'],
  ] as const)
    if (pattern.test(text)) text += ` ${keyword}`;
  return text;
}
