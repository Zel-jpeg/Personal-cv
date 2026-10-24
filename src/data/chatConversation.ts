import type { ChatMessage, ChatReply } from './chat.ts';
import { getEtiquetteReply } from './chatEtiquette.ts';
import {
  detectChatLanguage,
  normalizeQuestion,
  resolveChatQuestion,
} from './chatLanguage.ts';

// Casual exchanges stay warm and free; they do not need a model or invented
// feelings, daily activities, or details about the real owner's availability.
export function getConversationalReply(
  question: string,
  history: ChatMessage[] = [],
): ChatReply | undefined {
  const etiquette = getEtiquetteReply(question, history);
  if (etiquette) return etiquette;
  const language = detectChatLanguage(question, history);
  const say = (en: string, ceb: string, fil: string): ChatReply => ({
    text: { en, ceb, fil }[language],
    source: 'portfolio',
  });
  const text = normalizeQuestion(resolveChatQuestion(question, history))
    .replace(/[,.!?]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const casual = text
    .replace(/^(?:hey|hi|hello|yo)\s+(?=(?:zel|azel)\b)/, '')
    .replace(/^(?:zel|azel)\s+/, '')
    .replace(/\s+(?:zel|azel)$/, '');
  if (
    /^(?:hi|hello|hey|yo|zel|azel|kumusta|kamusta|musta|maayong (?:buntag|hapon|gabii)|magandang (?:umaga|hapon|gabi)|good (?:morning|afternoon|evening))$/.test(
      casual,
    )
  )
    return say(
      'Hey! Nice to have you here. What’s on your mind?',
      'Hey! Maayo kay nakaagi ka diri. Unsa may naa sa imong hunahuna?',
      'Hey! Salamat sa pagdaan dito. Anong nasa isip mo?',
    );
  if (
    /^(?:how (?:are|re) you(?: doing)?|how have you been|hows (?:it going|your day(?: going)?)|whats up|sup|and you|what about you|kumusta ka(?: na)?|kamusta ka(?: na)?|musta ka(?: na)?|ikaw(?: kamusta| kumusta)?)$/.test(
      casual,
    )
  )
    return say(
      'Hey! I’m here and ready to chat. How’s your day going?',
      'Hey! Naa ra ko diri, andam makig-chat. Kumusta imong adlaw?',
      'Hey! Nandito lang ako, handang makipag-chat. Kumusta ang araw mo?',
    );
  if (
    /^(?:what are you (?:doing|up to)|what you doing|wyd|unsa imong gibuhat|anong ginagawa mo|ano ginagawa mo)$/.test(
      casual,
    )
  )
    return say(
      'Just here to chat with you! We can talk about what I’ve been building, games I enjoy, or anything you’re curious about me.',
      'Naa ra ko diri para makig-chat nimo! Pwede ta maghisgot sa akong mga proyekto, mga duwa nga akong ganahan, o unsay gusto nimong mahibal-an bahin nako.',
      'Nandito lang para makipag-chat sa iyo! Pwede nating pag-usapan ang mga ginagawa ko, mga larong gusto ko, o kung ano ang gusto mong malaman tungkol sa akin.',
    );
  if (
    /^(?:im|i am|doing|its|pretty|all|so far so)\s+(?:good|fine|okay|ok|great|well|alright)(?: thanks| thank you)?$|^(?:good|fine|okay|ok|great|nice|cool|haha+|hehe+|lol|ayos|okay lang|maayo ra|goods lang)(?: ra| lang| ko| ako| thanks| salamat| naman)*$/.test(
      casual,
    )
  )
    return say(
      'Nice! What brought you by—curious about a project, or just saying hi?',
      'Nice! Unsay imong giari—naay proyekto nga imong gikainteres, o nangumusta lang?',
      'Nice! Ano ang nagdala sa iyo rito—may project kang gustong malaman, o nangangamusta lang?',
    );
  if (
    /^(?:im|i am|feeling)\s+(?:tired|stressed|bored|sad)|^(?:kapoy|gikapoy|pagod|nakakapagod|laay|gi?laay)(?: ko| ako| kaayo| jud| lang| ra)*$/.test(
      casual,
    )
  )
    return say(
      'That sounds like a long day. Want a little break and a chat? We can talk games or something I’ve been building.',
      'Murag kapoy imong adlaw. Pahuway sa gamay ug chika ta? Pwede ta maghisgot og duwa o akong mga proyekto.',
      'Mukhang nakakapagod ang araw mo. Pahinga muna at kuwentuhan tayo? Pwede nating pag-usapan ang games o mga ginagawa kong project.',
    );
  if (
    /^(?:thanks|thank you|thankyou|salamat)(?: so much| kaayo| po| jud| zel| azel)*$/.test(
      casual,
    )
  )
    return say(
      'You’re welcome! Anything else on your mind?',
      'Walay sapayan! Unsa pa imong gustong istoryahan?',
      'Walang anuman! May gusto ka pa bang pag-usapan?',
    );
  if (
    /^(?:(?:your|the|this) )?(?:portfolio|website|site|projects?|work|design) (?:is |looks? )?(?:really |so |very )?(?:nice|great|cool|awesome|beautiful|clean|good)(?: bro| man| zel)?$|^(?:nice|great|cool|awesome|beautiful|clean) (?:portfolio|website|site|projects?|work|design)(?: bro| man| zel)?$/.test(
      casual,
    )
  )
    return say(
      'Thanks, I appreciate that! Was there a project or detail that caught your eye?',
      'Salamat, na-appreciate nako! Naay proyekto o detalye nga nakakuha sa imong atensyon?',
      'Salamat, na-appreciate ko! May project o detalye bang nakakuha ng pansin mo?',
    );
  if (
    /^(?:are you (?:real|a real person|human|a bot|ai|an ai)|is this (?:really you|a bot|ai)|tinuod ka|tao ka ba|totoong tao ka ba)$/.test(
      casual,
    )
  )
    return {
      ...say(
        'You’re chatting with my AI assistant here, using facts I’ve shared. If you’d like to talk to me personally, use Send a message and I’ll reply by email.',
        'Akong AI assistant imong ka-chat diri, gamit ang mga detalye nga akong gi-share. Para personal ta mag-istorya, gamita ang Send a message ug motubag ko sa email.',
        'AI assistant ko ang ka-chat mo rito, gamit ang mga impormasyong ibinahagi ko. Para makausap ako mismo, gamitin ang Send a message at sasagot ako sa email.',
      ),
      contact: true,
    };
  const introduction = casual.match(
    /^(?:my name is|you can call me|ako si|ang pangalan ko ay) ([\p{L}][\p{L} '\-]{0,39})$/u,
  );
  if (introduction)
    return say(
      `Nice to meet you, ${introduction[1]}! What brought you by?`,
      `Maayo nga nakaila ko nimo, ${introduction[1]}! Unsay imong giari?`,
      `Nice to meet you, ${introduction[1]}! Ano ang nagdala sa iyo rito?`,
    );
  if (
    /^(?:bye|goodbye|see you|see ya|talk later|amping|sige amping|paalam|ingat)(?: zel| azel| na| po)*$/.test(
      casual,
    )
  )
    return say(
      'Thanks for stopping by! Take care—come back anytime.',
      'Salamat sa pag-agi! Amping, balik lang puhon.',
      'Salamat sa pagdaan! Ingat, balik ka lang ulit.',
    );

  // A tiny standalone calculation is harmless banter, not a general homework
  // solver. No eval, code, variables, chains, or expression parser is used.
  const calculation = normalizeQuestion(question).match(
    /^(?:(?:what is|whats|calculate|pila ang|magkano ang)\s+)?(-?\d{1,3})\s*([+\-*/×÷])\s*(-?\d{1,3})\s*[=?!.]*$/,
  );
  if (calculation) {
    const left = Number(calculation[1]);
    const right = Number(calculation[3]);
    const op = calculation[2];
    if ((op === '/' || op === '÷') && right === 0)
      return say(
        'That one is undefined—you can’t divide by zero.',
        'Undefined na—dili pwede mag-divide og zero.',
        'Undefined iyan—hindi puwedeng mag-divide sa zero.',
      );
    const answer =
      op === '+'
        ? left + right
        : op === '-'
          ? left - right
          : /[/÷]/.test(op)
            ? left / right
            : left * right;
    return {
      text: `${left} ${op} ${right} = ${Number(answer.toFixed(6))}`,
      source: 'portfolio',
    };
  }
  return undefined;
}
