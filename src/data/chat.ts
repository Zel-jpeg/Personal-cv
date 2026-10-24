import knowledge from './chatKnowledge.json' with { type: 'json' };
import { publicChatProfile } from './chatProfile.ts';
import {
  detectChatLanguage,
  localize,
  normalizeQuestion,
  personalTopic,
  portfolioQuestionText,
  resolveChatQuestion,
} from './chatLanguage.ts';

export type ChatMessage = { role: 'user' | 'assistant'; content: string };
export type ChatLink = { label: string; href: string };
export type ChatReply = {
  text: string;
  source: 'portfolio' | 'ai';
  links?: ChatLink[];
  contact?: boolean;
};
export const chatGreeting =
  "Hi! I'm Zel — feel free to ask about my projects, the stack I work with, or anything else on the site.";
export const chatSuggestions = [
  'Show me your projects',
  'What is your tech stack?',
  'Tell me about yourself',
] as const;
export const chatSuggestionLabels: Record<
  (typeof chatSuggestions)[number],
  string
> = {
  'Show me your projects': 'Projects',
  'What is your tech stack?': 'Tech stack',
  'Tell me about yourself': 'About me',
};

export function isContactQuestion(text: string) {
  return (
    /\b(contact|email|message|reach you|hire|hiring|collaborat\w*|work together|available|availability|rates|pricing|kontak|mensahe|makontak|mag.email|magpadala|pakig|makipag|presyo|bayad)\b/i.test(
      text,
    ) || /[^\s@]+@[^\s@]+\.[^\s@]+/.test(text)
  );
}
export function isPersonalQuestion(question: string) {
  return !!personalTopic(question);
}

function isLanguageQuestion(question: string) {
  return /\b(speak|understand|kasabot|makasabot|naiintindihan|marunong)\b.*\b(bisaya|cebuano|tagalog|filipino|english|languages?)\b|\blanguages?\b.*\b(speak|understand)\b/i.test(
    question,
  );
}

