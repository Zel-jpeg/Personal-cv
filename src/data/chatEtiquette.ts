import type { ChatMessage, ChatReply } from './chat.ts';
import { detectChatLanguage, resolveChatQuestion } from './chatLanguage.ts';

function normalizeSlang(text: string) {
  return text
    .normalize('NFKC')
    .replace(/[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g, '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’']/g, '')
    .replace(/([a-z])\1{2,}/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

// Whole words/phrases avoid accidental matches inside "class", "assignment",
// "passion", place names, etc. This is a small local vocabulary, not a claim
// to identify every dialect, spelling, insult, or quoted use perfectly.
export function containsChatProfanity(question: string) {
  const text = normalizeSlang(question)
    .replace(/0/g, 'o')
    .replace(/1/g, 'i')
    .replace(/3/g, 'e')
    .replace(/[4@]/g, 'a')
    .replace(/[5$]/g, 's')
    .replace(/7/g, 't');
  return /(?:^|[^\p{L}\p{N}])(?:fuck(?:ing|in|ed|er|ers|s)?|motherfuck(?:er|ers|ing)?|fck|wtf|stfu|shit(?:ty)?|bullshit|bitch(?:es)?|asshole(?:s)?|bastard(?:s)?|damn|dammit|hell|yawa(?:a)?|pist[ei](?:ng)?|buang(?:a)?|boang|bogo(?:a)?|amaw(?:a)?|ataya|atay(?=(?:\s+(?:ka|mo|oi|oy|uy|jud|gyud|man|bai|bro)\b|[!?.,]*\s*$))|bilat|iyot|putang\s*ina(?:ng|mo)?|potang\s*ina(?:mo)?|tang\s*ina(?:ng|mo)?|puta(?:ng)?|pota|gago|gaga|tanga|ulol|tarantado|bw[ei]sit|pakyu|f[\s.*_-]{0,3}[u*][\s.*_-]{0,3}c?[\s.*_-]{0,3}k|s[\s.*_-]{0,3}h[\s.*_-]{0,3}[i*][\s.*_-]{0,3}t)(?=$|[^\p{L}\p{N}])/u.test(
    text,
  );
}

export function getEtiquetteReply(
  question: string,
  history: ChatMessage[] = [],
): ChatReply | undefined {
  const resolved = resolveChatQuestion(question, history);
  const text = normalizeSlang(resolved);
  let language = detectChatLanguage(normalizeSlang(question), history);
  // "Mamaw" is used in both languages. Respect context; the owner's preferred
  // reading for a standalone, context-free compliment is Bisaya.
  if (
    language === 'en' &&
    history.length === 0 &&
    /^(?:wow\s+)?mamaw(?:\s+(?:ka|oi|oy|bai|bro|zel))*[!?.\s]*$/.test(text)
  )
    language = 'ceb';
  const say = (en: string, ceb: string, fil: string): ChatReply => ({
    text: { en, ceb, fil }[language],
    source: 'portfolio',
  });
  if (containsChatProfanity(resolved))
    return say(
      'Hey, let’s keep it cool. Please skip the swearing so we can keep this chat friendly. What would you like to talk about?',
      'Chill lang ta. Likayi lang nato ang pamalikas para friendly atong chika. Unsa may imong gustong istoryahan?',
      'Chill lang tayo. Iwas muna sa pagmumura para friendly ang kuwentuhan natin. Ano ang gusto mong pag-usapan?',
    );

  const words = text
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .trim()
    .split(/\s+/);
  const praise =
    /^(?:wow|woah|whoa|awesome|amazing|impressive|brilliant|great|nice|cool|beautiful|clean|galing|magaling|husay|mahusay|astig|angas|lupit|malupit|mamaw|hawd|hawda|hawdo|maayo|nindot|nindota|kuyaw|kuyawa|ngilngig|payter)$/;
  const filler =
    /^(?:ang|ka|kayo|mo|mong|nimo|imong|imohang|iyong|sa|nga|og|ug|na|nito|naman|po|talaga|talagang|sobrang|sobra|kaayo|jud|gyud|oi|oy|ui|uy|ba|bai|bay|dai|idol|boss|lods|lodi|bro|man|zel|azel|you|youre|are|your|this|that|the|is|looks|look|so|very|really|super|grabe|hala|lagi|ayo|bitaw|sana|all|dude|mate|work|projects?|portfolio|site|website|design|code|gawa|gibuhat|proyekto|buhat)$/;
  if (
    words.some((word) => praise.test(word)) &&
    words.every((word) => praise.test(word) || filler.test(word))
  )
    return say(
      'Thanks, I really appreciate that! Was there a project or detail that caught your eye?',
      'Salamat kaayo! Maka-motivate jud na. Naay proyekto o detalye nga imong naganahan?',
      'Salamat! Nakaka-motivate marinig ’yan. May project o detalye bang nagustuhan mo?',
    );
  return undefined;
}