// Prepared replies work offline too. Private answers are obtained from the server.
export function getPreparedReply(
  question: string,
  history: ChatMessage[] = [],
): ChatReply {
  const language = detectChatLanguage(question, history);
  const say = (en: string, ceb: string, fil: string) =>
    localize({ en, ceb, fil }, language);
  const text = portfolioQuestionText(resolveChatQuestion(question, history));
  const base = { source: 'portfolio' as const };
  if (isLanguageQuestion(question))
    return {
      ...base,
      text: say(
        'You can ask this automated chat in English, Bisaya/Cebuano, or Tagalog/Taglish. I can switch languages and keep familiar technical terms in English.',
        'Pwede ka mangutana ani nga automated chat sa English, Bisaya/Cebuano, o Tagalog/Taglish. Pwede ra sab magsagol og English nga technical terms.',
        'Pwede kang magtanong sa automated chat na ito sa English, Bisaya/Cebuano, o Tagalog/Taglish. Okay lang ding gumamit ng English na technical terms.',
      ),
    };
  const unknown = () => ({
    ...base,
    text: say(
      "I haven't shared that detail here yet. Feel free to ask about my work or send me a message.",
      'Wala pa nako na-share kana nga detalye diri. Pwede ka mangutana bahin sa akong mga proyekto o magpadala og mensahe.',
      'Hindi ko pa naibahagi ang detalyeng iyon dito. Pwede kang magtanong tungkol sa mga proyekto ko o magpadala ng mensahe.',
    ),
  });
  if (
    /^(hi|hello|hey|yo|kumusta|kamusta|maayong (buntag|hapon|gabii)|magandang (umaga|hapon|gabi)|good (morning|afternoon|evening))[!.?\s]*$/.test(
      text,
    )
  )
    return {
      ...base,
      text: say(
        chatGreeting,
        'Kumusta! Ako si Zel. Pwede ka mangutana bahin sa akong mga proyekto, tech stack, o uban pang naa sa portfolio. Automated portfolio chat ni.',
        'Hi! Ako si Zel. Pwede kang magtanong tungkol sa mga proyekto ko, tech stack, o iba pang nasa portfolio. Automated portfolio chat ito.',
      ),
    };
  if (/^(thanks|thank you|salamat(?: kaayo| po)?)[!.\s]*$/.test(text))
    return {
      ...base,
      text: say(
        "You're welcome! Anything else you'd like to know about my work?",
        'Walay sapayan! Unsa pa imong gustong mahibal-an bahin sa akong mga proyekto?',
        'Walang anuman! Ano pa ang gusto mong malaman tungkol sa mga proyekto ko?',
      ),
    };
  if (isContactQuestion(text))
    return {
      ...base,
      text: say(
        "Leave your email and message using Send a message below. I'll reply by email. Please confirm availability and project details with me directly.",
        'Ibutang ang imong email ug mensahe sa Send a message sa ubos. Motubag ko pinaagi sa email. Mas maayo nga direkta nato kumpirmahon ang availability ug mga detalye sa proyekto.',
        'Ilagay ang email at mensahe mo sa Send a message sa ibaba. Sasagot ako sa email. Mas mabuting direkta nating kumpirmahin ang availability at detalye ng proyekto.',
      ),
      contact: true,
    };
  const topic = personalTopic(question, history);
  if (topic === 'name')
    return {
      ...base,
      text: say(
        `I'm ${knowledge.name}, but you can call me ${publicChatProfile.preferredName}. This is my automated portfolio chat.`,
        `Ako si ${knowledge.name}, pero pwede ra ko nimo tawgon og Zel. Automated portfolio chat ni.`,
        `Ako si ${knowledge.name}, pero pwede mo akong tawaging Zel. Automated portfolio chat ito.`,
      ),
    };
  if (topic === 'location')
    return {
      ...base,
      text: say(
        `I'm based in ${knowledge.location}.`,
        `Naa ko sa ${knowledge.location}.`,
        `Nakatira ako sa ${knowledge.location}.`,
      ),
    };
  if (topic === 'interests')
    return {
      ...base,
      text: say(
        `My interests include ${publicChatProfile.interests.join(', ')}.`,
        'Interesado ko sa software development, web development, UI/UX, ug emerging technologies.',
        'Interesado ako sa software development, web development, UI/UX, at emerging technologies.',
      ),
    };
  if (topic === 'bio')
    return {
      ...base,
      text: say(
        `I'm ${knowledge.name}, or Zel. I'm a fourth-year BSIT student at Davao del Norte State College, based in ${knowledge.location}. My interests include ${publicChatProfile.interests.join(', ')}. I've been building academic and personal projects since 2022.`,
        `Ako si Zel, fourth-year BSIT student sa Davao del Norte State College. Naa ko sa ${knowledge.location}. Interesado ko sa software development, web development, UI/UX, ug emerging technologies. Nagsugod ko og coding niadtong 2022.`,
        `Ako si Zel, fourth-year BSIT student sa Davao del Norte State College. Nakatira ako sa ${knowledge.location}. Interesado ako sa software development, web development, UI/UX, at emerging technologies. Nagsimula akong mag-code noong 2022.`,
      ),
      links: [{ label: 'My profile', href: '/#profile' }],
    };
  if (topic) return unknown();
  let project = knowledge.projects.find((item) =>
    text.includes(normalizeQuestion(item.name).replace(' cafe kiosk', '')),
  );
  if (
    !project &&
    /\b(it|that|this|its|ana|kana|kato|niya|nito|iyan|yon|yun)\b/.test(text)
  ) {
    for (const message of history
      .filter((item) => item.role === 'user')
      .slice()
      .reverse()) {
      project = knowledge.projects.find((item) =>
        normalizeQuestion(message.content).includes(
          normalizeQuestion(item.name).replace(' cafe kiosk', ''),
        ),
      );
      if (project) break;
    }
  }
  if (project) {
    const links: ChatLink[] = [
      { label: 'Source code', href: project.repository },
    ];
    if ('demo' in project && project.demo)
      links.unshift({ label: 'Visit project', href: project.demo });
    if ('details' in project && project.details)
      links.unshift({ label: 'Explore project', href: project.details });
    return {
      ...base,
      text: say(
        `${project.name} is one of my projects. ${project.description} Its listed technologies are ${project.technologies.join(', ')}.`,
        `Usa sa akong mga proyekto ang ${project.name}. Mao ni ang nakasulat nga description: ${project.description} Ang mga teknolohiya niini kay ${project.technologies.join(', ')}.`,
        `Isa sa mga proyekto ko ang ${project.name}. Ito ang nakasulat na description: ${project.description} Ang mga teknolohiya nito ay ${project.technologies.join(', ')}.`,
      ),
      links,
    };
  }
  if (/\b(projects?|portfolio|built|work|apps?|github|repos?)\b/.test(text))
    return {
      ...base,
      text: say(
        `I've worked on ${knowledge.projects.map((item) => item.name).join(', ')}. Ask me about one by name.`,
        `Ang akong mga proyekto naglakip sa ${knowledge.projects.map((item) => item.name).join(', ')}. Unsang proyekto imong gustong mahibal-an?`,
        `Kabilang sa mga proyekto ko ang ${knowledge.projects.map((item) => item.name).join(', ')}. Aling proyekto ang gusto mong malaman?`,
      ),
      links: [
        { label: 'Explore projects', href: '/projects' },
        { label: 'GitHub', href: 'https://github.com/Zel-jpeg' },
      ],
    };
  if (
    /\b(stack|technolog\w*|languages?|frameworks?|skills?|tools?|react|python|java|php)\b/.test(
      text,
    )
  ) {
    const stack = knowledge.skillGroups
      .map((group) => `${group.category}: ${group.skills.join(', ')}`)
      .join('; ');
    return {
      ...base,
      text: say(
        `My portfolio covers ${stack}. I choose tools based on each project's needs.`,
        `Mao ni ang akong tech stack: ${stack}. Nagpili ko og tools base sa panginahanglan sa proyekto.`,
        `Ito ang tech stack ko: ${stack}. Pinipili ko ang tools ayon sa pangangailangan ng proyekto.`,
      ),
      links: [{ label: 'Full tech stack', href: '/tech-stack' }],
    };
  }
  if (
    /\b(educat\w*|school|college|degree|student|study|studying|course|dns[c]?)\b/.test(
      text,
    )
  ) {
    const education = knowledge.education[0];
    return {
      ...base,
      text: say(
        `I'm a fourth-year ${education.program} student at ${education.school}. My experience comes from academic and project-based development.`,
        `Fourth-year ${education.program} student ko sa ${education.school}. Ang akong kasinatian gikan sa academic ug personal nga mga proyekto.`,
        `Fourth-year ${education.program} student ako sa ${education.school}. Galing sa academic at personal na mga proyekto ang karanasan ko.`,
      ),
      links: [{ label: 'Education', href: '/#education' }],
    };
  }
  if (/\b(certificat\w*|cisco|ccna|credentials?)\b/.test(text))
    return {
      ...base,
      text: say(
        `I've completed ${knowledge.certifications.map((item) => item.title).join(' and ')} through Cisco Networking Academy. These are course completions, not a claim of passing the separate CCNA exam. Supporting documents are available on request.`,
        `Nakahuman ko sa ${knowledge.certifications.map((item) => item.title).join(' ug ')} sa Cisco Networking Academy. Course completions kini; wala ko nag-angkon nga nakapasar sa lahi nga CCNA exam. Pwede mangayo sa supporting documents.`,
        `Natapos ko ang ${knowledge.certifications.map((item) => item.title).join(' at ')} sa Cisco Networking Academy. Course completions ito; hindi ito pag-angkin na nakapasa ako sa hiwalay na CCNA exam. Available ang supporting documents kapag hiniling.`,
      ),
      links: [{ label: 'View certifications', href: '/certifications' }],
      contact: true,
    };
  if (/\b(community|events?|pitch\w*|present\w*|photos?)\b/.test(text))
    return {
      ...base,
      text: say(
        "I've taken part in presentation and pitching activities, including presenting the Sakyan website and mobile app prototype with the team.",
        'Nakaapil ko sa presentation ug pitching activities, apil ang pagpresentar sa Sakyan website ug mobile app prototype uban sa team.',
        'Nakasali ako sa presentation at pitching activities, kabilang ang pagpresenta ng Sakyan website at mobile app prototype kasama ang team.',
      ),
      links: [
        { label: 'Community', href: '/community' },
        { label: 'Photo gallery', href: '/events' },
      ],
    };
  return {
    ...base,
    text: say(
      "I don't have a confirmed answer for that yet. Ask about my projects, technologies, education, or send me a message for a personal reply.",
      'Wala pa koy kumpirmadong tubag ana. Pwede ka mangutana bahin sa akong mga proyekto, tech stack, o edukasyon, o magpadala og mensahe para personal ko makatubag.',
      'Wala pa akong kumpirmadong sagot diyan. Pwede kang magtanong tungkol sa mga proyekto, tech stack, o pag-aaral ko, o magpadala ng mensahe para personal akong makasagot.',
    ),
    links: [{ label: 'Browse projects', href: '/projects' }],
    contact: true,
  };
}

export function getQuickReply(
  question: string,
  history: ChatMessage[] = [],
): ChatReply | undefined {
  const text = normalizeQuestion(question);
  if (isLanguageQuestion(question)) return getPreparedReply(question, history);
  if (personalTopic(question, history)) return undefined;
  if (
    /^(hi|hello|hey|yo|kumusta|kamusta|maayong (buntag|hapon|gabii)|magandang (umaga|hapon|gabi)|good (morning|afternoon|evening)|thanks|thank you|salamat(?: kaayo| po)?)[!.?\s]*$/.test(
      text,
    ) ||
    isContactQuestion(text) ||
    chatSuggestions.some((item) => normalizeQuestion(item) === text)
  )
    return getPreparedReply(question, history);
  return undefined;
}
